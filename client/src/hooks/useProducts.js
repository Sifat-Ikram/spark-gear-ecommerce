"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

export function useProducts() {
  const axiosPublic = useAxiosPublic();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["Products"],
    queryFn: async () => {
      const res = await axiosPublic.get("/api/product");
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  return {
    products: data || [],
    productIsLoading: isLoading,
    productError: isError,
    productRefetch: refetch,
  };
}
