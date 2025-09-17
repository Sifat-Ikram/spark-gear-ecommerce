"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

export function useOrdersByEmail(email) {
  const axiosPublic = useAxiosPublic();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["Orders", email],
    queryFn: async () => {
      if (!email) return [];
      try {
        const res = await axiosPublic.get(`/api/order/email/${email}`);
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
    enabled: !!email,
  });

  return {
    orders: Array.isArray(data) ? data : [],
    orderIsLoading: isLoading,
    orderError: isError,
    orderRefetch: refetch,
  };
}
