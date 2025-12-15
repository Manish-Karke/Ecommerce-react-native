import { ApiData, ApiPost, RegisterUser } from "@/api/axios";
import { PostHookProps, UseGetHooksProps } from "@/types/type";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useFetch = <T,>({
  queryKey,
  url,
  params,
  enabled = true,
}: UseGetHooksProps<T>) => {
  const { isLoading, isFetching, error, data, refetch } = useQuery<T>({
    queryKey,
    queryFn: async () => {
      const response = await ApiData<T>(url, params);
      return response.data;
    },
    refetchOnWindowFocus: true, //if data need to be updated timely we can make this as true other wise false
    placeholderData: (previous) => previous,
    enabled,
  });

  return { isLoading, isFetching, error, data, refetch };
};

export const useSendPost = <T,>({ url }: PostHookProps<T>) => {
  return useMutation({
    mutationFn: async (payload: any) => {
      const response = await ApiPost<T>({
        url: url,
        formData: payload,
      });

      return response.data;
    },
  });
};


export const useRegister =<T, >({
  url
}:PostHookProps<T> )=>{
  return useMutation({
    mutationFn: async (payload:any) => {
      const response = await RegisterUser<T>({
        url:url,
        formData:payload
      })
      return response.data
    }
  })
}