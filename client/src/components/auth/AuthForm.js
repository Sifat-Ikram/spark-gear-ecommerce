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
import { jwtDecode } from "jwt-decode";

export default function AuthForm({ type }) {
  const router = useRouter();
  const axiosPublic = useAxiosPublic();
  const { setUser } = useAuth();
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberEmail");
    if (savedEmail) {
      setValue("email", savedEmail);
      setRememberMe(true);
    }
  }, [setValue]);

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
      const { accessToken } = res.data;

      const decoded = jwtDecode(accessToken);

      if (accessToken) {
        setUser({
          id: decoded.id,
          name: decoded.name,
          email: decoded.email,
          role: decoded.role,
        });
      }

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

      if (decoded.role === "admin") {
        router.push("/admin/admin-dashboard");
      } else {
        router.push("/");
      }
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
      className="w-4/5 mx-auto bg-white shadow-xl px-10 pt-10 pb-7 2xl:p-20 rounded-md space-y-6 2xl:space-y-10"
    >
      <h2 className="text-3xl font-bold exo text-center text-[#173faf] flex items-center justify-center gap-2">
        <FaUniversity />{" "}
        {type === "login" ? "Login First!" : "Registration here"}
      </h2>

      <div>
        {type === "register" && (
          <InputField
            label="Full Name"
            type="text"
            placeholder="Enter Your Full Name"
            {...register("name", { required: "Name is required" })}
            error={errors.name && errors.name.message}
          />
        )}
      </div>

      <div>
        <InputField
          label="Email"
          placeholder="Enter your email"
          type="email"
          {...register("email", { required: "Email is required" })}
          error={errors.email && errors.email.message}
        />
      </div>

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
            <label className="flex items-center gap-2 text-sm roboto">
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
              className="text-[#173faf] hover:underline text-sm roboto"
            >
              Forgot Password?
            </a>
          </div>
        )}
      </div>

      <button
        type="submit"
        className="w-full buttons roboto"
        disabled={isSubmitting}
      >
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
            <Link
              href="/register"
              className="text-[#173faf] hover:underline roboto"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#173faf] hover:underline roboto"
            >
              Login
            </Link>
          </>
        )}
      </p>
    </motion.form>
  );
}
