import { useQuery } from "@tanstack/react-query";
import { useRwaProgram } from "./useProgram";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { TOKEN_2022_PROGRAM_ID } from "@solana/spl-token";

const useUserMint = () => {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const program = useRwaProgram();
  return useQuery({
    queryKey: ["userTokenAccount", publicKey?.toString()],
    queryFn: async () => {
      if (!publicKey) {
        return null;
      }
      const mintAuthorities = await program.account.mintAuthority.all();
      const mints = mintAuthorities.map((mintAuthority) => {
        return mintAuthority.account.mint.toString();
      });

      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
        publicKey,
        {
          programId: TOKEN_2022_PROGRAM_ID,
        }
      );
      // filter all tokenaccounts by mint
      const userTokenAccounts = tokenAccounts.value.filter((tokenAccount) => {
        const mint = tokenAccount.account.data.parsed.info.mint;
        return mints.includes(mint);
      });

      // filter all mints by tokenaccount
      const userMints = userTokenAccounts.map((tokenAccount) => {
        return tokenAccount.account.data.parsed.info.mint;
      });
      return { userTokenAccounts, userMints };
    },
    enabled: !!publicKey,
  });
};

export default useUserMint;
