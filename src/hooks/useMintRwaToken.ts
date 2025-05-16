import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRwaProgram } from "./useProgram";
import { fromLegacyPublicKey } from "@solana/compat";
import {
  address,
  getAddressEncoder,
  getProgramDerivedAddress,
} from "@solana/kit";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { toast } from "react-toastify";
import {
  getMint,
  getTokenMetadata,
  TOKEN_2022_PROGRAM_ID,
} from "@solana/spl-token";
import { BN, web3 } from "@coral-xyz/anchor";
import { convertMetadataToObject } from "@/lib/utils";
import { insertHistory } from "@/app/(console)/_actions/history.action";
type MintRwaTokenParams = { amount: number };
const useMintRwaToken = (mint: string) => {
  const program = useRwaProgram();
  const { publicKey } = useWallet();
  const addressEncoder = getAddressEncoder();
  const { connection } = useConnection();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["mintRwaToken", mint],
    mutationFn: async (payload: MintRwaTokenParams) => {
      if (!publicKey) {
        toast.error("Wallet not connected");
        return;
      }
      const [nftMinterMintAddress] = await getProgramDerivedAddress({
        programAddress: fromLegacyPublicKey(program.programId),
        seeds: [
          Buffer.from("m"),
          addressEncoder.encode(address(mint)),
          addressEncoder.encode(fromLegacyPublicKey(publicKey)),
        ],
      });

      const mintInfo = await getMint(
        connection,
        new web3.PublicKey(mint),
        "confirmed",
        TOKEN_2022_PROGRAM_ID
      );

      const metadata = await getTokenMetadata(
        connection,
        new web3.PublicKey(nftMinterMintAddress)
      );

      const { available_credits } = convertMetadataToObject(
        metadata?.additionalMetadata
      );
      if (Number(available_credits) < payload.amount) {
        toast.error("Insufficient credits");
        return;
      }

      return toast.promise(
        new Promise(async (resolve, reject) => {
          try {
            console.info("Minting RWA token...");
            const result = await program.methods
              .mintRwaToken(new BN(payload.amount))
              .accounts({
                minter: fromLegacyPublicKey(publicKey),
                payer: fromLegacyPublicKey(publicKey),
                receiver: new web3.PublicKey(publicKey),
                rwaMint: mint,
              })
              .rpc();
            await insertHistory(
              result,
              mint,
              publicKey?.toString(),
              BigInt(payload.amount * 10 ** mintInfo.decimals).toString(),
              "MINT"
            );
            await queryClient.invalidateQueries({
              queryKey: ["tokenMetadata", mint],
            });
            await queryClient.invalidateQueries({
              queryKey: ["transactionHistory", "MINT"],
            });
            resolve(result);
          } catch (error) {
            reject(error);
          }
        }),
        {
          pending: "Minting RWA token...",
          success: "RWA token minted",
          error: "Failed to mint RWA token",
        }
      );

      return metadata;
    },
  });
};

export default useMintRwaToken;
