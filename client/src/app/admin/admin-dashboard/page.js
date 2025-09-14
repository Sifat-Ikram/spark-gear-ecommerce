import CouponDashboard from "@/components/admin-routes/dashboard/CouponDashboard";
import RevenueAndAverageOrder from "@/components/admin-routes/dashboard/RevenueAndAverageOrder";
import SalesTrendsChart from "@/components/admin-routes/dashboard/SalesTrendsChart";
import StockStatusSection from "@/components/admin-routes/dashboard/StockStatusSection";

const AdminDashboard = () => {
  return (
    <div className="w-11/12 mx-auto flex flex-col space-y-10 my-10">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center">
        Admin Dashboard
      </h1>
      <RevenueAndAverageOrder />
      <SalesTrendsChart />
      <StockStatusSection />
      <CouponDashboard />
    </div>
  );
};

export default AdminDashboard;
