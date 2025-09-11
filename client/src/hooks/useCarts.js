"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

export function useCarts() {
  const axiosSecure = useAxiosSecure();

  const {
    data = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["carts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/cart/get");
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  return {
    carts: data || [],
    cartIsLoading: isLoading,
    cartError: isError,
    cartRefetch: refetch,
  };
}
