"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

export function useCoupons() {
  const axiosSecure = useAxiosPublic();

  const {
    data = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/coupon");
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  return {
    coupons: data || [],
    couponIsLoading: isLoading,
    couponError: isError,
    couponRefetch: refetch,
  };
}
