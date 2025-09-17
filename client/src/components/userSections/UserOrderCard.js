"use client";
import Swal from "sweetalert2";
import Image from "next/image";
import { motion } from "framer-motion";
import { MdDelete } from "react-icons/md";
import { FiPackage } from "react-icons/fi";
import { FaRegCalendarAlt } from "react-icons/fa";
import useAxiosPublic from "@/hooks/useAxiosPublic";

const UserOrderCard = ({ order, orderRefetch }) => {
  const axiosPublic = useAxiosPublic();

  const deleteOrder = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This order will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosPublic.delete(`/api/order/${id}`);
          orderRefetch();

          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "The order has been deleted.",
            timer: 2000,
            showConfirmButton: false,
          });
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Delete Failed",
            text: "Something went wrong while deleting the order.",
          });
        }
      }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200"
    >
      {/* Order Header */}
      <div className="bg-[#008080] text-white p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            Order #{order._id.slice(-6)}
          </h2>
          <p className="text-sm flex items-center gap-2 mt-1">
            <FaRegCalendarAlt className="text-gray-200" />
            {new Date(order.createdAt).toLocaleDateString()} |{" "}
            {new Date(order.createdAt).toLocaleTimeString()}
          </p>
        </div>
        <span
          className={`mt-2 sm:mt-0 inline-block px-3 py-1 text-xs sm:text-sm lg:text-base 2xl:text-lg font-medium rounded-full  ${
            order.status === "pending"
              ? "bg-yellow-500 text-white"
              : order.status === "shipped"
              ? "bg-blue-500 text-white"
              : order.status === "delivered"
              ? "bg-green-500 text-white"
              : order.status === "cancelled"
              ? "bg-red-500 text-white"
              : "bg-gray-400 text-white"
          }`}
        >
          {order.status}
        </span>
      </div>

      {/* Order Items */}
      <div className="p-4 space-y-4">
        <h3 className="font-semibold text-[#008080] mb-2 flex items-center gap-2">
          <FiPackage /> Ordered Items
        </h3>

        <div className="space-y-4">
          {order.cart.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-3 border rounded-lg shadow-sm hover:shadow-md transition"
            >
              <Image
                src={item.cart.image}
                alt={item.cart.name}
                height={64}
                width={64}
                className="w-16 h-16 object-cover rounded-md border"
              />
              <div className="flex-1">
                <p className="font-medium">{item.cart.name}</p>
                <p className="text-sm text-gray-500">{item.cart.category}</p>
                <p className="text-sm text-gray-600 mt-1">
                  Qty: <span className="font-semibold">{item.quantity}</span>
                </p>
              </div>
              <p className="font-semibold text-gray-800">
                ${(item.cart.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Order Footer */}
      <div className="bg-gray-50 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t">
        <div className="space-y-1 text-sm">
          <p>
            <span className="font-medium">Shipping:</span> ${order.shippingFee}
          </p>
          <p>
            <span className="font-medium">Total:</span>{" "}
            <span className="text-[#008080] font-semibold">
              ${order.orderTotal}
            </span>
          </p>
        </div>

        <button
          onClick={() => deleteOrder(order._id)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition"
        >
          <MdDelete className="text-lg" /> Delete Order
        </button>
      </div>
    </motion.div>
  );
};

export default UserOrderCard;
