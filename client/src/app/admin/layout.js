import AdminSidebar from "@/components/admin-routes/AdminSidebar";
import { AuthProvider } from "@/provider/AuthContext";
import QueryProvider from "@/provider/QueryProvider";

export default function AdminLayout({ children }) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <AdminSidebar />
      <main className="flex-1 bg-gray-100 p-6">
        <AuthProvider>
          <QueryProvider>{children}</QueryProvider>
        </AuthProvider>
      </main>
    </div>
  );
}
