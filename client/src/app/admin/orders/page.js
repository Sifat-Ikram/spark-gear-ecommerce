"use client";

import React, { useState } from "react";
import { useOrders } from "@/hooks/useOrders";
import OrderCard from "@/components/card/OrderCard";

const STATUSES = ["pending", "processing", "shipped", "delivered", "cancelled"];
export default function AdminOrdersPage() {
  const { orders, orderIsLoading, orderError, orderRefetch } = useOrders();
  const [selectedStatus, setSelectedStatus] = useState("pending");

  if (orderIsLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-[#008080]">
        Loading orders...
      </div>
    );
  }

  if (orderError) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-red-500">
        <p>Error loading orders.</p>
        <button
          onClick={orderRefetch}
          className="mt-4 px-4 py-2 bg-[#008080] text-white rounded hover:bg-teal-700"
        >
          Retry
        </button>
      </div>
    );
  }

  const filteredOrders =
    orders?.filter((order) => order.status === selectedStatus) || [];

  return (
    <div className="w-11/12 mx-auto min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold text-[#008080] mb-6">
        Admin Orders
      </h1>
      <div className="flex justify-between items-center py-2 md:py-3 2xl:py-6 bg-[#008080] mb-3 rounded-t-lg px-4 sm:px-6 md:px-4 lg:px-7 2xl:px-10">
        {STATUSES.map((status) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`sm:text-lg md:text-base lg:text-lg xl:text-xl 2xl:text-3xl font-medium cursor-pointer transition ${
              selectedStatus === status
                ? "underline text-gray-200"
                : "text-white hover:text-gray-200 hover:underline"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-6">
        {filteredOrders.length === 0 ? (
          <p className="text-gray-500 text-center mt-4 text-sm sm:text-base lg:text-lg 2xl:text-xl">
            No {selectedStatus} orders found.
          </p>
        ) : (
          filteredOrders.map((order) => (
            <OrderCard
              key={order._id}
              order={order}
              orderRefetch={orderRefetch}
            />
          ))
        )}
      </div>
    </div>
  );
}
