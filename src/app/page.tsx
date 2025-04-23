"use client";

import ProductList from "@/components/products/ProductList";
import Slider from "@/components/swiper/Slider";
import OfertasSlider from "@/components/swiper/OfertasSlider";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="flex flex-col gap-x-2 gap-y-4 sm:gap-y-6 bg-zinc-50 pb-6">
      <Slider />
      <span className="text-2xl font-semibold mx-4 px-1 text-gray-700 border border-x-0 border-gray-300 shadow-sm rounded-md">
        Ofertas de la semana
      </span>
      <OfertasSlider />
      <Suspense fallback={<div>Loading search...</div>}>
        <ProductList />
      </Suspense>
    </div>
  );
}
