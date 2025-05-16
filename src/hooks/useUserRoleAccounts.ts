"use client";
import { NFTRole } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import { useRwaProgram } from "./useProgram";
import { web3 } from "@coral-xyz/anchor";

const useUserRoleAccounts = (role: NFTRole, mint?: string) => {
  const program = useRwaProgram();
  return useQuery({
    queryKey: ["userRoleAccounts", mint, role],
    queryFn: async () => {
      if (!mint) return [];
      if (role === NFTRole.MINTER) {
        const accounts = await program.account.minterController.all([
          {
            memcmp: {
              offset: 8,
              bytes: new web3.PublicKey(mint).toBase58(),
              encoding: "base58",
            },
          },
        ]);
        return accounts.map((account) => ({
          controller: account.publicKey.toBase58(),
          rwaMint: account.account.rwaMint.toBase58(),
          mint: account.account.mint.toBase58(),
          user: account.account.user.toBase58(),
        }));
      } else {
        const accounts = await program.account.consumerController.all([
          {
            memcmp: {
              offset: 8,
              bytes: new web3.PublicKey(mint).toBase58(),
              encoding: "base58",
            },
          },
        ]);
        return accounts.map((account) => ({
          controller: account.publicKey.toBase58(),
          rwaMint: account.account.rwaMint.toBase58(),
          mint: account.account.mint.toBase58(),
          user: account.account.user.toBase58(),
        }));
      }
    },
  });
};

export default useUserRoleAccounts;
