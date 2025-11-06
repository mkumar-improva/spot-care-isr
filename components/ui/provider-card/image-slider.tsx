"use client";
import React, { useState, FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import placeHolderSvg from "@/assets/PlaceHolders/placeholder.svg";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";

interface ImageSliderProps {
  images: string[]; // Array of image URLs
  type?: "provider" | "business";
}

const ImageSlider: FC<ImageSliderProps> = ({ images, type = "provider" }) => {
  return (
    <Swiper
      modules={[Pagination, Navigation]}
      pagination={{
        clickable: true,
        dynamicBullets: true,
        dynamicMainBullets: 5,
      }}
      navigation={true}
      slidesPerView={1}
      className={`h-full swiper-${type}`}
    >
      {images.map((img, i) => (
        <SwiperSlide key={i}>
          <ImageWithLoader src={img} alt={`Slide ${i + 1}`} />
        </SwiperSlide>
      ))}
      {!images.includes(placeHolderSvg) && images.length > 1 && (
        <div className="absolute w-full bottom-0 h-8 bg-black/30 z-10"></div>
      )}
    </Swiper>
  );
};

const ImageWithLoader: React.FC<{ src: string; alt: string }> = ({
  src,
  alt,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className="relative w-full h-full bg-neutral-100">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-white/40">
          <div className="size-6 border-2 border-t-transparent border-gray-500 rounded-full animate-spin" />
        </div>
      )}
      <img
        src={error ? placeHolderSvg : src}
        alt={alt}
        className="object-cover w-full h-full transition-opacity duration-500"
        onLoad={() => setLoading(false)}
        onError={(e) => {
          setLoading(false);
          setError(true);
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = placeHolderSvg;
        }}
      />
    </div>
  );
};

export default ImageSlider;
