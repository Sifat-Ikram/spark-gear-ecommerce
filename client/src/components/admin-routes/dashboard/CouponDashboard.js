"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiEdit,
  FiTrash2,
  FiPlus,
  FiToggleLeft,
  FiToggleRight,
} from "react-icons/fi";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useCoupons } from "@/hooks/useCoupons";
import Swal from "sweetalert2";

export default function CouponDashboard() {
  const axiosPublic = useAxiosPublic();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [formData, setFormData] = useState({
    code: "",
    type: "percentage",
    value: "",
    minPurchase: "",
    expiryDate: "",
    isActive: true,
  });

  const { coupons, couponIsLoading, couponError, couponRefetch } = useCoupons();

  // Handle form input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCoupon) {
        await axiosPublic.put(`/api/coupon/${editingCoupon._id}`, formData);
        Swal.fire("Updated!", "Coupon has been updated.", "success");
      } else {
        await axiosPublic.post("/api/coupon", formData);
        Swal.fire("Added!", "Coupon has been added.", "success");
      }
      setModalOpen(false);
      setEditingCoupon(null);
      setFormData({
        code: "",
        type: "percentage",
        value: "",
        minPurchase: "",
        expiryDate: "",
        isActive: true,
      });
      couponRefetch();
    } catch (err) {
      Swal.fire("Error!", "Something went wrong.", "error");
    }
  };

  const handleEdit = (coupon) => {
    setEditingCoupon(coupon);
    setFormData({
      code: coupon.code,
      type: coupon.type,
      value: coupon.value,
      minPurchase: coupon.minPurchase || "",
      expiryDate: coupon.expiryDate.split("T")[0],
      isActive: coupon.isActive,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#173faf",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      await axiosPublic.delete(`/api/coupon/${id}`);
      Swal.fire("Deleted!", "Coupon has been deleted.", "success");
      couponRefetch();
    } catch (err) {
      Swal.fire("Error!", "Failed to delete coupon.", "error");
    }
  };

  const handleToggle = async (id) => {
    try {
      const res = await axiosPublic.patch(`/api/coupon/${id}/toggle`);
      const status = res.data.isActive ? "activated" : "deactivated";
      Swal.fire("Updated!", `Coupon has been ${status}.`, "success");
      couponRefetch();
    } catch (err) {
      Swal.fire("Error!", "Failed to toggle coupon status.", "error");
    }
  };

  if (couponIsLoading) return <p className="text-center py-10">Loading...</p>;
  if (couponError)
    return (
      <p className="text-center py-10 text-red-500">Error loading coupons</p>
    );

  return (
    <div className="p-4 sm:p-6 lg:p-8 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-0">
          Coupons Management
        </h1>
        <button onClick={() => setModalOpen(true)} className="buttons">
          {" "}
          Add Coupon
        </button>
      </div>

      {/* Coupon Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-[#173faf] rounded-t-lg">
            <tr>
              <th className="py-2 px-3 text-left text-sm sm:text-base font-medium text-white rounded-tl-lg">
                Code
              </th>
              <th className="py-2 px-3 text-left text-sm sm:text-base font-medium text-white">
                Type
              </th>
              <th className="py-2 px-3 text-left text-sm sm:text-base font-medium text-white">
                Value
              </th>
              <th className="py-2 px-3 text-left text-sm sm:text-base font-medium text-white">
                Min Purchase
              </th>
              <th className="py-2 px-3 text-left text-sm sm:text-base font-medium text-white">
                Expiry
              </th>
              <th className="py-2 px-3 text-left text-sm sm:text-base font-medium text-white">
                Status
              </th>
              <th className="py-2 px-3 text-left text-sm sm:text-base font-medium text-white rounded-tr-lg">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon) => (
              <motion.tr
                key={coupon._id}
                className="border-t border-gray-200 hover:bg-gray-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <td className="py-2 px-3 text-sm sm:text-base">
                  {coupon.code}
                </td>
                <td className="py-2 px-3 text-sm sm:text-base capitalize">
                  {coupon.type}
                </td>
                <td className="py-2 px-3 text-sm sm:text-base">
                  {coupon.type === "percentage"
                    ? `${coupon.value}%`
                    : `BDT ${coupon.value}`}
                </td>
                <td className="py-2 px-3 text-sm sm:text-base">
                  {coupon.minPurchase || "-"}
                </td>
                <td className="py-2 px-3 text-sm sm:text-base">
                  {new Date(coupon.expiryDate).toLocaleDateString()}
                </td>
                <td className="py-2 px-3 text-sm sm:text-base">
                  <button
                    onClick={() => handleToggle(coupon._id)}
                    className="buttons"
                  >
                    {coupon.isActive ? (
                      <FiToggleRight className="text-green-500 text-lg sm:text-xl" />
                    ) : (
                      <FiToggleLeft className="text-gray-400 text-lg sm:text-xl" />
                    )}
                  </button>
                </td>
                <td className="py-2 px-3 text-sm sm:text-base flex space-x-3">
                  <button
                    onClick={() => handleEdit(coupon)}
                    className="buttons text-blue-500 hover:text-blue-700"
                  >
                    <FiEdit className="text-lg sm:text-xl" />
                  </button>
                  <button
                    onClick={() => handleDelete(coupon._id)}
                    className="buttons text-red-500 hover:text-red-700"
                  >
                    <FiTrash2 className="text-lg sm:text-xl" />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-lg w-full max-w-md p-6"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
          >
            <h2 className="text-xl sm:text-2xl font-bold mb-4">
              {editingCoupon ? "Edit Coupon" : "Add Coupon"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                placeholder="Coupon Code"
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#173faf]"
              />
              <div className="flex space-x-2">
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-1/2 border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#173faf]"
                >
                  <option value="percentage">Percentage</option>
                  <option value="fixed">Fixed Amount</option>
                </select>
                <input
                  type="number"
                  name="value"
                  value={formData.value}
                  onChange={handleChange}
                  placeholder="Value"
                  required
                  className="w-1/2 border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#173faf]"
                />
              </div>
              <input
                type="number"
                name="minPurchase"
                value={formData.minPurchase}
                onChange={handleChange}
                placeholder="Minimum Purchase (optional)"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#173faf]"
              />
              <input
                type="date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#173faf]"
              />
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  id="active"
                  className="w-4 h-4"
                />
                <label htmlFor="active" className="text-sm sm:text-base">
                  Active
                </label>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setModalOpen(false);
                    setEditingCoupon(null);
                  }}
                  className="buttons"
                >
                  Cancel
                </button>
                <button type="submit" className="buttons">
                  {editingCoupon ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
