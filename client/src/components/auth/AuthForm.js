"use client";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash, FaUniversity } from "react-icons/fa";
import InputField from "./InputField";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useAuth } from "@/provider/AuthContext";

export default function AuthForm({ type }) {
  const router = useRouter();
  const axiosPublic = useAxiosPublic();
  const { user, loading, setUser } = useAuth();
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  // Load saved email for "Remember Me"
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberEmail");
    if (savedEmail) {
      setValue("email", savedEmail);
      setRememberMe(true);
    }
  }, [setValue]);

  // Redirect logged-in user away from login page
  useEffect(() => {
    if (!loading && user && type === "login") {
      router.replace("/");
    }
  }, [loading, user, router, type]);

  if (loading || (user && type === "login")) return null;

  const onSubmit = async (data) => {
    if (type === "register") data.role = "user";

    if (rememberMe && type === "login") {
      localStorage.setItem("rememberEmail", data.email);
    } else {
      localStorage.removeItem("rememberEmail");
    }

    try {
      const endpoint =
        type === "login" ? "/api/user/login" : "/api/user/register";
      const res = await axiosPublic.post(endpoint, data);

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title:
          type === "login"
            ? "Logged in successfully"
            : "Registered successfully",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      });

      // Set global user state
      setUser({
        id: res.data.user.id,
        name: res.data.user.name,
        email: res.data.user.email,
        role: res.data.user.role,
      });

      router.push(type === "login" ? "/" : "/login");
    } catch (error) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "Something went wrong. Try again please.",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      });
      console.error(error);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md bg-white font-roboto shadow-xl p-10 rounded-md space-y-6"
    >
      <h2 className="text-3xl font-bold text-center text-[#1A7F73] flex items-center justify-center gap-2">
        <FaUniversity />{" "}
        {type === "login" ? "Login First!" : "Registration here"}
      </h2>

      {type === "register" && (
        <InputField
          label="Full Name"
          type="text"
          placeholder="Enter Your Full Name"
          {...register("name", { required: "Name is required" })}
          error={errors.name && errors.name.message} // ✅ corrected
        />
      )}

      <InputField
        label="Email"
        placeholder="Enter your email"
        type="email"
        {...register("email", { required: "Email is required" })}
        error={errors.email && errors.email.message}
      />

      <div className="relative space-y-1">
        <InputField
          label="Password"
          placeholder="******"
          type={showPassword ? "text" : "password"}
          {...register("password", { required: "Password is required" })}
          error={errors.password && errors.password.message}
        />
        <button
          type="button"
          className="absolute right-3 top-[40px] text-gray-500"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
        {type === "login" && (
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="h-4 w-4"
              />
              Remember Me
            </label>

            <a
              href="/forgotPassword"
              className="text-[#1A7F73] hover:underline text-sm"
            >
              Forgot Password?
            </a>
          </div>
        )}
      </div>

      <button type="submit" className="w-full buttons" disabled={isSubmitting}>
        {isSubmitting
          ? "Please wait..."
          : type === "login"
          ? "Login"
          : "Register"}
      </button>

      <p className="text-center text-sm">
        {type === "login" ? (
          <>
            New here?{" "}
            <Link href="/register" className="text-[#1A7F73] hover:underline">
              Register
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link href="/login" className="text-[#1A7F73] hover:underline">
              Login
            </Link>
          </>
        )}
      </p>
    </motion.form>
  );
}
