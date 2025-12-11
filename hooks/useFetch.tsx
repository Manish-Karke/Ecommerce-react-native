import { ApiData } from "@/api/axios";
import { useQuery, type QueryKey } from "@tanstack/react-query";

interface UseGetHooksProps<T> {
  queryKey: QueryKey;
  url: string;
  params?: any;
  enabled?: boolean;
}

export const useFetch = <T,>({
  queryKey,
  url,
  params,
  enabled = true,
}: UseGetHooksProps<T>) => {
  const {
    isLoading,
    isFetching,
    error,
    data,
    refetch,
  } = useQuery<T>({
    queryKey,
    queryFn: async () => {
      const response = await ApiData<T>(url, params);
      return response.data;
    },
    refetchOnWindowFocus: true,//
    placeholderData: (previous) => previous,
    enabled
  });

  return { isLoading, isFetching, error, data, refetch };
};
