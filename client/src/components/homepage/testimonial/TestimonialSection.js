"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import ReviewCard from "@/components/card/ReviewCard";
import { useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const testimonials = [
  {
    id: 1,
    name: "Amit Sarker",
    image: "https://i.ibb.co/2cn7FzG/user1.jpg",
    product: "ErgoFlex Split Keyboard",
    review:
      "This keyboard changed my work life! Very comfortable and helps me type faster without strain.",
    rating: 5,
  },
  {
    id: 2,
    name: "Mitu Rahman",
    image: "https://i.ibb.co/dGkTvMh/user2.jpg",
    product: "ZenBook Ultra 14",
    review:
      "Super sleek laptop, lightweight yet powerful. Perfect for my daily work and entertainment.",
    rating: 4,
  },
  {
    id: 3,
    name: "Shahriar Kabir",
    image: "",
    product: "ProGamer Keyboard & Mouse",
    review:
      "RGB lighting is awesome! Build quality is solid, and it made my gaming setup look amazing.",
    rating: 5,
  },
  {
    id: 4,
    name: "Nadia Akter",
    image: "https://i.ibb.co/yn7m0L5/user4.jpg",
    product: "NovaSound AirFlow Headphone",
    review:
      "Sound quality is crisp with deep bass. Very comfortable for long listening sessions.",
    rating: 4,
  },
  {
    id: 5,
    name: "Rakib Hasan",
    image: "",
    product: "TitanBook Gaming 17",
    review:
      "A beast of a laptop! Handles heavy games without any lag. Absolutely worth it.",
    rating: 5,
  },
];

export default function TestimonialSection({ reviews }) {
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <section className="relative w-full bg-white">
      <h2 className="title-text exo text-center mb-14">
        What Our Customers Say
      </h2>

      <div className="relative px-4 sm:px-6 lg:px-12 w-full">
        {!isBeginning && (
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 lg:p-2 2xl:p-3 rounded-full bg-[#173faf] hover:bg-[#143694] transition"
            onClick={() => swiperRef.current.slidePrev()}
          >
            <FiChevronLeft className="text-base sm:text-xl lg:text-2xl xl:text-4xl text-white" />
          </button>
        )}
        {!isEnd && (
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 lg:p-2 2xl:p-3 rounded-full bg-[#173faf] hover:bg-[#143694] transition"
            onClick={() => swiperRef.current.slideNext()}
          >
            <FiChevronRight className="text-base sm:text-xl lg:text-2xl xl:text-4xl text-white" />
          </button>
        )}

        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 16 },
            640: { slidesPerView: 1.2, spaceBetween: 18 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
            1440: { slidesPerView: 3, spaceBetween: 32 },
          }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          className="mySwiper w-full"
        >
          {reviews.slice(0, 10).map((review) => (
            <SwiperSlide key={review.productName} className="h-full">
              <ReviewCard review={review} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
