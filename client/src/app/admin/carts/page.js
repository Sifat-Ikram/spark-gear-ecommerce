"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrash } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import Image from "next/image";
import { useCarts } from "@/hooks/useCarts";
import { useOrders } from "@/hooks/useOrders";

export default function AdminCartsPage() {
  const { carts, cartIsLoading, cartError, cartRefetch } = useCarts();
  const [selectedUser, setSelectedUser] = useState(null);

  if (cartIsLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-[#173faf] text-xl font-semibold">
        Loading carts...
      </div>
    );
  }

  if (cartError) {
    return (
      <div className="flex justify-center items-center h-screen text-[#173faf] text-xl font-semibold">
        error fetching carts...
      </div>
    );
  }

  if (carts?.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen text-[#173faf] text-xl font-semibold">
        There is no cart item...
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
        Admin Cart Management
      </h1>

      <div className="overflow-x-auto shadow">
        <table className="w-full text-sm md:text-base text-center">
          <thead className="bg-[#173faf] text-white">
            <tr>
              <th className="px-4 py-3 w-[20%] rounded-l-lg">User</th>
              <th className="px-4 py-3 w-[25%]">Email</th>
              <th className="px-4 py-3 w-[10%] text-center">Quantity</th>
              <th className="px-4 py-3 w-[20%] text-center">See Details</th>
              <th className="px-4 py-3 w-[10%] text-center rounded-r-lg">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {carts?.map((cartItem) => (
              <tr
                key={cartItem?._id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3 font-medium w-[20%] truncate">
                  {cartItem?.userName || "N/A"}
                </td>
                <td className="px-4 py-3 w-[25%] truncate">
                  {cartItem?.userEmail}
                </td>
                <td className="px-4 py-3 w-[10%] text-center">
                  {cartItem?.quantity}
                </td>
                <td className="px-4 py-3 w-[20%] text-center">
                  <button
                    onClick={() => setSelectedUser(cartItem)}
                    className="text-[#173faf] hover:scale-110 transition-transform hover:underline cursor-pointer"
                  >
                    See details
                  </button>
                </td>
                <td className="px-4 py-3 w-[10%] text-center">
                  <button
                    onClick={() => deleteUserCart(cartItem?._id)}
                    className="text-red-600 hover:scale-110 transition-transform cursor-pointer"
                  >
                    <FaTrash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {selectedUser && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-xl w-auto overflow-y-auto p-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="flex justify-between items-center mb-6 gap-10">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#173faf]">
                  {selectedUser?.userName || "User"}'s Cart
                </h2>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="text-red-500 text-lg sm:text-xl xl:text-4xl"
                >
                  <MdCancel />
                </button>
              </div>

              {/* Cart item container */}
              <div className="w-full flex flex-col gap-4">
                <div className="bg-gray-50 rounded-xl p-4 shadow-sm flex flex-col sm:flex-row items-center gap-4">
                  <Image
                    src={selectedUser.cart.image}
                    alt={selectedUser.cart.name}
                    height={150}
                    width={150}
                    className="w-full sm:w-24 sm:h-24 object-contain rounded-md border"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base md:text-lg">
                      {selectedUser.cart.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {selectedUser.cart.category}
                    </p>
                    <p className="text-sm">
                      Price:{" "}
                      <span className="font-medium">
                        BDT {selectedUser.cart.price}
                      </span>
                    </p>
                    <p className="text-sm">
                      Quantity:{" "}
                      <span className="font-medium">
                        {selectedUser.quantity}
                      </span>
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500">
                      SKU: {selectedUser.cart.sku}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Stock: {selectedUser.cart.stock}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
