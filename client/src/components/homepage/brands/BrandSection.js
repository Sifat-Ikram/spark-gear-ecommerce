"use client";
import "swiper/css";
import Link from "next/link";
import "swiper/css/navigation";
import Image from "next/image";
import { useRef, useState } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

import chico from "@/assets/brands/chico.webp";
import ivola from "@/assets/brands/ivola.webp";
import lego from "@/assets/brands/lego.webp";
import nerf from "@/assets/brands/nerf.webp";
import nestle from "@/assets/brands/nestle.webp";
import nutrica from "@/assets/brands/nutrica.webp";
import paydoh from "@/assets/brands/payDoh.webp";
import philip from "@/assets/brands/philip.webp";
import rovco from "@/assets/brands/rovco.webp";
import winfun from "@/assets/brands/winfun.webp";

const BrandSection = () => {
  const swiperRef = useRef(null);

  const brands = [
    {
      _id: 1,
      name: "Chico",
      image: chico,
    },
    {
      _id: 2,
      name: "Ivola",
      image: ivola,
    },
    {
      _id: 3,
      name: "Lego",
      image: lego,
    },
    {
      _id: 4,
      name: "Nerf",
      image: nerf,
    },
    {
      _id: 5,
      name: "Nestle",
      image: nestle,
    },
    {
      _id: 6,
      name: "Nutrica",
      image: nutrica,
    },
    {
      _id: 7,
      name: "PayDoh",
      image: paydoh,
    },
    {
      _id: 8,
      name: "Philip",
      image: philip,
    },
    {
      _id: 9,
      name: "Rovco",
      image: rovco,
    },
    {
      _id: 10,
      name: "Winfun",
      image: winfun,
    },
  ];

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <section className="">
      {/* Section Title */}
      <h2 className="title-text exo text-left mb-10 sm:mb-12 md:mb-16 leading-snug">
        Our Brands
      </h2>

      <div className="relative">
        {!isBeginning && (
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-1 lg:p-1.5 xl:p-2 rounded-full bg-[#173faf] hover:bg-[#143694] transition"
            onClick={() => swiperRef.current.slidePrev()}
          >
            <FiChevronLeft className="text-base sm:text-xl lg:text-2xl xl:text-4xl text-white" />
          </button>
        )}
        {!isEnd && (
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-1 lg:p-1.5 xl:p-2 rounded-full bg-[#173faf] hover:bg-[#143694] transition"
            onClick={() => swiperRef.current.slideNext()}
          >
            <FiChevronRight className="text-base sm:text-xl lg:text-2xl xl:text-4xl text-white" />
          </button>
        )}

        <div className="relative w-11/12 mx-auto">
          <Swiper
            spaceBetween={24}
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              320: { slidesPerView: 2 },
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 5 },
              1440: { slidesPerView: 6 },
              1900: { slidesPerView: 7 },
            }}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => {
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            modules={[Autoplay]}
            className="mySwiper"
          >
            {brands.map((brand) => (
              <SwiperSlide key={brand._id}>
                <Link
                  href={`/brandDetails/${brand._id}`}
                  className="flex flex-col items-center cursor-pointer bg-gray-50 rounded-xl shadow hover:shadow-lg px-3 py-4 sm:px-4 sm:py-5 md:px-5 md:py-6 transition-all duration-300"
                >
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 xl:w-28 2xl:w-36 lg:h-24 xl:h-28 2xl:h-36 mb-2 sm:mb-3 md:mb-4 xl:mb-6 2xl:mb-8">
                    <Image
                      src={brand.image}
                      alt={brand.name}
                      fill
                      priority
                      className="object-cover rounded-full h-full w-full"
                    />
                  </div>
                  <span className="subtitle-text roboto text-center leading-tight">
                    {brand.name}
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

export default BrandSection;
