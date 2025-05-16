import {
  address,
  getAddressEncoder,
  getProgramDerivedAddress,
} from "@solana/kit";
import { useQuery } from "@tanstack/react-query";
import { useRwaProgram } from "./useProgram";
import { useConnection } from "@solana/wallet-adapter-react";
import { web3 } from "@coral-xyz/anchor";

const useRole = (type: "m" | "c", publicKey?: string) => {
  const program = useRwaProgram();
  const { connection } = useConnection();
  const addressEncoder = getAddressEncoder();

  return useQuery({
    queryKey: ["role", publicKey, type],
    enabled: !!publicKey,
    queryFn: async () => {
      if (!publicKey) {
        return false;
      }
      const [account] = await getProgramDerivedAddress({
        programAddress: address(program.programId.toString()),
        seeds: [Buffer.from(type), addressEncoder.encode(address(publicKey))],
      });

      const accountInfo = await connection.getAccountInfo(
        new web3.PublicKey(account)
      );

      return !!accountInfo;
    },
  });
};

export default useRole;
