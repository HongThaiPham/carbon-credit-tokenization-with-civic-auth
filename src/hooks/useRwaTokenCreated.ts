import { useQuery } from "@tanstack/react-query";
import { useRwaProgram } from "./useProgram";

const useRwaTokenCreated = () => {
  const program = useRwaProgram();
  return useQuery({
    queryKey: ["rwaTokenCreated"],
    queryFn: async () => {
      const accounts = await program.account.mintAuthority.all();
      const rwaTokenCreated = accounts.map((account) => ({
        mintAuthority: account.publicKey.toBase58(),
        rwaMint: account.account.mint.toBase58(),
      }));
      return rwaTokenCreated ?? [];
    },
  });
};

export default useRwaTokenCreated;
