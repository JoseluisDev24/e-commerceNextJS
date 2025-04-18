"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { Product } from "@/context/ShoppingCartContext";
import dataProductsJson from "@/data.json";
import Image from "next/image";
import Link from "next/link";
import { useShoppingCart } from "@/hooks";

const dataProducts: Product[] = dataProductsJson as Product[];

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const product = dataProducts.find((p) => p.id === id);

  const { addProduct } = useShoppingCart();

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={300}
          className="rounded-lg bg-white p-4"
        />

        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-gray-700">{product.description}</p>
          <p className="text-xl font-semibold text-green-700">
            $ {product.price}
          </p>

          <div className="flex gap-4 mt-4">
            <button
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              onClick={() => addProduct(product)}
            >
              Agregar al carrito
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Comprar
            </button>
            <Link
              href="/"
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Volver a la tienda
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
