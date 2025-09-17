"use client";

import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useAxiosPublic from "@/hooks/useAxiosPublic";

const UserProfile = ({ currentUser }) => {
  const axiosPublic = useAxiosPublic();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState(currentUser);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: currentUser?.name || "",
      email: currentUser?.email || "",
      phone: currentUser?.phone || "",
      city: currentUser?.city || "",
      address: currentUser?.address || "",
    },
  });

  useEffect(() => {
    reset({
      name: userInfo?.name || "",
      email: userInfo?.email || "",
      phone: userInfo?.phone || "",
      city: userInfo?.city || "",
      address: userInfo?.address || "",
    });
  }, [userInfo, reset, isEditing]);

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");
    try {
      const res = await axiosPublic.put("/api/users/profile", data);
      setUserInfo(res.data.data);
      setIsEditing(false);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white shadow-lg rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-base sm:text-lg lg:text-2xl font-semibold text-gray-800">
          User Profile
        </h1>
        {!isEditing && (
          <button
            className="px-5 py-2 rounded-md bg-[#008080] text-white hover:bg-[#016b6b] transition flex items-center space-x-3 whitespace-nowrap"
            onClick={() => setIsEditing(true)}
          >
            <FaEdit className="inline-block" />
            <span>Edit</span>
          </button>
        )}
      </div>

      {!isEditing ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-[#E0F7F7] p-4 rounded-lg shadow-sm flex flex-col">
            <span className="text-gray-500 text-sm">Name</span>
            <span className="text-gray-800 font-medium text-lg">
              {userInfo?.name || "User"}
            </span>
          </div>

          <div className="bg-[#E0F7F7] p-4 rounded-lg shadow-sm flex flex-col">
            <span className="text-gray-500 text-sm">Email</span>
            <span className="text-gray-800 font-medium text-lg">
              {userInfo?.email || "Email"}
            </span>
          </div>

          <div className="bg-[#E0F7F7] p-4 rounded-lg shadow-sm flex flex-col">
            <span className="text-gray-500 text-sm">Phone</span>
            <span className="text-gray-800 font-medium text-lg">
              {userInfo?.phone || "Phone"}
            </span>
          </div>

          <div className="bg-[#E0F7F7] p-4 rounded-lg shadow-sm flex flex-col">
            <span className="text-gray-500 text-sm">City</span>
            <span className="text-gray-800 font-medium text-lg">
              {userInfo?.city || "City"}
            </span>
          </div>

          <div className="sm:col-span-2 bg-[#E0F7F7] p-4 rounded-lg shadow-sm flex flex-col">
            <span className="text-gray-500 text-sm">Address</span>
            <span className="text-gray-800 font-medium text-lg">
              {userInfo?.address || "Address"}
            </span>
          </div>
        </div>
      ) : (
        <form
          id="editProfileForm"
          className="w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          {error && (
            <p className="sm:col-span-2 text-red-500 text-sm">{error}</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className=" p-4 rounded-lg flex flex-col">
              <label className="text-gray-500 text-sm mb-1">Name</label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className="w-full border border-gray-400 rounded px-3 py-2"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div className=" p-4 rounded-lg flex flex-col">
              <label className="text-gray-500 text-sm mb-1">Email</label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className="w-full border border-gray-400 rounded px-3 py-2"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className=" p-4 rounded-lg flex flex-col">
              <label className="text-gray-500 text-sm mb-1">Phone</label>
              <input
                type="text"
                {...register("phone")}
                className="w-full border border-gray-400 rounded px-3 py-2"
              />
            </div>

            <div className=" p-4 rounded-lg flex flex-col">
              <label className="text-gray-500 text-sm mb-1">City</label>
              <input
                type="text"
                {...register("city")}
                className="w-full border border-gray-400 rounded px-3 py-2"
              />
            </div>
          </div>

          <div className="sm:col-span-2  p-4 rounded-lg flex flex-col">
            <label className="text-gray-500 text-sm mb-1">Address</label>
            <textarea
              type="text"
              {...register("address")}
              className="w-full border border-gray-400 rounded px-3 py-2"
            />
          </div>
          <div className="flex justify-end items-center gap-4 mt-4">
            <button
              className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 transition"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
            <button
              form="editProfileForm"
              type="submit"
              className="px-4 py-2 rounded bg-[#008080] text-white hover:bg-[#016b6b] transition"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UserProfile;
