import { useQuery } from "@tanstack/react-query";
import { useRwaProgram } from "./useProgram";
import { useConnection } from "@solana/wallet-adapter-react";
import {
  address,
  getAddressEncoder,
  getProgramDerivedAddress,
} from "@solana/kit";
import { fromLegacyPublicKey } from "@solana/compat";
import { web3 } from "@coral-xyz/anchor";

const useRwaTokenInitialized = (minter?: string) => {
  const program = useRwaProgram();
  const addressEncoder = getAddressEncoder();
  const { connection } = useConnection();

  return useQuery({
    queryKey: ["rwaToken", minter],
    queryFn: async () => {
      if (!minter) {
        return false;
      }
      const [nftMinterMintAddress] = await getProgramDerivedAddress({
        programAddress: fromLegacyPublicKey(program.programId),
        seeds: [Buffer.from("m"), addressEncoder.encode(address(minter))],
      });

      const [carbonCreditsMintAddress] = await getProgramDerivedAddress({
        programAddress: fromLegacyPublicKey(program.programId),
        seeds: [
          Buffer.from("cct"),
          addressEncoder.encode(nftMinterMintAddress),
        ],
      });

      const accountInfo = await connection.getAccountInfo(
        new web3.PublicKey(carbonCreditsMintAddress)
      );

      return accountInfo ? carbonCreditsMintAddress : null;
    },
    enabled: !!minter,
  });
};

export default useRwaTokenInitialized;
