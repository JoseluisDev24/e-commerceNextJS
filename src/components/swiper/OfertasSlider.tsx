"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { Product } from "@/context/ShoppingCartContext";
import ProductCard from "@/components/products/ProductCard";
import dataProductsJson from "@/data.json";

const dataProducts: Product[] = dataProductsJson as Product[];
const productosEnOferta = dataProducts.filter((p) => p.enOferta);

export default function OfertasSlider() {
  return (
    <div className="relative px-4">
      <div className="hidden md:block">
        <div className="swiper-button-prev text-gray-700" />
        <div className="swiper-button-next text-gray-700" />
      </div>

      <Swiper
        modules={[Autoplay, Navigation]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        slidesPerView={"auto"}
        spaceBetween={12}
      >
        {productosEnOferta.map((product) => (
          <SwiperSlide key={product.id} className="!w-[140px]">
            <ProductCard product={product} compact />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
