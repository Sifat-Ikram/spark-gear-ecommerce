"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const placeholder = "https://i.ibb.co/X1kSkVK/general-img-landscape.png";

const ImageSection = ({ images }) => {
  const validImages =
    Array.isArray(images) &&
    images.filter((img) => img.url && img.url.trim() !== "");

  const finalImages =
    validImages && validImages.length > 0
      ? validImages
      : [{ url: placeholder, alt: "Placeholder image" }];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [offset, setOffset] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setOffset({ x: 50, y: 50 });
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div
        className="flex-1 flex justify-center items-center overflow-hidden rounded-2xl shadow-lg relative h-[500px] md:h-[500px]"
        onMouseMove={(e) => {
          handleMouseMove(e);
          setHovered(true);
        }}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          className="absolute"
          style={{
            top: `${-offset.y}%`,
            left: `${-offset.x}%`,
            transformOrigin: `${offset.x}% ${offset.y}%`,
          }}
          animate={{ scale: hovered ? 2 : 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 30 }}
        >
          <Image
            src={finalImages[selectedIndex].url}
            alt={finalImages[selectedIndex].alt || "Product Image"}
            width={1000}
            height={1000}
            style={{ objectFit: "contain" }}
            priority
          />
        </motion.div>
      </div>

      {finalImages.length > 1 && (
        <div className="flex md:flex-col gap-2 md:w-24">
          {finalImages.map((img, idx) => (
            <div
              key={idx}
              className={`relative w-20 h-20 rounded-lg overflow-hidden border cursor-pointer ${
                selectedIndex === idx
                  ? "border-primary border-2"
                  : "border-gray-200"
              }`}
              onClick={() => setSelectedIndex(idx)}
            >
              <Image
                src={img.url}
                alt={img.alt || `Thumbnail ${idx + 1}`}
                height={80}
                width={80}
                style={{ objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageSection;
