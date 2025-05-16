import { address, getProgramDerivedAddress } from "@solana/kit";
import { useQuery } from "@tanstack/react-query";
import { useRwaProgram } from "./useProgram";

const useRwaConfig = () => {
  const program = useRwaProgram();

  return useQuery({
    queryKey: ["config"],
    enabled: !!program,
    queryFn: async () => {
      const [pda] = await getProgramDerivedAddress({
        programAddress: address(program.programId.toString()),
        seeds: [Buffer.from("config")],
      });
      const accountData = await program.account.governanceConfig.fetch(pda);

      return accountData;
    },
  });
};

export default useRwaConfig;
