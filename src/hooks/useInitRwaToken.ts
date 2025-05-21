import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRwaProgram, useTransferHookProgram } from "./useProgram";
import { toast } from "react-toastify";
import { useConnection } from "@solana/wallet-adapter-react";
import { TOKEN_METADATA } from "@/lib/constants";
import { BN } from "@coral-xyz/anchor";
import { getProgramDerivedAddress } from "@solana/kit";
import { fromLegacyPublicKey } from "@solana/compat";
import { userHasWallet } from "@civic/auth-web3";
import { useUser } from "@civic/auth-web3/react";
type InitRwaTokenParams = {
  name: string;
  symbol: string;
  decimals: number;
  isClose: boolean;
  hasFee: boolean;
  transferFeeBasisPoints?: number;
  maximumFee?: number;
};

const useInitRwaToken = () => {
  const program = useRwaProgram();
  const hookProgram = useTransferHookProgram();
  const userContext = useUser();

  const { connection } = useConnection();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["initRwaToken"],
    mutationFn: async (payload: InitRwaTokenParams) => {
      if (!userHasWallet(userContext)) {
        toast.error("Wallet not connected");
        return;
      }
      console.log("Minting RWA token", userContext.solana.wallet);

      const publicKey = userContext.solana.wallet.publicKey!;
      return toast.promise(
        new Promise(async (resolve, reject) => {
          try {
            console.info("Initializing RWA token...");

            // const [nftMinterMintAddress] = await getProgramDerivedAddress({
            //   programAddress: fromLegacyPublicKey(program.programId),
            //   seeds: [
            //     Buffer.from("m"),
            //     addressEncoder.encode(fromLegacyPublicKey(publicKey)),
            //   ],
            // });

            const [carbonCreditsMintAddress] = await getProgramDerivedAddress({
              programAddress: fromLegacyPublicKey(program.programId),
              seeds: [Buffer.from("cct"), Buffer.from(payload.symbol)],
            });

            const transaction = await program.methods
              .initRwaToken(
                payload.name,
                payload.symbol,
                payload.decimals,
                TOKEN_METADATA.uri,
                payload.isClose,
                payload.hasFee,
                payload.hasFee ? payload.transferFeeBasisPoints : 0,
                payload.hasFee ? new BN(payload.maximumFee) : new BN(0)
              )
              .accountsPartial({
                transferHookProgram: hookProgram.programId,
              })
              .transaction();

            if (payload.isClose) {
              transaction.add(
                await hookProgram.methods
                  .initializeExtraAccountMetaList()
                  .accounts({
                    payer: publicKey,
                    mint: carbonCreditsMintAddress,
                    rwaProgram: program.programId,
                  })
                  .instruction()
              );
            }

            transaction.feePayer = publicKey;
            transaction.recentBlockhash = (
              await connection.getLatestBlockhash("confirmed")
            ).blockhash;

            const result = await userContext.solana.wallet.sendTransaction(
              transaction,
              connection
            );
            await queryClient.invalidateQueries({
              queryKey: ["rwaTokenCreated"],
            });
            await queryClient.invalidateQueries({
              queryKey: ["tokenMetadata", carbonCreditsMintAddress],
            });
            resolve(result);
          } catch (error) {
            console.error("Error initializing RWA token", error);
            reject(error);
          }
        }),
        {
          pending: `Initializing RWA token...`,
          success: `RWA token initialized`,
          error: "Error initializing RWA token",
        }
      );
    },
  });
};

export default useInitRwaToken;
