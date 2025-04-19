"use client";

import { Product } from "@/context/ShoppingCartContext";
import { useFavorites } from "@/context/FavoriteContext";
import Image from "next/image";
import clsx from "clsx";
import Link from "next/link";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

interface Props {
  product: Product;
  compact?: boolean;
}

export default function ProductCard({ product, compact = false }: Props) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(product.id);

  return (
    <div
      className={clsx(
        "relative rounded-lg border border-gray-400 shadow-lg bg-gray-400/5 flex flex-col h-full",
        compact && "max-w-[140px]"
      )}
    >
      {product.enOferta && (
        <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded z-10">
          OFERTA
        </div>
      )}

      <button
        onClick={() => toggleFavorite(product)}
        className="absolute bottom-2 right-2 z-10 p-1 rounded-full shadow"
        aria-label="Agregar a favoritos"
      >
        {favorite ? (
          <FavoriteIcon className="text-red-600 w-4 h-4"/>
        ) : (
          <FavoriteBorderIcon className="text-gray-500 w-4 h-4" />
        )}
      </button>

      <Link href={`/product/${product.id}`}>
        <Image
          src={product.image}
          alt={product.name}
          width={compact ? 60 : 100}
          height={compact ? 60 : 100}
          className={clsx(
            "w-full object-contain bg-white mx-auto",
            compact ? "h-28 p-2 rounded-2xl" : "h-32 rounded-lg"
          )}
          priority
        />

        <div
          className={clsx(
            "flex flex-col flex-grow gap-y-1 h-38 px-2 py-4",
            !compact && "px-4 py-4 gap-y-3 h-32"
          )}
        >
          <h1
            className={clsx(
              "font-medium cursor-pointer",
              compact ? "text-xs" : "text-sm sm:text-base",
              "line-clamp-1"
            )}
          >
            {product.name}
          </h1>

          {!compact && (
            <p className="text-xs line-clamp-3">{product.description}</p>
          )}

          <span className="font-medium text-sm">$ {product.price}</span>

          {compact && (
            <span className="text-xs pt-3 text-green-700">
              Comprá hasta en 12 cuotas sin interés con todas tus tarjetas
            </span>
          )}
        </div>
      </Link>
    </div>
  );
}
