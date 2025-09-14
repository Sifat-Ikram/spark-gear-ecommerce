"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

export function useOrderByStatus(status) {
  const axiosPublic = useAxiosPublic();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["orders", status],
    queryFn: async () => {
      if (!status) return [];
      try {
        const res = await axiosPublic.get(`/api/order/status/${status}`);
        return res.data || [];
      } catch (err) {
        if (err?.response?.status === 404) {
          return [];
        }
        throw err;
      }
    },
    staleTime: 1000 * 60 * 5,
    retry: 1,
    enabled: !!status,
  });

  return {
    orders: Array.isArray(data) ? data : [],
    orderIsLoading: isLoading,
    orderError: isError,
    orderRefetch: refetch,
  };
}
