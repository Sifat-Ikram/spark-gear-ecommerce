"use client";

import { useAuth } from "@/provider/AuthContext";
import { useQuery } from "@tanstack/react-query";

export function useUser() {
  const { axiosInstance } = useAuth();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosInstance.get("/api/users", {
        withCredentials: true,
      });
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  return {
    users: data || [],
    userIsLoading: isLoading,
    userError: isError,
    userRefetch: refetch,
  };
}
