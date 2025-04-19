"use client";

import dataProductsJson from "@/data.json";
import ProductCard from "@/components/products/ProductCard";
import { Product } from "@/context/ShoppingCartContext";

const dataProducts: Product[] = dataProductsJson as Product[];

export default function ProductList() {
  return (
    <div className="w-full max-w-5xl px-4 mx-auto mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 sm:gap-4">
      {dataProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
