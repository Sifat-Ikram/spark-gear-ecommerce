"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ImageSection from "./ImageSection";
import { useAuth } from "@/provider/AuthContext";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { FaChevronRight, FaStar } from "react-icons/fa";
import { useCart } from "@/provider/CartContext";
import { useEffect, useState } from "react";
import { useCartByEmail } from "@/hooks/useCartByEmail";

const DetailsTop = ({ product }) => {
  const { user } = useAuth();
  const { openCart } = useCart();
  const axiosPublic = useAxiosPublic();
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => setHasMounted(true), []);
  const email = hasMounted ? user?.email : null;
  const { cartRefetch } = useCartByEmail(email, {
    enabled: !!email,
  });

  if (!product) {
    return (
      <h1 className="text-center text-white text-lg md:text-xl xl:text-2xl font-semibold xl:font-bold">
        Product loading!!!
      </h1>
    );
  }

  const addToCart = async (product) => {
    if (!email) {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

      const existing = storedCart.find(
        (item) => item.cart.name === product.name
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        storedCart.push({
          quantity: 1,
          cart: {
            image: product.images[0].url,
            name: product.name,
            category: product.category,
            price: product.price,
            sku: product.sku,
            stock: product.stock,
          },
        });
      }

      localStorage.setItem("cart", JSON.stringify(storedCart));
    } else {
      const cartData = {
        userEmail: user.email,
        userName: user.name,
        quantity: 1,
        cart: {
          image: product.images[0].url,
          name: product.name,
          category: product.category,
          price: product.price,
          sku: product.sku,
          stock: product.stock,
        },
      };

      try {
        const res = await axiosPublic.post("/api/cart/addCart", cartData);
        cartRefetch();
      } catch (err) {
        console.error("Failed to add to cart:", err);
      }
    }
    openCart();
  };

  return (
    <section className="w-11/12 mx-auto pt-5 pb-10">
      <nav
        className="flex flex-wrap items-center space-x-2 text-gray-600 text-xs sm:text-sm mb-6"
        aria-label="Breadcrumb"
      >
        <Link href="/" className="hover:text-primary font-medium">
          Home
        </Link>
        <FaChevronRight className="w-3 h-3" />
        <Link href="/allProduct" className="hover:text-primary font-medium">
          Products
        </Link>
        <FaChevronRight className="w-3 h-3" />
        <span className="text-gray-900 font-semibold truncate sm:truncate-none max-w-[150px] sm:max-w-full">
          {product.name}
        </span>
      </nav>

      {product && (
        <div className="flex flex-col lg:flex-row lg:justify-between gap-10 items-center">
          <motion.div
            className="lg:w-2/5 w-full flex-shrink-0"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ImageSection images={product?.images} />
          </motion.div>

          {/* Product Info */}
          <motion.div
            className="lg:w-1/2 w-full flex flex-col justify-between h-full"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex-1 flex flex-col justify-between space-y-10 h-full">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 break-words leading-snug sm:leading-tight">
                {product.name}
              </h1>

              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0">
                <div className="flex items-center space-x-2">
                  <div className="flex text-yellow-500">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <FaStar
                        key={idx}
                        className={`h-4 w-4 ${
                          idx < Math.round(product.ratings.average)
                            ? "fill-yellow-500"
                            : "fill-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.ratings.average} / 5 (
                    {product.ratings.reviewsCount} reviews)
                  </span>
                </div>
                <span className="text-sm text-gray-700">
                  {product.warranty} warranty available
                </span>
              </div>

              <p className="text-sm sm:text-base text-gray-600 text-left w-4/5">
                {product?.shortDescription}
              </p>

              <div className="flex flex-col space-y-4 text-gray-800 text-sm sm:text-base">
                <span>
                  <strong>Brand:</strong> {product?.brand}
                </span>
                <span
                  className={`${
                    product.available ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {product.stock} items in stock
                </span>
                <span className="text-lg font-semibold">
                  {product?.price} BDT
                </span>
              </div>
            </div>

            <div className="w-full sm:w-1/2">
              <button
                onClick={() => addToCart(product)}
                className="w-full buttons mt-10"
              >
                Add to Cart
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default DetailsTop;
