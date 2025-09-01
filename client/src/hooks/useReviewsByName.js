"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

export function useReviewsByName(productName) {
  const axiosPublic = useAxiosPublic();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["Reviews", productName],
    queryFn: async () => {
      if (!productName) return [];
      try {
        const res = await axiosPublic.get(`/api/reviews/${productName}`);
        return res.data.review || [];
      } catch (err) {
        if (err.response && err.response.status === 404) {
          return [];
        }
        throw err;
      }
    },
    staleTime: 1000 * 60 * 5,
    retry: 1,
    enabled: !!productName,
  });

  return {
    reviews: Array.isArray(data) ? data : [],
    reviewIsLoading: isLoading,
    reviewError: isError,
    reviewRefetch: refetch,
  };
}
