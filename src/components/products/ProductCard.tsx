"use client";

// import { useShoppingCart } from "@/hooks";
import { Product } from "@/context/ShoppingCartContext";
import Image from "next/image";
import clsx from "clsx";

interface Props {
  product: Product;
  compact?: boolean;
}

export default function ProductCard({ product, compact = false }: Props) {
//   const { products, addProduct } = useShoppingCart();

//   const cartProduct = products.find((p) => p.id === product.id);
//   const isOutOfStock =
//     cartProduct && cartProduct.quantity >= (product.quantity ?? 0);

  return (
    <div
      className={clsx(
        "relative rounded-lg border bg-gray-400/12 flex flex-col h-full",
        compact && "max-w-[140px]"
      )}
    >
      {product.enOferta && (
        <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded z-10">
          OFERTA
        </div>
      )}

      <Image
        src={product.image}
        alt={product.name}
        width={compact ? 60 : 100}
        height={compact ? 60 : 100}
        className={clsx(
          "w-full object-contain bg-white mx-auto",
          compact ? "h-28 p-2 rounded-2xl" : "h-40 rounded-lg"
        )}
        priority
      />

      <div
        className={clsx(
          "flex flex-col flex-grow gap-y-3 h-36 px-2 py-2",
          !compact && "px-4 py-4 gap-y-3 h-32"
        )}
      >
        <h1
          className={clsx(
            "font-medium",
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
        {compact && <span className="text-xs text-green-700">
          Comprá hasta en 12 cuotas sin interés con todas tus tarjetas
        </span>}
        
      </div>
    </div>
  );
}
