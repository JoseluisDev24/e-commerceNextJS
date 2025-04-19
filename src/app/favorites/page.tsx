"use client";

import { useFavorites } from "@/context/FavoriteContext";
import ProductCard from "@/components/products/ProductCard";

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Tus productos favoritos</h1>

      {favorites.length === 0 ? (
        <p className="text-gray-600">Aún no tenés productos en favoritos.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {favorites.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
      <button className="bg-green-600 w-full mt-4 text-white px-4 py-3 rounded hover:bg-green-700 cursor-pointer">
        Comprar ahora
      </button>
    </div>
  );
}
