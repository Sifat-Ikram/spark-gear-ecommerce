"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

export function useBanners() {
  const axiosSecure = useAxiosSecure();

  const {
    data = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/banner");
      console.log(res.data);
      
      return res.data.banners;
    },
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  return {
    banners: data || [],
    bannerIsLoading: isLoading,
    bannerError: isError,
    bannerRefetch: refetch,
  };
}
