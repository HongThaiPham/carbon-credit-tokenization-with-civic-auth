import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRwaProgram } from "./useProgram";
import { useConnection } from "@solana/wallet-adapter-react";
import { toast } from "react-toastify";
import useMinterNftMetadata from "./useMinterNftMetadata";
import { BN } from "@coral-xyz/anchor";
import { useUser } from "@civic/auth-web3/react";
import { userHasWallet } from "@civic/auth-web3";

const useUpdateMinterCredit = (minter: string, mint: string) => {
  const program = useRwaProgram();
  const { data } = useMinterNftMetadata(minter, mint);
  const userContext = useUser();
  const { connection } = useConnection();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateMinterCredit", minter],
    mutationFn: async (amount: number) => {
      if (!userHasWallet(userContext)) {
        toast.error("Wallet not connected");
        return;
      }
      console.log("Minting RWA token", userContext.solana.wallet);

      const publicKey = userContext.solana.wallet.publicKey!;
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
            const transaction = await program.methods
              .updateQuotaCredit(new BN(amount))
              .accounts({
                receiver: minter,
                authority: publicKey,
                permissionedMint: mint,
              })
              .transaction();

            transaction.feePayer = publicKey;
            transaction.recentBlockhash = (
              await connection.getLatestBlockhash("confirmed")
            ).blockhash;

            const result = await userContext.solana.wallet.sendTransaction(
              transaction,
              connection
            );
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
