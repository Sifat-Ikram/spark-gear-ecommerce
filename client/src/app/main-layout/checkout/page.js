"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Image from "next/image";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useAuth } from "@/provider/AuthContext";
import { useCartByEmail } from "@/hooks/useCartByEmail";

const Checkout = () => {
  const router = useRouter();
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      city: user?.city || "Dhaka",
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
    },
  });

  useEffect(() => {
    if (user) {
      setValue("name", user.name);
      setValue("email", user.email);
    }
  }, [user, setValue]);

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => setHasMounted(true), []);

  const email = hasMounted ? user?.email : null;
  const { cart: storedCartHook } = useCartByEmail(email, {
    enabled: !!email,
  });

  const [cart, setCart] = useState([]);

  const cities = [
    { id: 1, name: "Dhaka" },
    { id: 2, name: "Chattogram" },
    { id: 3, name: "Khulna" },
    { id: 4, name: "Rajshahi" },
    { id: 5, name: "Barishal" },
    { id: 6, name: "Sylhet" },
    { id: 7, name: "Rangpur" },
    { id: 8, name: "Mymensingh" },
    { id: 9, name: "Comilla" },
    { id: 10, name: "Bogra" },
    { id: 11, name: "Pabna" },
    { id: 12, name: "Jessore" },
    { id: 13, name: "Narsingdi" },
    { id: 14, name: "Tangail" },
    { id: 15, name: "Gazipur" },
    { id: 16, name: "Narail" },
    { id: 17, name: "Natore" },
    { id: 18, name: "Brahmanbaria" },
    { id: 19, name: "Feni" },
    { id: 20, name: "Cox's Bazar" },
    { id: 21, name: "Noakhali" },
    { id: 22, name: "Jhalokathi" },
    { id: 23, name: "Pirojpur" },
    { id: 24, name: "Bhola" },
    { id: 25, name: "Kishoreganj" },
    { id: 26, name: "Netrakona" },
    { id: 27, name: "Moulvibazar" },
    { id: 28, name: "Habiganj" },
    { id: 29, name: "Sunamganj" },
    { id: 30, name: "Sirajganj" },
    { id: 31, name: "Lakshmipur" },
    { id: 32, name: "Shariatpur" },
    { id: 33, name: "Meherpur" },
    { id: 34, name: "Chuadanga" },
    { id: 35, name: "Jhenaidah" },
    { id: 36, name: "Magura" },
    { id: 37, name: "Narail" },
    { id: 38, name: "Panchagarh" },
    { id: 39, name: "Thakurgaon" },
    { id: 40, name: "Dinajpur" },
    { id: 41, name: "Kurigram" },
    { id: 42, name: "Gaibandha" },
    { id: 43, name: "Nilphamari" },
    { id: 44, name: "Lalmonirhat" },
    { id: 45, name: "Rangamati" },
    { id: 46, name: "Khagrachari" },
    { id: 47, name: "Bandarban" },
  ];

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

  const selectedCity = watch("city");
  const shippingFee = selectedCity === "Dhaka" ? 80 : 150;

  const selectedMethod = watch("paymentMethod");

  const handleSelect = (method) => {
    setValue("paymentMethod", method, { shouldValidate: true });
  };

  const onSubmit = async (data) => {
    if (!selectedMethod) {
      Swal.fire({
        icon: "warning",
        title: "Payment Method Required",
        text: "Please select a payment method before placing your order.",
      });
      return;
    }
    const orderData = {
      user: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        city: data.city,
        address: data.address,
      },
      cart: cart.map((item) => ({
        cart: item.cart,
        quantity: item.quantity,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        _id: item._id,
      })),
      shippingFee: shippingFee,
      orderTotal:
        cart.reduce((sum, item) => sum + item.cart.price * item.quantity, 0) +
        shippingFee,
      paymentInfo: null,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await axiosPublic.post("/api/order/createOrder", orderData);

      if (res.data) {
        Swal.fire({
          icon: "success",
          title: "Order Placed!",
          text: "Your order has been successfully placed.",
          confirmButtonColor: "#008080",
        });

        if (user?.email) {
          await axiosPublic.delete(`/api/cart/user/${user.email}`);
          setCart([]);
        } else {
          localStorage.removeItem("cart");
          setCart([]);
        }
        router.push("/");
      } else {
        Swal.fire({
          icon: "error",
          title: "Order Failed",
          text: result.message || "Failed to place order.",
        });
      }
    } catch (error) {
      console.error("Checkout Error:", error);
      Swal.fire({
        icon: "error",
        title: "Something Went Wrong",
        text: "Please try again later.",
      });
    }
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
        <table className="w-full">
          <thead className="bg-[#008080] text-white">
            <tr>
              <th className="p-3 text-center rounded-tl-lg">Order Summary</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Price</th>
              <th className="p-3 rounded-tr-lg">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300 border border-gray-300">
            {cart?.map((item) => (
              <tr key={item.cart.name}>
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
                  {(item.cart.price * item.quantity).toFixed(2)} BDT
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3" className="text-right p-3 font-semibold">
                Subtotal
              </td>
              <td className="p-3 font-semibold text-center">
                {cart
                  ?.reduce(
                    (sum, item) => sum + item.cart.price * item.quantity,
                    0
                  )
                  .toFixed(2)}{" "}
                BDT
              </td>
            </tr>
          </tfoot>
        </table>
      </motion.div>

      {/* Form Section */}
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <h2 className="bg-[#008080] text-white p-3 text-center rounded-t-lg text-lg md:text-xl font-semibold">
            Delivery Information
          </h2>
          <form
            className="flex flex-col gap-4 mt-4 px-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col space-y-2">
              <label>Full Name</label>
              <input
                {...register("name")}
                placeholder="Enter your name"
                className="border p-2 rounded w-full"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label>Email</label>
              <input
                {...register("email")}
                placeholder="Enter your email"
                className="border p-2 rounded w-full"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label>Phone Number</label>
              <input
                {...register("phone")}
                placeholder="Enter your phone number"
                className="border p-2 rounded w-full"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label>Current city</label>
              <select
                {...register("city")}
                className="border p-2 rounded w-full"
                defaultValue="Dhaka"
              >
                {cities.map((city) => (
                  <option key={city.id} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col space-y-2">
              <label>Shipping Address</label>
              <textarea
                {...register("address")}
                placeholder="Enter your shipping address"
                className="border p-2 rounded w-full"
              ></textarea>
            </div>
          </form>
        </div>

        {/* Billing Summary */}
        <div className="w-full lg:w-1/3 flex flex-col justify-between max-lg:space-y-10">
          <div className="flex flex-col divide-y divide-gray-300">
            <h2 className="bg-[#008080] text-white p-3 text-center rounded-t-lg text-lg md:text-xl font-semibold">
              Billing Summary
            </h2>
            <div className="flex justify-between items-center p-4 text-sm md:text-base">
              <span>Item Total</span>
              <span className="font-medium">
                {cart
                  ?.reduce(
                    (sum, item) => sum + item.cart.price * item.quantity,
                    0
                  )
                  .toFixed(2)}{" "}
                BDT
              </span>
            </div>
            <div className="flex justify-between items-center p-4 text-sm md:text-base">
              <span>Shipping</span>
              <span className="font-medium">{shippingFee} BDT</span>
            </div>
            <div className="flex justify-between items-center p-4 mt-2 text-lg md:text-xl font-semibold bg-gray-50">
              <span>Order Total</span>
              <span>
                {(
                  cart?.reduce(
                    (sum, item) => sum + item.cart.price * item.quantity,
                    0
                  ) + shippingFee
                ).toFixed(2)}{" "}
                BDT
              </span>
            </div>
          </div>
          <div>
            <h3 className="text-[#008080] font-semibold text-base md:text-lg mb-3">
              Payment Method
            </h3>

            {/* Card & bKash row */}
            <div className="flex gap-4 mb-4">
              <button
                type="button"
                onClick={() => handleSelect("card")}
                className={`flex-1 h-14 rounded-lg bg-cover bg-center relative shadow-md transition-transform ${
                  selectedMethod === "card" ? "ring-2 ring-[#008080]" : ""
                } hover:scale-105`}
                style={{
                  backgroundImage:
                    "url('https://i.ibb.co.com/fz2spNsH/mc-sym-card-wrld-business-5-BIN-lmc1280x720.png')",
                }}
              >
                <span className="absolute bottom-2 left-2 text-white font-semibold text-lg md:text-xl">
                  Card
                </span>
              </button>
              <button
                type="button"
                onClick={() => handleSelect("bkash")}
                className={`flex-1 h-14 rounded-lg bg-gray-200 bg-cover bg-center relative shadow-md transition-transform ${
                  selectedMethod === "bkash" ? "ring-2 ring-[#008080]" : ""
                } hover:scale-105`}
                style={{
                  backgroundImage:
                    "url('https://i.ibb.co.com/mrj2yMcn/bkash.jpg')",
                }}
              >
                <span className="absolute bottom-2 left-2 text-white font-semibold">
                  bKash
                </span>
              </button>
            </div>

            {/* Cash on Delivery */}
            <button
              type="button"
              onClick={() => handleSelect("cod")}
              className={`w-full h-14 rounded-lg border-1 border-[#008080] font-semibold transition-colors ${
                selectedMethod === "cod"
                  ? "bg-[#008080] text-white"
                  : "bg-white text-[#008080]"
              } hover:bg-[#008080] hover:text-white shadow-md`}
            >
              Cash on Delivery
            </button>
          </div>

          <button onClick={handleSubmit(onSubmit)} className="w-full buttons">
            PLACE ORDER
          </button>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
