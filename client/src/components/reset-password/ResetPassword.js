"use client";
import Image from "next/image";
import reset from "../../assets/reset.png";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Swal from "sweetalert2";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import Link from "next/link";

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const axiosPublic = useAxiosPublic();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const password = watch("password");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage("");

    try {
      const response = await axiosPublic.post("/api/password/reset-password", {
        token,
        newPassword: data.password,
      });
      const message = response.data.message || "Password reset successful!";

      Swal.fire({
        title: "Success",
        text: message,
        icon: "success",
        showConfirmButton: false,
        timer: 2000, // 2 seconds
        timerProgressBar: true,
      });

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="w-full flex justify-center items-center h-screen">
        <p className="text-red-600 text-lg font-semibold">
          Invalid or missing reset token.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12">
        {/* Icon */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28">
            <Image
              src={reset}
              alt="reset"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="font-semibold text-gray-900 text-2xl sm:text-3xl md:text-4xl lg:text-[40px] leading-snug">
            Reset your Password
          </h1>
          <p className="text-gray-500 mt-2 text-sm sm:text-base md:text-lg">
            Strong passwords include numbers, letters, and punctuation marks.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* New Password */}
          <div className="space-y-2">
            <label className="block font-medium text-gray-800 text-sm sm:text-base md:text-lg">
              Enter New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="***********"
                {...register("password", { required: "Password is required" })}
                className="w-full border border-gray-300 focus:border-[#173faf] focus:ring focus:ring-[#173faf] rounded-lg px-4 py-3 text-sm sm:text-base shadow-sm outline-none transition"
              />
              <div
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label className="block font-medium text-gray-800 text-sm sm:text-base md:text-lg">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Retype password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className="w-full border border-gray-300 focus:border-[#143694] focus:ring focus:ring-[#143694] rounded-lg px-4 py-3 text-sm sm:text-base shadow-sm outline-none transition"
              />
              <div
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
              >
                {showConfirmPassword ? (
                  <FiEyeOff size={20} />
                ) : (
                  <FiEye size={20} />
                )}
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" disabled={loading} className="w-full buttons">
            {loading ? "Resetting Password..." : "Reset Password"}
          </button>

          <Link href={"/"}>
            <h1 className="roboto text-sm sm:text-base md:text-lg text-center hover:underline hover:text-[#173faf]">
              Back Home
            </h1>
          </Link>

          {/* Message */}
          {message && (
            <p className="text-center text-gray-700 text-sm sm:text-base mt-4">
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
