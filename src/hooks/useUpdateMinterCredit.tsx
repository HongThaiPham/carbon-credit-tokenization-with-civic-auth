import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRwaProgram } from "./useProgram";
import { useWallet } from "@solana/wallet-adapter-react";
import { toast } from "react-toastify";
import useMinterNftMetadata from "./useMinterNftMetadata";
import { BN } from "@coral-xyz/anchor";

const useUpdateMinterCredit = (minter: string, mint: string) => {
  const program = useRwaProgram();
  const { data } = useMinterNftMetadata(minter, mint);
  const { publicKey } = useWallet();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateMinterCredit", minter],
    mutationFn: async (amount: number) => {
      if (!publicKey) {
        toast.error("Wallet not connected");
        return;
      }

      if (data?.availableCredits && data?.availableCredits > amount) {
        toast.info(
          "Invalid amount to update, amount should be larger than available credits"
        );
        return;
      }

      return toast.promise(
        new Promise(async (resolve, reject) => {
          try {
            console.log("Updating credit...");
            const result = await program.methods
              .updateQuotaCredit(new BN(amount))
              .accounts({
                receiver: minter,
                authority: publicKey,
                permissionedMint: mint,
              })
              .rpc();
            await queryClient.invalidateQueries({
              queryKey: ["minterNftMetadata", minter],
            });
            resolve(result);
          } catch (error) {
            reject(error);
          }
        }),
        {
          pending: "Updating credit...",
          success: "Credit updated",
          error: "Failed to update credit",
        }
      );
    },
  });
};
export default useUpdateMinterCredit;
