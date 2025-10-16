"use client";

import { useAuth } from "@/provider/AuthContext";
import axios from "axios";
import { useEffect } from "react";

const axiosSecure = axios.create({
  baseURL: "https://spark-gear-server.vercel.app",
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { user, refreshAccessToken, logOut } = useAuth();

  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add interceptor for responses
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // If access token expired → try refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            await refreshAccessToken(); // get new access token
            return axiosSecure(originalRequest); // retry request
          } catch (err) {
            logOut(); // if refresh fails, force logout
          }
        }

        // Forbidden (role mismatch)
        if (error.response?.status === 403) {
          console.warn("Forbidden: insufficient role permissions");
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [refreshAccessToken, logOut, user]);

  return axiosSecure;
};

export default useAxiosSecure;
