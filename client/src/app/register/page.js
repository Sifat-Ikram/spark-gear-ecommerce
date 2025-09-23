import Head from "next/head";
import Image from "next/image";
import register from "@/assets/register.png";
import AuthForm from "@/components/auth/AuthForm";

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Registration page</title>
      </Head>
      <div className="min-h-screen flex flex-col md:flex-row">
        {/* Left Side - Image/Branding */}
        <div className="hidden relative md:flex md:w-1/2 text-white flex-col items-center justify-center p-10">
          <Image
            src={register}
            alt="register"
            fill
            priority
            className="h-full w-full"
          />
        </div>

        {/* Right Side - Form */}
        <div className="w-full max-md:min-h-screen md:w-1/2 flex flex-col bg-gray-50">
          <div className="w-full flex items-center justify-end mt-5 px-5">
            <a href={"/"}>
              <button className="buttons flex items-center justify-center gap-1 flex-nowrap">
                Back
              </button>
            </a>
          </div>
          <div className="flex justify-center items-center  px-2 sm:px-5 md:pt-9 md:px-8 2xl:pt-52">
            <AuthForm type="register" />
          </div>
        </div>
      </div>
    </>
  );
}
