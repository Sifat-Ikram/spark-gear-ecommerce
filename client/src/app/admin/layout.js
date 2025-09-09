"use client";

import AdminLayoutContent from "./AdminLayoutContent";

export default function AdminLayout({ children }) {
  return (
    <main className="w-full md:flex-1 overflow-y-auto">
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </main>
  );
}
