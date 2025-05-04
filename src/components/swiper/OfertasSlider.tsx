"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { Product, useProducts } from "@/queries/products";
import ProductCard from "@/components/products/ProductCard";

export default function OfertasSlider() {
  const { products, loading, error } = useProducts(); 
  const [productosEnOferta, setProductosEnOferta] = useState<Product[]>([]);

  useEffect(() => {
    if (!loading && !error) {
      setProductosEnOferta(products.filter((p) => p.offer));
    }
  }, [products, loading, error]); 

  if (loading) {
    return <p className="text-center">Cargando ofertas...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="relative px-4">
      <div className="hidden md:block">
        <div className="swiper-button-prev text-gray-700" />
        <div className="swiper-button-next text-gray-700" />
      </div>

      <Swiper
        modules={[Autoplay, Navigation]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={false}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        slidesPerView={"auto"}
        spaceBetween={12}
      >
        {productosEnOferta.length > 0 ? (
          productosEnOferta.map((product) => (
            <SwiperSlide key={product.id} className="!w-[140px]">
              <ProductCard product={product} compact />
            </SwiperSlide>
          ))
        ) : (
          <p className="text-center">No hay productos en oferta actualmente.</p>
        )}
      </Swiper>
    </div>
  );
}
