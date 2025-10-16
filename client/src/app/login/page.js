import Head from "next/head";
import Image from "next/image";
import login from "@/assets/login.png";
import AuthForm from "@/components/auth/AuthForm";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Login | SparkGear</title>
      </Head>

      <div className="min-h-screen flex flex-col md:flex-row">
        {/* Left Side - Image/Branding */}
        <div className="hidden relative md:flex md:w-1/2 text-white flex-col items-center justify-center p-10">
          <Image
            src={login}
            alt="login"
            fill
            priority
            className="h-full w-full"
          />
        </div>

        {/* Right Side - Form */}
        <div className="w-full max-md:min-h-screen md:w-1/2 flex flex-col bg-gray-50">
          <div className="w-full flex items-center justify-end px-6 py-4">
            <Link
              href="/"
              className="flex items-center gap-1 text-gray-600 hover:text-gray-800 transition-colors duration-200 font-medium"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 12l9-9 9 9M4 10v10h16V10"
                />
              </svg>
              Home
            </Link>
          </div>

          <div className="flex justify-center items-center  px-2 sm:px-5 md:pt-16 md:px-8 2xl:pt-52">
            <AuthForm type="login" />
          </div>
        </div>
      </div>
    </>
  );
}
