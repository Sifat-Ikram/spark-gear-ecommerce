"use client";

import axios from "axios";
import { createContext, useContext, useState, useEffect, useMemo } from "react";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { usePathname, useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const pathname = usePathname();
  const axiosPublic = useAxiosPublic();

  // Axios instance with 401 interceptor
  const axiosInstance = useMemo(() => {
    const instance = axios.create({
      baseURL: axiosPublic.defaults.baseURL,
      withCredentials: true,
    });

    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // Only retry if refreshToken cookie exists
        const hasRefreshToken = document.cookie.includes("refreshToken");

        if (
          error.response?.status === 401 &&
          !originalRequest._retry &&
          hasRefreshToken
        ) {
          originalRequest._retry = true;
          try {
            const refreshRes = await instance.post("/api/user/refresh");
            const newAccessToken = refreshRes.data.accessToken;

            const decoded = jwtDecode(newAccessToken);
            setUser({
              id: decoded.id,
              name: decoded.name,
              email: decoded.email,
              role: decoded.role,
            });

            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${newAccessToken}`;
            return instance(originalRequest);
          } catch {
            setUser(null);
            return Promise.reject(error);
          }
        }

        return Promise.reject(error);
      }
    );

    return instance;
  }, [axiosPublic]);

  useEffect(() => {
    const initializeUser = async () => {
      const hasRefreshToken = document.cookie.includes("refreshToken");
      if (!hasRefreshToken) {
        setUser(null);
        setLoading(false);
        return; // Do not call /refresh if no token
      }

      try {
        const res = await axiosInstance.post("/api/user/refresh");
        const accessToken = res.data.accessToken;

        if (accessToken) {
          const decoded = jwtDecode(accessToken);
          setUser({
            id: decoded.id,
            name: decoded.name,
            email: decoded.email,
            role: decoded.role,
          });
        }
      } catch (err) {
        setUser(null); // silent fail
      } finally {
        setLoading(false);
      }
    };

    initializeUser();
  }, [axiosInstance]);

  // Logout function
  const logout = async () => {
    try {
      await axiosInstance.post("/api/user/logout");
      setUser(null);
      router.push("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{ axiosInstance, loading, user, setUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
