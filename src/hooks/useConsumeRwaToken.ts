import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRwaProgram } from "./useProgram";
import { useConnection } from "@solana/wallet-adapter-react";
import { toast } from "react-toastify";
import { BN, web3 } from "@coral-xyz/anchor";
import { getMint, TOKEN_2022_PROGRAM_ID } from "@solana/spl-token";
import { insertHistory } from "@/app/(console)/_actions/history.action";
import { useUser } from "@civic/auth-web3/react";
import { userHasWallet } from "@civic/auth-web3";

const useConsumeRwaToken = () => {
  const program = useRwaProgram();
  const userContext = useUser();
  const { connection } = useConnection();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["consumeRwaToken"],
    mutationFn: async ({ amount, mint }: { amount: number; mint: string }) => {
      if (!userHasWallet(userContext)) {
        toast.error("Wallet not connected");
        return;
      }
      console.log("Consuming RWA token", userContext.solana.wallet);

      const publicKey = userContext.solana.wallet.publicKey!;

      const mintInfo = await getMint(
        connection,
        new web3.PublicKey(mint),
        "confirmed",
        TOKEN_2022_PROGRAM_ID
      );

      const nftMint = web3.Keypair.generate();
      return toast.promise(
        new Promise(async (resolve, reject) => {
          try {
            console.info("Consuming RWA token...");
            const transaction = await program.methods
              .retireToken(new BN(amount * 10 ** mintInfo.decimals))
              .accounts({
                payer: publicKey,
                mint: mint,
                consumer: publicKey,
                nftMint: nftMint.publicKey,
              })
              .signers([nftMint])
              .transaction();

            transaction.feePayer = publicKey;
            transaction.recentBlockhash = (
              await connection.getLatestBlockhash("confirmed")
            ).blockhash;

            const result = await userContext.solana.wallet.sendTransaction(
              transaction,
              connection
            );
            await insertHistory(
              result,
              mint,
              publicKey?.toString(),
              BigInt(amount * 10 ** mintInfo.decimals).toString(),
              "RETIRE"
            );
            await queryClient.invalidateQueries({
              queryKey: ["userTokenAccount", publicKey?.toString()],
            });
            await queryClient.invalidateQueries({
              queryKey: ["transactionHistory", "RETIRE"],
            });
            resolve(result);
          } catch (error) {
            console.error("Error consuming RWA token:", error);
            toast.error("Error consuming RWA token");
            reject(error);
          }
        }),
        {
          pending: "Consuming RWA token...",
          success: "RWA token consumed successfully!",
          error: "Error consuming RWA token",
        }
      );
    },
  });
};

export default useConsumeRwaToken;
