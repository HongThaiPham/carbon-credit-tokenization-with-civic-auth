import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRwaProgram, useTransferHookProgram } from "./useProgram";
import { toast } from "react-toastify";
import { useWallet } from "@solana/wallet-adapter-react";
import { TOKEN_METADATA } from "@/lib/constants";
import { BN } from "@coral-xyz/anchor";
import { getProgramDerivedAddress } from "@solana/kit";
import { fromLegacyPublicKey } from "@solana/compat";
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
  const { publicKey } = useWallet();
  // const addressEncoder = getAddressEncoder();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["initRwaToken", publicKey],
    mutationFn: async (payload: InitRwaTokenParams) => {
      if (!publicKey) {
        toast.error("Wallet not connected");
        return;
      }
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

            const method = await program.methods
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
              });

            if (payload.isClose) {
              method.postInstructions([
                await hookProgram.methods
                  .initializeExtraAccountMetaList()
                  .accounts({
                    payer: publicKey,
                    mint: carbonCreditsMintAddress,
                    rwaProgram: program.programId,
                  })
                  .instruction(),
              ]);
            }

            const result = await method.rpc();
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
