"use client";

import { useShoppingCart } from "@/hooks";
import ShoppingCart from "@/components/shoppingCart/ShoppingCart";
import Link from "next/link";

export default function CartPage() {
  const { products } = useShoppingCart();

  const isCartEmpty = products.length === 0;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Tu carrito de compras</h1>

      {isCartEmpty ? (
        <p className="text-gray-600">El carrito está vacío.</p>
      ) : (
        <ShoppingCart />
      )}

      <Link
        href={isCartEmpty ? "#" : "/checkout"}
        className={`block mt-4 text-center text-white px-4 py-3 rounded ${
          isCartEmpty
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-800 hover:bg-green-700"
        }`}
      >
        Comprar ahora
      </Link>
      <Link
                  href="/"
                  className="mt-3 block text-center text-sm text-indigo-600 hover:underline"
                >
                  Volver a la tienda
                </Link>
    </div>
  );
}
