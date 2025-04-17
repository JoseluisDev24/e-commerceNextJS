"use client";

import { useShoppingCart } from "../hooks";
import { useCallback } from "react";
import { Product } from "../context/ShoppingCartContext";
import dataProductsJson from "@/data.json";
import Image from "next/image";

const dataProducts: Product[] = dataProductsJson as Product[];

export default function ProductList() {
  const { products, addProduct } = useShoppingCart();

  const checkAvailableToAddCart = useCallback(
    (productId: string): boolean => {
      const cartProduct = products.find((p) => p.id === productId);
      const productData = dataProducts.find((p) => p.id === productId);

      return cartProduct
        ? cartProduct.quantity >= (productData?.quantity ?? 0)
        : false;
    },
    [products]
  );

  return (
    <div className="w-full max-w-5xl px-4 mx-auto mt-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {dataProducts.map((product) => (
        <div
          key={product.id}
          className="rounded-lg border bg-gray-400/12 flex flex-col h-full"
        >
          <Image
            src={product.image}
            alt={product.name}
            width={80}
            height={80}
            className="w-full rounded-lg h-40 object-contain bg-white mx-auto"
            priority
          />
          <div className="flex flex-col flex-grow gap-y-3 px-4 py-4">
            <h1 className="font-medium">{product.name}</h1>
            <p className="text-xs line-clamp-3">{product.description}</p>
            <span className="font-medium">$ {product.price}</span>
            <button
              className="bg-indigo-600 hover:bg-indigo-800 text-slate-200 mt-auto font-medium border rounded-lg px-4 py-2 disabled:bg-gray-200 disabled:text-gray-400 disabled:hover:bg-gray-200"
              onClick={() => addProduct(product)}
              disabled={checkAvailableToAddCart(product.id)}
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
