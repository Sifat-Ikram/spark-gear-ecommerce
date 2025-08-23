"use client";
import "swiper/css";
import Image from "next/image";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useCategories } from "@/hooks/useCategories";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import Link from "next/link";

const CategoriesSection = () => {
  const { categories, categoryIsLoading, categoryError } = useCategories();
  const swiperRef = useRef(null);

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  if (categoryIsLoading)
    return (
      <p className="text-center text-gray-600 dark:text-gray-300 text-sm sm:text-base py-6">
        Loading...
      </p>
    );

  if (categoryError)
    return (
      <p className="text-center text-red-500 dark:text-red-300 text-sm sm:text-base py-6">
        Failed to load categories
      </p>
    );

  if (!categories || categories.length === 0)
    return (
      <p className="text-center text-gray-600 dark:text-gray-300 text-sm sm:text-base py-6">
        No categories found
      </p>
    );

  return (
    <section className="">
      {/* Section Title */}
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-left mb-10 sm:mb-12 md:mb-16 text-gray-900 dark:text-white leading-snug">
        Shop by Categories
      </h2>

      <div className="relative">
        {!isBeginning && (
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-[#00a88f] hover:bg-[#1a7f73] transition"
            onClick={() => swiperRef.current.slidePrev()}
          >
            <FiChevronLeft className="text-xl sm:text-2xl text-white" />
          </button>
        )}
        {!isEnd && (
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-[#00a88f] hover:bg-[#1a7f73] transition"
            onClick={() => swiperRef.current.slideNext()}
          >
            <FiChevronRight className="text-xl sm:text-2xl text-white" />
          </button>
        )}

        <div className="relative w-11/12 mx-auto">
          <Swiper
            spaceBetween={24}
            breakpoints={{
              320: { slidesPerView: 2 },
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 6 },
            }}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => {
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            className="mySwiper"
          >
            {categories.map((cat) => (
              <SwiperSlide key={cat._id}>
                <Link
                  href={`/categoryDetails/${cat._id}`}
                  className="flex flex-col items-center cursor-pointer bg-gray-50 dark:bg-[#1c1f2e] rounded-xl shadow hover:shadow-lg px-3 py-4 sm:px-4 sm:py-5 md:px-5 md:py-6 transition-all duration-300"
                >
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 mb-2 sm:mb-3 md:mb-4">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 200px"
                      className="object-cover rounded-full"
                    />
                  </div>
                  <span className="text-xs sm:text-sm md:text-base lg:text-lg font-medium text-gray-700 dark:text-gray-200 text-center leading-tight">
                    {cat.name}
                  </span>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;