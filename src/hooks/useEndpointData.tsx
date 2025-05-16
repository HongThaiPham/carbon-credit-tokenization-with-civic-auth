import { getEndpointDataById } from "@/app/(console)/_actions/endpoint.action";
import { useQuery } from "@tanstack/react-query";

const useEndpointData = (id: string) => {
  return useQuery({
    queryKey: ["endpointData", id],
    queryFn: async () => {
      const { endpoint } = await getEndpointDataById(id);

      if (!endpoint) {
        throw new Error("No data found");
      }
      const response = await fetch(endpoint?.url || "");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });
};

export default useEndpointData;
