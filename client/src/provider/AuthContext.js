"use client";

import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import useAxiosPublic from "@/hooks/useAxiosPublic";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const axiosPublic = useAxiosPublic();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  const refreshAccessToken = useCallback(async () => {
    try {
      const { data } = await axiosPublic.post("/api/user/refresh");
      const { accessToken } = data;

      if (accessToken) {
        const decoded = jwtDecode(accessToken);
        setUser({
          id: decoded.id,
          name: decoded.name,
          email: decoded.email,
          role: decoded.role,
        });
        return true;
      } else {
        setUser(null);
        return false;
      }
    } catch (err) {
      console.error("Failed to refresh access token:", err);
      setUser(null);
      return false;
    }
  }, [axiosPublic]);

  // Initialize user on page load or reload
  useEffect(() => {
    const initializeUser = async () => {
      if (user) {
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        // Check if refresh token exists
        const { data } = await axiosPublic.get("/api/user/profile");
        const { hasRefreshToken } = data;

        if (hasRefreshToken) {
          await refreshAccessToken();
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Failed to initialize user:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeUser();
  }, [axiosPublic, refreshAccessToken, user]);

  const logOut = async () => {
    try {
      setLoggingOut(true);
      await axiosPublic.post("/api/user/logout");
      router.push("/");
      setUser(null);
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        logOut,
        loggingOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
