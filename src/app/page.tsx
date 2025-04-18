import ProductList from "@/components/products/ProductList";
import Slider from "@/components/swiper/Slider";
import OfertasSlider from "@/components/swiper/OfertasSlider";

export default function Home() {
  return (
    <div className="flex flex-col gap-x-2 gap-y-4 sm:gap-y-6">
      <Slider />
      <span className="text-2xl font-semibold px-6 text-gray-900">
        Ofertas de la semana
      </span>
      <OfertasSlider />
      <ProductList />
    </div>
  );
}
