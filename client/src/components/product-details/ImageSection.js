"use client";

import Image from "next/image";
import { useState } from "react";
import "inner-image-zoom/lib/styles.min.css";
import InnerImageZoom from "react-inner-image-zoom";

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

  return (
    <div className="flex flex-col gap-6 w-full mx-auto">
      <div className="flex-1">
        <div className="relative w-full aspect-square h-[325px] rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
          <InnerImageZoom
            src={finalImages[selectedIndex]?.url}
            zoomSrc={finalImages[selectedIndex]?.url}
            fullscreenOnMobile={true}
            alt={finalImages[selectedIndex]?.alt || "Main image"}
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Thumbnails */}
      {finalImages.length > 1 && (
        <div className="flex gap-3 justify-center">
          {finalImages.map((img, idx) => (
            <div
              key={idx}
              className={`relative w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 cursor-pointer transition-all duration-200 ${
                selectedIndex === idx
                  ? "border-[#008080] ring-1 ring-[#008080]"
                  : "border-gray-100 hover:border-[#008080]"
              }`}
              onClick={() => setSelectedIndex(idx)}
            >
              <Image
                src={img.url}
                alt={img.alt || `Thumbnail ${idx + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageSection;
