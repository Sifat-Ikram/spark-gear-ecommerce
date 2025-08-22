"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

export function useCategories() {
  const axiosPublic = useAxiosPublic();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["Categories"],
    queryFn: async () => {
      const res = await axiosPublic.get("/api/category");
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  return {
    categories: data || [],
    categoryIsLoading: isLoading,
    categoryError: isError,
    categoryRefetch: refetch,
  };
}
