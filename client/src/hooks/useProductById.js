"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

export function useProductById(productId) {
  const axiosPublic = useAxiosPublic();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["Product", productId],
    queryFn: async () => {
      if (!productId) return [];
      try {
        const res = await axiosPublic.get(`/api/product/id/${productId}`);
        return res.data;
      } catch (err) {
        if (err.response && err.response.status === 404) {
          return [];
        }
        throw err;
      }
    },
    staleTime: 1000 * 60 * 5,
    retry: 1,
    enabled: !!productId,
  });

  return {
    product: data,
    productIsLoading: isLoading,
    productError: isError,
    productRefetch: refetch,
  };
}
