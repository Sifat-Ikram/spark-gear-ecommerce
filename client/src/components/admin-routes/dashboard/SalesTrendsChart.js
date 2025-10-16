"use client";

import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", sales: 4000 },
  { month: "Feb", sales: 3200 },
  { month: "Mar", sales: 4500 },
  { month: "Apr", sales: 3000 },
  { month: "May", sales: 5000 },
  { month: "Jun", sales: 4700 },
  { month: "Jul", sales: 5200 },
  { month: "Aug", sales: 4800 },
  { month: "Sep", sales: 5300 },
  { month: "Oct", sales: 4900 },
  { month: "Nov", sales: 5500 },
  { month: "Dec", sales: 6000 },
];

export default function SalesTrendsChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 w-full"
    >
      {/* Title */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800">
          📊 Sales Trends
        </h2>
        <span className="text-xs sm:text-sm text-gray-500">Year 2025</span>
      </div>

      {/* Chart */}
      <div className="h-60 sm:h-72 lg:h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
            <YAxis stroke="#6b7280" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: "0.5rem",
                border: "1px solid #e5e7eb",
              }}
            />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#173faf"
              strokeWidth={3}
              dot={{ r: 4, fill: "#173faf" }}
              activeDot={{ r: 6, fill: "#DC143C" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
