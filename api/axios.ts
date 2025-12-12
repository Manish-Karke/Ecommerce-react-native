import { PostApiParams } from "@/types/type";
import axios, { AxiosError, AxiosResponse } from "axios";
const base_api: string = "https://api.escuelajs.co/api/v1";
export default base_api;
export const instance = axios.create({
  baseURL: `${base_api}`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const ApiData = async <T>(
  url: string,
  params?: Record<string, any>
): Promise<AxiosResponse<T>> => {
  try {
    const response = await instance({
      method: "GET",
      url: `${url}`,
      params: params,
      transformResponse: [
        function (responseData) {
          return JSON.parse(responseData);
        },
      ],
    });
    return response;
  } catch (error) {
    const err = error as AxiosError;
    throw err;
  }
};

export const ApiPost = async <T>({
  url,
  formData,
}: PostApiParams<T>): Promise<AxiosResponse<T>> => {
  try {
    const response = await instance({
      method: "POST",
      url: `${url}`,
      data: formData,
      transformResponse: [
        function (responseData) {
          return JSON.parse(responseData);
        },
      ],
    });
    return response;
  } catch (error) {
    const err = error as AxiosError<Record<string, string>>;
    throw err;
  }
};
