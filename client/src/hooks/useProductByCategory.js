"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

export function useProductByCategory(category) {
  const axiosPublic = useAxiosPublic();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["Products", category],
    queryFn: async () => {
      if (!category) return [];
      try {
        const res = await axiosPublic.get(`/api/product/${category}`);
        return res.data || [];
      } catch (err) {
        if (err.response && err.response.status === 404) {
          return [];
        }
        throw err;
      }
    },
    staleTime: 1000 * 60 * 5,
    retry: 1,
    enabled: !!category,
  });

  return {
    products: Array.isArray(data) ? data : [],
    productIsLoading: isLoading,
    productError: isError,
    productRefetch: refetch,
  };
}
