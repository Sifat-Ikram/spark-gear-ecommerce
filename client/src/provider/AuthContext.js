"use client";

import axios from "axios";
import { createContext, useContext, useState, useEffect, useMemo } from "react";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { usePathname, useRouter } from "next/navigation";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const axiosPublic = useAxiosPublic();
  const pathname = usePathname();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserName = localStorage.getItem("userName");
      const storedUserEmail = localStorage.getItem("userEmail");
      if (storedUserName && storedUserEmail) {
        setUser({ name: storedUserName, email: storedUserEmail });
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (user?.name && user?.email) {
      localStorage.setItem("userName", user.name);
      localStorage.setItem("userEmail", user.email);
    } else {
      localStorage.removeItem("userName");
      localStorage.removeItem("userEmail");
    }
  }, [user]);

  const axiosInstance = useMemo(() => {
    const instance = axios.create({
      baseURL: axiosPublic.defaults.baseURL,
      withCredentials: true,
    });

    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            await instance.post("/api/user/refresh");
            return instance(originalRequest);
          } catch (refreshError) {
            console.error("Refresh token failed:", refreshError);
            setUser(null);
            router.push("/login");
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
        await axiosInstance.post("/api/user/refresh");
      } catch (err) {
        const status = err.response?.status;
        if (![400, 401, 500].includes(status)) {
          console.error("Unexpected refresh error:", err);
        }
        setUser(null);
        if (pathname !== "/login" && pathname !== "/register") {
          router.push("/login");
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
  }, [axiosInstance, router, pathname]);

  const logout = async () => {
    try {
      await axiosInstance.post("/api/user/logout");
      setUser(null);
      router.push("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        axiosInstance,
        loading,
        user,
        setUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);
