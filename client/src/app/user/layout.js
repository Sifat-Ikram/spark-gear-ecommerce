export default function UserLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="p-6">{children}</main>
    </div>
  );
}
