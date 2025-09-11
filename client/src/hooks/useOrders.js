"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

export function useOrders() {
  const axiosSecure = useAxiosSecure();

  const {
    data = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/order");
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  return {
    orders: data || [],
    orderIsLoading: isLoading,
    orderError: isError,
    orderRefetch: refetch,
  };
}
