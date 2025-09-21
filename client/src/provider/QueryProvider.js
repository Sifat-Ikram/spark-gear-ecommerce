"use client";

import { useState } from "react";
import { useAuth } from "./AuthContext";
import { CartProvider } from "./CartContext";
import CartPage from "@/components/cart/CartPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function QueryProvider({ children }) {
  const [queryClient] = useState(() => new QueryClient());
  const { loading } = useAuth();

  if (loading) {
    return (
      <div
        className="min-h-screen flex justify-center items-center title-text exo"
        style={{ color: "#008080" }}
      >
        Spark Gear
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        {children}
        <CartPage />
      </CartProvider>
    </QueryClientProvider>
  );
}
