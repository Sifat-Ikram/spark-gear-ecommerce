"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

export function useCartByEmail(email, options = {}) {
  const axiosPublic = useAxiosPublic();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["Cart", email],
    queryFn: async () => {
      if (!email) return [];
      try {
        const res = await axiosPublic.get(`/api/cart/${email}`);
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
    ...options,
  });

  return {
    cart: Array.isArray(data) ? data : [],
    cartIsLoading: isLoading,
    cartError: isError,
    cartRefetch: refetch,
  };
}
