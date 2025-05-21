"use client";
import {
  CONSUMER_ROLE_NFT_METADATA,
  MINTER_ROLE_NFT_METADATA,
  NFTRole,
} from "@/lib/constants";
import { useMutation } from "@tanstack/react-query";
import { address } from "@solana/kit";
import { useRwaProgram } from "./useProgram";
import { toast } from "react-toastify";
import { useConnection } from "@solana/wallet-adapter-react";
import { fromLegacyPublicKey } from "@solana/compat";
import { useUser } from "@civic/auth-web3/react";
import { userHasWallet } from "@civic/auth-web3";
type UseIssueRoleNftParams = {
  mint: string;
  role: NFTRole;
};
const useIssueRoleNft = (to: string) => {
  const program = useRwaProgram();
  const userContext = useUser();
  const { connection } = useConnection();

  return useMutation({
    mutationKey: ["issueRoleNft", to],
    mutationFn: async ({ role, mint }: UseIssueRoleNftParams) => {
      if (!userHasWallet(userContext)) {
        toast.error("Wallet not connected");
        return;
      }
      console.log("Minting RWA token", userContext.solana.wallet);

      const publicKey = userContext.solana.wallet.publicKey!;
      return toast.promise(
        new Promise(async (resolve, reject) => {
          try {
            if (role === NFTRole.MINTER) {
              console.info("Issuing MINTER role NFT...");
              const transaction = await program.methods
                .issueMinterCert(
                  MINTER_ROLE_NFT_METADATA.name,
                  MINTER_ROLE_NFT_METADATA.symbol,
                  MINTER_ROLE_NFT_METADATA.uri
                )
                .accounts({
                  receiver: address(to),
                  permissionedMint: address(mint),
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

              resolve(result);
            } else {
              console.info("Issuing CONSUMER role NFT...");
              const transaction = await program.methods
                .issueConsumerCert(
                  CONSUMER_ROLE_NFT_METADATA.name,
                  CONSUMER_ROLE_NFT_METADATA.symbol,
                  CONSUMER_ROLE_NFT_METADATA.uri
                )
                .accounts({
                  receiver: address(to),
                  minter: fromLegacyPublicKey(publicKey),
                  payer: fromLegacyPublicKey(publicKey),
                  rwaMint: address(mint),
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
              resolve(result);
            }
          } catch (error) {
            console.error("Error issuing role NFT", error);
            reject(error);
          }
        }),
        {
          pending: `Issuing ${role} role NFT...`,
          success: `${role} role NFT issued successfully`,
          error: "Error issuing role NFT",
        }
      );
    },
  });
};

export default useIssueRoleNft;
