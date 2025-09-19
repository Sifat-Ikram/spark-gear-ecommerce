"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

export function useActiveBanner() {
  const axiosSecure = useAxiosPublic();

  const {
    data = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["active"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/banner/active");
      return res.data.activeBanner;
    },
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  return {
    banner: data,
    bannerIsLoading: isLoading,
    bannerError: isError,
    bannerRefetch: refetch,
  };
}
