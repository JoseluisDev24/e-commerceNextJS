"use client";

import { useFavorites } from "@/hooks";
import { useShoppingCart } from "@/hooks";
import ProductCard from "@/components/products/ProductCard";
import Link from "next/link";
import { useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import IconButton from "@mui/material/IconButton";
import { Product } from "@/context/ShoppingCartContext";

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const { addProduct } = useShoppingCart();
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleAddToCart = (product: Product) => {
    addProduct(product);
    setToastMessage(`${product.name} agregado al carrito`);
    setToastOpen(true);
  };

  const hasFavorites = favorites.length > 0;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Tus productos favoritos</h1>

      {!hasFavorites ? (
        <p className="text-gray-600 mb-4">
          Aún no tenés productos en favoritos.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6">
          {favorites.map((product) => (
            <div key={product.id} style={{ position: "relative" }}>
              <ProductCard product={product} />
              <IconButton
                onClick={() => handleAddToCart(product)}
                sx={{
                  position: "absolute",
                  bottom: { xs: "1px", sm: "3px" },
                  right: { xs: "35px", sm: "38px" },
                  backgroundColor: "transparent",
                  boxShadow: "none",
                }}
              >
                <AddShoppingCartIcon />
              </IconButton>
            </div>
          ))}
        </div>
      )}

      <Link href="/checkout">
        <button
          disabled={!hasFavorites}
          className={`w-full px-6 py-3 mt-10 rounded text-white font-medium cursor-pointer transition-colors duration-200 ${
            hasFavorites
              ? "bg-green-800 hover:bg-green-700"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Comprar ahora
        </button>
      </Link>
      <Link
        href="/"
        className="mt-3 block text-center text-sm text-indigo-600 hover:underline"
      >
        Volver a la tienda
      </Link>

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
  );
}
