"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/products/ProductCard";
import { useProducts } from "@/queries/products"; // Importamos el hook

export default function ProductList() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || ""; // Obtenemos el término de búsqueda de la URL
  const { products, loading, error } = useProducts(searchQuery); // Usamos el hook con el término de búsqueda
  const productSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchQuery && productSectionRef.current) {
      productSectionRef.current.scrollIntoView();
    }
  }, [searchQuery]);

  if (loading) {
    return <p className="text-center">Cargando productos...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div ref={productSectionRef} className="w-full max-w-6xl px-4 mx-auto mt-6">
      {searchQuery && (
        <h1 className="text-xl font-semibold mb-4">
          Resultados para: <span className="text-blue-600">{searchQuery}</span>
        </h1>
      )}

      {products.length === 0 ? (
        <p className="text-center text-gray-400">
          No se encontraron productos.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 sm:gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
