"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import dataProductsJson from "@/data.json";
import ProductCard from "@/components/products/ProductCard";
import { Product } from "@/context/ShoppingCartContext";

const dataProducts: Product[] = dataProductsJson as Product[];

export default function ProductList() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(dataProducts);
  const productSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll automático cuando hay una búsqueda
    if (searchQuery && productSectionRef.current) {
      productSectionRef.current.scrollIntoView();
    }
  }, [searchQuery]);

  useEffect(() => {
    const normalizeString = (str: string) =>
      str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

    const normalizedQuery = normalizeString(searchQuery);
    const queryWords = normalizedQuery
      .split(" ")
      .filter((word) => word.trim() !== "");

    const filtered = dataProducts.filter((product) => {
      const normalizedProductName = normalizeString(product.name);
      return queryWords.every((word) => normalizedProductName.startsWith(word));
    });

    setFilteredProducts(filtered);
  }, [searchQuery]);

  return (
    <div ref={productSectionRef} className="w-full max-w-6xl px-4 mx-auto mt-6">
      {searchQuery && (
        <h1 className="text-xl font-semibold mb-4">
          Resultados para: <span className="text-blue-600">{searchQuery}</span>
        </h1>
      )}

      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-400">
          No se encontraron productos.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 sm:gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
