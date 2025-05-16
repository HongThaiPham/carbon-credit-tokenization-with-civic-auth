"use client";
import { NFTRole } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import { useRwaProgram } from "./useProgram";
import { web3 } from "@coral-xyz/anchor";
import { useUser } from "@civic/auth-web3/react";
import { userHasWallet } from "@civic/auth-web3";

const useUserRoleAccountsbyUser = (role: NFTRole) => {
  const userContext = useUser();

  console.log("useUserRoleAccountsbyUser", role);
  const program = useRwaProgram();
  return useQuery({
    queryKey: ["userRoleAccounts", role],
    queryFn: async () => {
      if (!userHasWallet(userContext)) {
        return;
      }
      const publicKey = userContext.solana.address;
      if (!publicKey) return [];
      if (role === NFTRole.MINTER) {
        const accounts = await program.account.minterController.all([
          {
            memcmp: {
              offset: 8 + 32 + 32,
              bytes: new web3.PublicKey(publicKey).toBase58(),
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
              offset: 8 + 32 + 32,
              bytes: new web3.PublicKey(publicKey).toBase58(),
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
    enabled: userHasWallet(userContext),
  });
};

export default useUserRoleAccountsbyUser;
