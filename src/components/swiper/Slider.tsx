"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

const productosDestacados = [
  { id: 1, imagen: "/oferta1.avif" },
  { id: 2, imagen: "/oferta2.jpg" },
  { id: 3, imagen: "/oferta3.jpg" },
  { id: 4, imagen: "/oferta4.jpg" },
  { id: 5, imagen: "/oferta5.jpg" },
  { id: 6, imagen: "/oferta6.jpg" },
];

export default function DestacadosSwiper() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 pt-4 ">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        pagination={{ clickable: true }}
        slidesPerView={1}
      >
        {productosDestacados.map((producto) => (
          <SwiperSlide key={producto.id}>
            <div className="relative w-full h-48 sm:h-60 bg-white shadow-md rounded-lg overflow-hidden">
              <Image
                src={producto.imagen}
                alt="Imagen del producto"
                fill
                priority
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
