import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/axios";

export const useFetch = (url: string) => {
  return useQuery({
    queryKey: [url],
    queryFn: async () => {
      const response = await api.get(url);
      return response.data;
    },
  });
};
