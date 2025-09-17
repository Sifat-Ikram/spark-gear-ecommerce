"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

export function useUserById(userId) {
  const axiosPublic = useAxiosPublic();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["users", userId],
    queryFn: async () => {
      if (!userId) return null;
      try {
        const res = await axiosPublic.get(`/api/users/profile/${userId}`);
        return res.data || null;
      } catch (err) {
        if (err.response && err.response.status === 404) {
          return null;
        }
        throw err;
      }
    },
    staleTime: 1000 * 60 * 5,
    retry: 1,
    enabled: !!userId,
  });

  return {
    currentUser: data,
    userIsLoading: isLoading,
    userError: isError,
    userRefetch: refetch,
  };
}
