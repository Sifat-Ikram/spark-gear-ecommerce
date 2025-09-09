"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { jwtDecode } from "jwt-decode";
import useAxiosPublic from "@/hooks/useAxiosPublic";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const axiosPublic = useAxiosPublic();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Decode user info from JWT
  const decodeUserFromToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      return {
        id: decoded.id,
        name: decoded.name,
        email: decoded.email,
        role: decoded.role,
      };
    } catch (err) {
      return null;
    }
  };

  const refreshAccessToken = useCallback(async () => {
    try {
      const { data } = await axiosPublic.get("/api/user/refresh");
      const { accessToken } = data;

      if (accessToken) {
        const decodedUser = decodeUserFromToken(accessToken);
        setUser(decodedUser);
      } else {
        setUser(null);
      }
    } catch (err) {
      setUser(null);
    }
  }, [axiosPublic]);

  useEffect(() => {
    const initializeUser = async () => {
      setLoading(true);
      try {
        await refreshAccessToken();
      } catch {}
      setLoading(false);
    };
    initializeUser();
  }, [refreshAccessToken]);

  useEffect(() => {
    const interval = setInterval(() => {
      refreshAccessToken();
    }, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, [refreshAccessToken]);

  const logOut = async () => {
    try {
      await axiosPublic.post("/api/user/logout");
      setUser(null);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const authInfo = {
    user,
    setUser,
    loading,
    logOut,
    refreshAccessToken,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
