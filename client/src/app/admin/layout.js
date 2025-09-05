import AdminSidebar from "@/components/admin-routes/AdminSidebar";
import { AuthProvider } from "@/provider/AuthContext";
import QueryProvider from "@/provider/QueryProvider";

export default function AdminLayout({ children }) {
  return (
    <div className="w-full flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/4 xl:w-1/5 2xl:w-1/4">
        <AdminSidebar />
      </div>
      <main className="w-full md:flex-1 overflow-y-auto">
        <AuthProvider>
          <QueryProvider>{children}</QueryProvider>
        </AuthProvider>
      </main>
    </div>
  );
}
