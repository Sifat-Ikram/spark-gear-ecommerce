"use client";
import Image from "next/image";
import reset from "../../assets/reset.png";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import Link from "next/link";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const router = useRouter();
  const axiosPublic = useAxiosPublic();

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage("");

    try {
      const response = await axiosPublic.post("/api/password/forgot-password", {
        email: data.email,
      });
      const resetLink = response?.data?.resetURL;
      console.log(resetLink);

      if (resetLink) {
        // Redirect to reset password page
        router.push(resetLink);
      } else {
        // No resetURL found, show success message anyway
        setMessage(
          "If this email is registered, you will receive a password reset link shortly."
        );
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-6 sm:p-10 md:p-12 lg:p-14">
        {/* Image */}
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
            Give your email address here
          </h1>
          <p className="text-gray-500 mt-2 text-sm sm:text-base md:text-lg">
            We’ll send you a reset link if your account exists.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Input */}
          <div className="space-y-2">
            <label className="block font-medium text-gray-800 text-sm sm:text-base md:text-lg">
              Email Address
            </label>
            <input
              type="email"
              placeholder="m32220@gmail.com"
              {...register("email", { required: "Email is required" })}
              className="w-full border border-gray-300 focus:border-teal-500 focus:ring focus:ring-teal-200 rounded-lg px-4 py-3 text-sm sm:text-base shadow-sm outline-none transition"
            />
            {errors.email && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Button */}
          <button type="submit" disabled={loading} className="w-full buttons">
            {loading ? "Resetting Password..." : "Reset Password"}
          </button>

          <Link href={"/"}>
            <h1 className="roboto text-sm sm:text-base md:text-lg text-center hover:underline hover:text-[#008080]">
              Back Home
            </h1>
          </Link>

          {/* Message */}
          {message.length > 0 && (
            <p className="text-center text-gray-700 text-sm sm:text-base mt-4">
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
