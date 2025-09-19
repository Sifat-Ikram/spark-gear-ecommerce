"use client";
import { useOrderByStatus } from "@/hooks/useOrderByStatus";

const RevenueAndAverageOrder = () => {
  const { orders, orderIsLoading, orderError } = useOrderByStatus("delivered");

  if (orderIsLoading) return <div>Loading...</div>;
  if (orderError) return <div>Error loading orders</div>;
  const revenue = orders.reduce((total, order) => total + order.orderTotal, 0);
  const aov = orders.length > 0 ? revenue / orders.length : 0;

  return (
    <div className="flex justify-evenly items-center gap-4">
      <div className="p-4 w-1/2 text-center border-[1px] border-gray-400 bg-gray-50 shadow flex gap-5 rounded-lg items-center">
        <div className="text-sm lg:text-lg xl:text-xl font-semibold text-gray-700">
          Revenue:
        </div>
        <div className="text-sm lg:text-lg xl:text-xl font-semibold text-gray-700">
          BDT {revenue.toFixed(2)}
        </div>
      </div>
      <div className="p-4 w-1/2 text-center border-[1px] border-gray-400 bg-gray-50 shadow flex gap-5 rounded-lg items-center">
        <div className="text-sm lg:text-lg xl:text-xl font-semibold text-gray-700">
          Average Order Value (AOV):
        </div>
        <div className="text-sm lg:text-lg xl:text-xl font-semibold text-gray-700">
          BDT {aov.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default RevenueAndAverageOrder;
