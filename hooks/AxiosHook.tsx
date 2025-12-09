import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";

axios.defaults.baseURL = "https://fakestoreapi.com/";
export const useAxiosFetch = (axiosParams: AxiosRequestConfig) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await axios.request(axiosParams);
// hey need to know if u need to pass the values like 
// checking like token u can perform from here not like this but maintaining in a certain area...
// but from the axios bearer can token can checked
// in such case u must had to use the concept of inceptor
      if (response.status === 200) {
        setData(response.data);
      } else {
        setError("Something went wrong");
      }
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // runs once

  return { loading, data, error };
};
