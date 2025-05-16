import { web3 } from "@coral-xyz/anchor";
import {
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddressSync,
  TOKEN_2022_PROGRAM_ID,
} from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useCreateAtaAccount = (mint: string, to: string) => {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  return useMutation({
    mutationKey: ["create-ata-account", publicKey, mint, to],
    mutationFn: async () => {
      if (!publicKey) {
        toast.error("Wallet not connected");
        return;
      }
      const mintPublicKey = new web3.PublicKey(mint);
      const toPublicKey = new web3.PublicKey(to);
      const ata = getAssociatedTokenAddressSync(
        mintPublicKey,
        toPublicKey,
        false,
        TOKEN_2022_PROGRAM_ID
      );

      toast.promise(
        new Promise(async (resolve, reject) => {
          try {
            const transaction = new web3.Transaction();
            transaction.add(
              createAssociatedTokenAccountInstruction(
                publicKey,
                ata,
                toPublicKey,
                mintPublicKey,
                TOKEN_2022_PROGRAM_ID
              )
            );
            const recentBlockhash = await connection.getLatestBlockhash();
            transaction.recentBlockhash = recentBlockhash.blockhash;
            transaction.feePayer = publicKey;

            const signature = await sendTransaction(transaction, connection);

            const tx = await connection.confirmTransaction({
              signature,
              ...recentBlockhash,
            });

            resolve({ tx, signature });
          } catch (error) {
            console.error("Error creating ATA account", error);
            reject(error);
          }
        }),
        {
          pending: "Creating associated token account...",
          success: "Associated token account created",
          error: "Error creating associated token account",
        }
      );
    },
  });
};

export default useCreateAtaAccount;
