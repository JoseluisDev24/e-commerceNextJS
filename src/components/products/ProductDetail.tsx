"use client";

import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Snackbar, Alert } from "@mui/material";
import { Product } from "@/types/product";
import { useFavorites, useShoppingCart } from "@/hooks";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  product: Product;
};

export default function ProductDetail({ product }: Props) {
  const { addProduct, products } = useShoppingCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const router = useRouter();

  const handleAddToCart = (product: Product) => {
    addProduct(product);
    setToastMessage(`${product.name} agregado al carrito`);
    setToastOpen(true);
  };

  const handleBuyNow = () => {
    const isInCart = products.some((item) => item.id === product.id);
    if (!isInCart) {
      addProduct(product);
      setToastMessage(`${product.name} agregado al carrito`);
      setToastOpen(true);
    }
    router.push("/checkout");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-1/2">
          <img
            src={product.image}
            alt={product.name}
            width={400}
            height={400}
            className="rounded-lg p-4 max-w-[350px] mx-auto"
          />
        </div>

        <div className="w-full lg:w-1/3 flex flex-col gap-4 relative">
          <div className="flex gap-2">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <IconButton
              onClick={() => toggleFavorite(product)}
              sx={{ width: 40, height: 40 }}
              aria-label="Agregar a favoritos"
            >
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

            <div className="text-sm flex justify-center items-center gap-2 text-gray-700 border-t pt-4">
              <img
                src="/garantia.png"
                alt="Compra segura"
                className="w-8 h-8"
              />
              <div>
                <p className="font-medium">Garantía</p>
                <p className="text-gray-500">Compra protegida y oficial</p>
              </div>
            </div>

            <button
              className="bg-indigo-600 text-white px-4 py-3 rounded hover:bg-indigo-700 cursor-pointer"
              onClick={() => handleAddToCart(product)}
            >
              Agregar al carrito
            </button>

            <button
              className="bg-green-700 text-white w-full px-4 py-3 rounded hover:bg-green-800 cursor-pointer"
              onClick={handleBuyNow}
            >
              Comprar ahora
            </button>
          </div>

          <button
            onClick={() => router.push("/")}
            className="mt-1 block text-center text-sm text-indigo-600 hover:underline w-full"
          >
            Volver a la tienda
          </button>

          <Snackbar
            open={toastOpen}
            autoHideDuration={3000}
            onClose={() => setToastOpen(false)}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={() => setToastOpen(false)}
              severity="success"
              sx={{ width: "100%" }}
            >
              {toastMessage}
            </Alert>
          </Snackbar>
        </div>
      </div>
    </div>
  );
}
