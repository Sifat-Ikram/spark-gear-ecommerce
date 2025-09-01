"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

export function useReviews() {
  const axiosPublic = useAxiosPublic();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["Reviews"],
    queryFn: async () => {
      const res = await axiosPublic.get("/api/reviews");
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  return {
    reviews: data || [],
    reviewIsLoading: isLoading,
    reviewError: isError,
    reviewRefetch: refetch,
  };
}
