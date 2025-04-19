"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { Product } from "@/context/ShoppingCartContext";
import dataProductsJson from "@/data.json";
import Image from "next/image";
import Link from "next/link";
import { useShoppingCart } from "@/hooks";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IconButton from "@mui/material/IconButton";
import { useFavorites } from "@/context/FavoriteContext";

const dataProducts: Product[] = dataProductsJson as Product[];

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const product = dataProducts.find((p) => p.id === id);

  const { addProduct } = useShoppingCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-1/2">
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={400}
            className="rounded-lg bg-white p-4 max-w-[350px] mx-auto"
            priority
          />
        </div>

        <div className="w-full lg:w-1/3 flex flex-col gap-4 relative">
          <div className="flex gap-2">
              <h1 className="text-3xl font-bold">{product.name}</h1>
            <IconButton onClick={() => toggleFavorite(product)}>
              {isFavorite(product.id) ? (
                <FavoriteIcon className="text-red-500" />
              ) : (
                <FavoriteBorderIcon className="text-gray-500" />
              )}
            </IconButton>
          </div>
          <p className="text-gray-600">{product.description}</p>
          <div className="text-sm text-gray-500">ID: {product.id}</div>
        </div>

        <div className="w-full lg:w-1/3">
          <div className="border border-gray-300 rounded-lg shadow-md p-6 bg-white flex flex-col gap-4">
            <div>
              <h2 className="text-3xl font-bold text-green-700">
                $ {product.price}
              </h2>
              <p className="text-sm text-gray-600">
                en 12 cuotas de ${Math.round(product.price / 12)} sin interés
              </p>
            </div>

            <div className="text-sm text-gray-700">
              <p className="font-medium">Llega gratis mañana</p>
              <p className="text-gray-500">Envío rápido por tienda</p>
            </div>

            <div className="text-sm text-gray-700 border-t pt-4">
              <p className="font-medium">Devolución gratis</p>
              <p className="text-gray-500">Tenés 30 días para devolverlo</p>
            </div>

            <div className="text-sm flex gap-2 text-gray-700 border-t pt-4">
              <Image
                src="/garantia.png"
                alt="Compra segura"
                width={50}
                height={50}
              />
              <div>
                <p className="font-medium">Garantía</p>
                <p className="text-gray-500">Compra protegida y oficial</p>
              </div>
            </div>

            <button
              className="bg-indigo-600 text-white px-4 py-3 rounded hover:bg-indigo-700 cursor-pointer"
              onClick={() => addProduct(product)}
            >
              Agregar al carrito
            </button>

            <button className="bg-green-600 text-white px-4 py-3 rounded hover:bg-green-700 cursor-pointer">
              Comprar ahora
            </button>
          </div>

          <Link
            href="/"
            className="mt-4 block text-center text-sm text-indigo-600 hover:underline"
          >
            Volver a la tienda
          </Link>
        </div>
      </div>
    </div>
  );
}
