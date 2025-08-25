"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

export default function QueryProvider({ children }) {
  const [queryClient] = useState(() => new QueryClient());
  const pathname = usePathname();

  // Hide navbar/footer on these routes
  const hideLayout = ["/login", "/register"];
  const shouldHideLayout = hideLayout.some((route) =>
    pathname.startsWith(route)
  );

  return (
    <QueryClientProvider client={queryClient}>
      {!shouldHideLayout && <Navbar />}
      {children}
      {!shouldHideLayout && <Footer />}
    </QueryClientProvider>
  );
}
