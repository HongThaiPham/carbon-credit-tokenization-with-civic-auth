import { web3 } from "@coral-xyz/anchor";
import {
  getAssociatedTokenAddressSync,
  TOKEN_2022_PROGRAM_ID,
} from "@solana/spl-token";
import { useConnection } from "@solana/wallet-adapter-react";
import { useQuery } from "@tanstack/react-query";

const useTokenBalance = (mint: string, account: string) => {
  const { connection } = useConnection();
  return useQuery({
    queryKey: ["tokenBalance", mint, account],
    queryFn: async () => {
      const mintPublicKey = new web3.PublicKey(mint);
      const accountPublicKey = new web3.PublicKey(account);
      const ata = getAssociatedTokenAddressSync(
        mintPublicKey,
        accountPublicKey,
        false,
        TOKEN_2022_PROGRAM_ID
      );

      return connection.getTokenAccountBalance(ata);
    },
  });
};

export default useTokenBalance;
