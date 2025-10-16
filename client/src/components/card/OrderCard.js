"use client";
import { motion } from "framer-motion";
import { FiPackage, FiUser, FiDollarSign } from "react-icons/fi";
import { AiOutlinePhone } from "react-icons/ai";
import Image from "next/image";
import Swal from "sweetalert2";
import { useEffect, useRef, useState } from "react";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { MdDelete } from "react-icons/md";

const STATUSES = ["pending", "processing", "shipped", "delivered", "cancelled"];

const OrderCard = ({ order, orderRefetch }) => {
  const [updating, setUpdating] = useState(false);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleStatusChange = async (newStatus) => {
    if (newStatus === order.status) return;

    try {
      setUpdating(true);
      await axiosSecure.patch(`/api/order/status/${order._id}`, {
        status: newStatus,
      });

      orderRefetch();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong while updating the status.",
      });
    } finally {
      setUpdating(false);
    }
  };

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
          setUpdating(true);
          await axiosSecure.delete(`/api/order/${id}`);

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
        } finally {
          setUpdating(false);
        }
      }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-gray-50 shadow-md rounded-lg p-4 md:p-6 border-l-4 border-[#173faf]"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div className="w-full sm:w-2/5 flex flex-wrap justify-between space-y-3">
          <div className="w-full flex flex-col justify-between gap-1">
            <h2 className="font-semibold text-lg flex items-center gap-2">
              <FiUser /> {order.user.name}
            </h2>
            <p className="text-gray-600">{order.user.email}</p>
            <p className="flex items-center gap-1 text-gray-600">
              <AiOutlinePhone /> {order.user.phone}
            </p>
            <p className="text-gray-600">
              {order.user.address}, {order.user.city}
            </p>
          </div>
          <div className="w-full flex flex-col justify-between">
            <div>
              <h3 className="font-semibold text-[#173faf] mb-2 flex items-center gap-2">
                <FiDollarSign /> Summary
              </h3>
              <p className="text-gray-700">
                Shipping Fee: ${order.shippingFee}
              </p>
              <p className="text-gray-700 font-semibold">
                Total: ${order.orderTotal}
              </p>
              {order.paymentInfo && (
                <p className="text-green-600 mt-1">Payment Completed</p>
              )}
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="w-full sm:w-1/2 overflow-x-auto">
          <h3 className="font-semibold text-[#173faf] mb-2 flex items-center gap-2">
            <FiPackage /> Items
          </h3>
          <div className="flex flex-col gap-2">
            {order.cart.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-2 border rounded hover:shadow transition"
              >
                <Image
                  src={item.cart.image}
                  alt={item.cart.name}
                  height={64}
                  width={64}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="font-medium">{item.cart.name}</p>
                  <p className="text-sm text-gray-500">{item.cart.category}</p>
                </div>
                <p className="font-semibold">${item.cart.price}</p>
                <p className="text-gray-600">x{item.quantity}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full mt-4 border-t-[1px] border-gray-300 p-2 lg:p-3 xl:p-4 flex flex-wrap justify-between items-center">
        <div ref={dropdownRef} className="relative w-fit">
          <button
            disabled={updating}
            onClick={() => setOpen((prev) => !prev)}
            className={`px-4 py-2 border border-[#173faf] cursor-pointer rounded font-medium flex items-center justify-between gap-2 w-40 ${
              updating
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-white text-[#173faf]"
            }`}
          >
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            <svg
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {open && (
            <div className="absolute z-20 w-40 bg-white border border-gray-200 rounded shadow-lg">
              {STATUSES.map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    handleStatusChange(status);
                    setOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-[#173faf] hover:text-white transition"
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          )}
        </div>
        <div>
          <button
            onClick={() => deleteOrder(order._id)}
            className="bg-red-500 hover:bg-red-600 cursor-pointer text-white w-fit px-4 py-2 border rounded font-medium flex items-center justify-between space-x-1"
          >
            <MdDelete className="text-base" /> Delete order
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderCard;
