import { useQuery } from "@tanstack/react-query";
import {
  getMetadataPointerState,
  getMint,
  getTokenMetadata,
  getTransferHook,
  TOKEN_2022_PROGRAM_ID,
} from "@solana/spl-token";
import { useConnection } from "@solana/wallet-adapter-react";
import { web3 } from "@coral-xyz/anchor";
const useTokenMetadata = (tokenAddress: string) => {
  const { connection } = useConnection();
  return useQuery({
    queryKey: ["tokenMetadata", tokenAddress],
    queryFn: async () => {
      const mintInfo = await getMint(
        connection,
        new web3.PublicKey(tokenAddress),
        "confirmed",
        TOKEN_2022_PROGRAM_ID
      );

      const metadataPointer = getMetadataPointerState(mintInfo);

      const metadata = await getTokenMetadata(
        connection,
        new web3.PublicKey(tokenAddress)
      );

      const transferHook = getTransferHook(mintInfo);

      return { mintInfo, metadataPointer, metadata, transferHook };
    },
  });
};

export default useTokenMetadata;
