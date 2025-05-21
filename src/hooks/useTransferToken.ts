import { userHasWallet } from "@civic/auth-web3";
import { useUser } from "@civic/auth-web3/react";
import { BN, web3 } from "@coral-xyz/anchor";
import {
  createTransferCheckedInstruction,
  createTransferCheckedWithTransferHookInstruction,
  getAssociatedTokenAddressSync,
  getMint,
  getTransferHook,
  TOKEN_2022_PROGRAM_ID,
} from "@solana/spl-token";
import { useConnection } from "@solana/wallet-adapter-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useTransferToken = (mint: string, to: string, amount: number) => {
  const { connection } = useConnection();
  const queryClient = useQueryClient();
  const userContext = useUser();

  return useMutation({
    mutationKey: ["transferToken", mint, to, amount],
    mutationFn: async () => {
      if (!userHasWallet(userContext)) {
        toast.error("Wallet not connected");
        return;
      }
      console.log("Minting RWA token", userContext.solana.wallet);

      const publicKey = userContext.solana.wallet.publicKey!;

      const mintPublicKey = new web3.PublicKey(mint);
      const toPublicKey = new web3.PublicKey(to);
      const senderAta = getAssociatedTokenAddressSync(
        mintPublicKey,
        publicKey,
        false,
        TOKEN_2022_PROGRAM_ID
      );
      const receiverAta = getAssociatedTokenAddressSync(
        mintPublicKey,
        toPublicKey,
        false,
        TOKEN_2022_PROGRAM_ID
      );

      return toast.promise(
        new Promise(async (resolve, reject) => {
          try {
            const mintInfo = await getMint(
              connection,
              mintPublicKey,
              "confirmed",
              TOKEN_2022_PROGRAM_ID
            );

            const transferHookState = getTransferHook(mintInfo);
            const transaction = new web3.Transaction();
            if (transferHookState) {
              transaction.add(
                await createTransferCheckedWithTransferHookInstruction(
                  connection,
                  senderAta,
                  mintPublicKey,
                  receiverAta,
                  publicKey,
                  BigInt(amount * 10 ** mintInfo.decimals),
                  mintInfo.decimals,
                  [],
                  undefined,
                  TOKEN_2022_PROGRAM_ID
                )
              );
            } else {
              transaction.add(
                createTransferCheckedInstruction(
                  senderAta,
                  mintPublicKey,
                  receiverAta,
                  publicKey,
                  new BN(amount * 10 ** mintInfo.decimals),
                  mintInfo.decimals,
                  [],
                  TOKEN_2022_PROGRAM_ID
                )
              );
            }

            const recentBlockhash = await connection.getLatestBlockhash();
            transaction.recentBlockhash = recentBlockhash.blockhash;
            transaction.feePayer = publicKey;

            const signature = await userContext.solana.wallet.sendTransaction(
              transaction,
              connection
            );
            console.log("Signature", signature);
            const tx = await connection.confirmTransaction({
              signature,
              ...recentBlockhash,
            });

            await queryClient.invalidateQueries({
              queryKey: ["tokenBalance", mint],
            });

            resolve({ tx, signature });
          } catch (error) {
            console.error(error);
            reject(error);
          }
        }),
        {
          pending: "Transferring token",
          success: "Token transferred",
          error: "Error transferring token",
        }
      );
    },
  });
};

export default useTransferToken;
