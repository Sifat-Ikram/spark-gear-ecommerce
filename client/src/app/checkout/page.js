"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useAuth } from "@/provider/AuthContext";
import Image from "next/image";
import { useCartByEmail } from "@/hooks/useCartByEmail";

const Checkout = () => {
  const { user } = useAuth();
  const { register, handleSubmit } = useForm();
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => setHasMounted(true), []);
  const email = hasMounted ? user?.email : null;
  const {
    cart: storedCartHook,
    cartIsLoading,
    cartError,
    cartRefetch,
  } = useCartByEmail(email, {
    enabled: !!email,
  });

  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (!hasMounted) return;

    if (user?.email && storedCartHook) {
      setCart((prevCart) => {
        if (
          prevCart.length !== storedCartHook.length ||
          prevCart[0]?._id !== storedCartHook[0]?._id
        ) {
          return storedCartHook;
        }
        return prevCart;
      });
    } else {
      const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCart((prevCart) => {
        if (prevCart.length !== localCart.length) {
          return localCart;
        }
        return prevCart;
      });
    }
  }, [hasMounted, storedCartHook, user?.email]);

  console.log(cart);

  const onSubmit = (data) => {
    console.log("Order Data:", data);
    alert("Order Placed Successfully!");
  };

  return (
    <main className="w-11/12 mx-auto px-4 py-8">
      <h1 className="md:text-2xl xl:text-4xl 2xl:text-5xl font-semibold text-center mb-6">
        Checkout
      </h1>

      {/* Order Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="overflow-x-auto mb-8"
      >
        <table className="w-full border border-gray-300 rounded-lg">
          <thead className="bg-[#1a7f73] text-white">
            <tr>
              <th className="p-3 text-center">Order Summary</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Price</th>
              <th className="p-3">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {cart?.map((item) => (
              <tr key={item.cart._id}>
                <td className="p-3 flex items-center gap-2">
                  <div className="relative h-20 w-20 rounded-xl">
                    <Image
                      src={item.cart.image}
                      alt={item.cart.name}
                      fill
                      priority
                    />
                  </div>
                  <div className="gap-2">
                    <strong>{item.cart.name}</strong>
                    <div className="text-gray-600">{item.cart.category}</div>
                  </div>
                </td>
                <td className="p-3 text-center">{item.quantity}</td>
                <td className="p-3 text-center">{item.cart.price}</td>
                <td className="p-3 text-center">
                  {(item.cart.price * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3" className="text-right p-3 font-semibold">
                Subtotal
              </td>
              <td className="p-3 font-semibold text-center">12130</td>
            </tr>
          </tfoot>
        </table>
      </motion.div>

      {/* Form Section */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Delivery Info */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
          <h2 className="bg-gray-700 text-white p-2 rounded-t-lg font-semibold">
            Delivery Information
          </h2>
          <form
            className="flex flex-col gap-4 mt-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              {...register("name")}
              placeholder="Enter your name"
              className="border p-2 rounded w-full"
            />
            <input
              {...register("email")}
              placeholder="Enter your email"
              className="border p-2 rounded w-full"
            />
            <input
              {...register("phone")}
              placeholder="Enter your phone number"
              className="border p-2 rounded w-full"
            />
            <select {...register("city")} className="border p-2 rounded w-full">
              <option value="Dhaka">Dhaka</option>
              <option value="Chattogram">Chattogram</option>
            </select>
            <textarea
              {...register("address")}
              placeholder="Enter your shipping address"
              className="border p-2 rounded w-full"
            ></textarea>
          </form>
        </div>

        {/* Billing Summary */}
        <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-md flex flex-col gap-4">
          <h2 className="bg-gray-700 text-white p-2 rounded-t-lg font-semibold">
            Billing Summary
          </h2>
          <div className="flex justify-between border-b pb-2">
            {" "}
            <span>Item Total</span> <span>Tk 12130</span>{" "}
          </div>
          <div className="flex justify-between border-b pb-2">
            {" "}
            <span>Shipping</span> <span>BDT 60</span>{" "}
          </div>
          <div className="flex justify-between font-semibold text-lg mt-2">
            {" "}
            <span>Order Total</span> <span>Tk 12190</span>{" "}
          </div>
          <button
            onClick={handleSubmit(onSubmit)}
            className="mt-4 bg-blue-600 text-white p-3 rounded w-full hover:bg-blue-700 transition"
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
