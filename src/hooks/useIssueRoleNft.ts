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
import { useWallet } from "@solana/wallet-adapter-react";
import { fromLegacyPublicKey } from "@solana/compat";
type UseIssueRoleNftParams = {
  mint: string;
  role: NFTRole;
};
const useIssueRoleNft = (to: string) => {
  const program = useRwaProgram();
  const { publicKey } = useWallet();
  return useMutation({
    mutationKey: ["issueRoleNft", to],
    mutationFn: async ({ role, mint }: UseIssueRoleNftParams) => {
      if (!publicKey) {
        toast.error("Wallet not connected");
        return;
      }
      return toast.promise(
        new Promise(async (resolve, reject) => {
          try {
            if (role === NFTRole.MINTER) {
              console.info("Issuing MINTER role NFT...");
              const result = await program.methods
                .issueMinterCert(
                  MINTER_ROLE_NFT_METADATA.name,
                  MINTER_ROLE_NFT_METADATA.symbol,
                  MINTER_ROLE_NFT_METADATA.uri
                )
                .accounts({
                  receiver: address(to),
                  permissionedMint: address(mint),
                })
                .rpc();

              resolve(result);
            } else {
              console.info("Issuing CONSUMER role NFT...");
              const result = await program.methods
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
                .rpc();

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
