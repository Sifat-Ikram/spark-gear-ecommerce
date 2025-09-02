"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import fallback from "@/assets/fallback.png";
import { useAuth } from "@/provider/AuthContext";
import { useCart } from "@/provider/CartContext";
import { PiMinusSquareFill } from "react-icons/pi";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { MdCancel, MdDelete } from "react-icons/md";
import { BsFillPlusSquareFill } from "react-icons/bs";
import { useCartByEmail } from "@/hooks/useCartByEmail";
import { motion, AnimatePresence } from "framer-motion";

const CartPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const { isOpen, closeCart } = useCart();
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => setHasMounted(true), []);
  const email = hasMounted && isOpen ? user?.email : null;
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

  const handleIncrease = (id, productName) => {
    if (user?.email) {
      setCart((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
      axiosPublic
        .patch(`/api/cart/${id}`, { action: "increase" })
        .then(() => cartRefetch());
    } else {
      const updatedCart = cart.map((item) =>
        item.cart.name === productName
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const handleDecrease = (id, productName) => {
    if (user?.email) {
      setCart((prev) =>
        prev.map((item) =>
          item._id === id
            ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
            : item
        )
      );
      axiosPublic
        .patch(`/api/cart/${id}`, { action: "decrease" })
        .then(() => cartRefetch());
    } else {
      const updatedCart = cart
        .map((item) =>
          item.cart.name === productName
            ? { ...item, quantity: Math.max(1, item.quantity - 1) }
            : item
        )
        .filter((item) => item.quantity > 0);
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const handleDelete = (id, productName) => {
    if (user?.email) {
      axiosPublic.delete(`/api/cart/${id}`).then(() => cartRefetch());
    } else {
      const updatedCart = cart.filter((item) => item.cart.name !== productName);
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/40 z-[9999]"
            onClick={closeCart}
          ></div>

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 w-3/4 sm:w-1/2 lg:w-1/3 2xl:w-1/3 h-full bg-white shadow-xl z-[10000] flex flex-col"
          >
            {/* Header */}
            <div className="p-4 flex justify-between items-center border-b">
              <h2 className="text-lg font-bold text-[#1a7f73]">Your Cart</h2>
              <button
                onClick={closeCart}
                className="text-xl font-bold text-[#00a88f] hover:text-[#1a7f73]"
              >
                <MdCancel />
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-between">
              <div className="flex-1 overflow-y-auto overflow-x-hidden">
                {cartIsLoading ? (
                  <p className="text-center mt-8">Loading...</p>
                ) : cartError ? (
                  <p>Error loading cart.</p>
                ) : cart.length === 0 ? (
                  <p className="text-center mt-8">Your cart is empty</p>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.cart.name}
                      className="flex items-center mb-1 p-3 bg-gray-50 w-full shadow"
                    >
                      {/* Image */}
                      <div className="relative w-20 h-20 flex-shrink-0">
                        <Image
                          src={item.cart.image || fallback}
                          alt={item.cart.name}
                          width={80}
                          height={80}
                          className="object-cover rounded-lg"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 px-3 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold text-gray-800 truncate w-11/12">
                              {item.cart.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {item.cart.category}
                            </p>
                          </div>
                          <button
                            onClick={() =>
                              handleDelete(item._id, item.cart.name)
                            }
                            className="text-red-500 hover:text-red-700"
                          >
                            <MdDelete size={20} />
                          </button>
                        </div>

                        <div className="flex justify-between items-center mt-2">
                          {/* Quantity controls */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                handleDecrease(item._id, item.cart.name)
                              }
                            >
                              <PiMinusSquareFill className="text-[#00a88f] hover:text-[#1a7f73] text-xl" />
                            </button>
                            <span className="w-6 text-center font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                handleIncrease(item._id, item.cart.name)
                              }
                            >
                              <BsFillPlusSquareFill className="text-[#00a88f] hover:text-[#1a7f73] text-lg" />
                            </button>
                          </div>

                          {/* Price */}
                          <div className="font-semibold text-gray-800">
                            {(item.cart.price * item.quantity).toFixed(2)} BDT
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="p-4 border-t bottom-0 space-y-2">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>
                    {cart
                      .reduce(
                        (acc, item) => acc + item.cart.price * item.quantity,
                        0
                      )
                      .toFixed(2)}{" "}
                    BDT
                  </span>
                </div>
                <button
                  onClick={() => {
                    closeCart();
                    router.push("/checkout");
                  }}
                  className="w-full buttons"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartPage;
