"use client";

import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useAuth } from "@/provider/AuthContext";
import AdminSidebar from "@/components/admin-routes/AdminSidebar";
import QueryProvider from "@/provider/QueryProvider";

const AdminLayoutContent = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user && user.role !== "admin") {
      Swal.fire({
        icon: "error",
        title: "Unauthorized",
        text: "You are not allowed to access this page.",
        confirmButtonText: "Go Home",
      }).then(() => {
        router.push("/");
      });
    }
  }, [user, loading, router]);

  if (loading) return null;
  if (user && user.role !== "admin") return null;

  return (
    <div className="w-full flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/4 xl:w-1/5 2xl:w-1/4">
        <AdminSidebar />
      </div>
      <main className="w-full md:flex-1 overflow-y-auto">
        <QueryProvider>{children}</QueryProvider>
      </main>
    </div>
  );
};

export default AdminLayoutContent;
