"use client";

import axios from "axios";
import { createContext, useContext, useState, useEffect, useMemo } from "react";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { usePathname, useRouter } from "next/navigation";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const axiosPublic = useAxiosPublic();
  const pathname = usePathname();

  const axiosInstance = useMemo(() => {
    const instance = axios.create({
      withCredentials: true,
    });

    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            await axiosPublic.post("/api/user/refresh");

            return instance(originalRequest);
          } catch (refreshError) {
            console.error("Refresh token failed:", refreshError);
            router.push("/");
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );

    return instance;
  }, [axiosPublic, router]);

  useEffect(() => {
    const attemptRefresh = async () => {
      try {
        await axiosPublic.post("/api/user/refresh");
      } catch (err) {
        if (err.response?.status !== 400) {
          console.error("Unexpected refresh error:", err);
          router.push("/");
        }
      } finally {
        setLoading(false);
      }
    };

    if (pathname !== "/") {
      attemptRefresh();
    } else {
      setLoading(false);
    }
  }, [axiosPublic, router, pathname]);

  return (
    <AuthContext.Provider
      value={{
        axiosInstance,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
