"use client";

import { useShoppingCart } from "../../hooks";
import DeleteIcon from "@mui/icons-material/Delete";
import EmptyShoppingCart from "./EmptyShoppingCart";
import Image from "next/image";
import Link from "next/link";

export default function ShoppingCart() {
  const {
    products,
    removeProduct,
    totalAmount,
    totalQuantity,
    clearShoppingCart,
  } = useShoppingCart();

  if (products.length === 0) return <EmptyShoppingCart />;

  return (
    <div className="bg-white p-4 rounded-lg shadow-2xl">
      <div className="grid py-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex gap-x-4 items-center hover:bg-gray-100 py-3 px-2 rounded-md"
          >
            <Link
              href={`/product/${product.id}`}
              className="flex items-center gap-4 flex-grow"
            >
              <Image
                src={product.image}
                alt={product.name}
                width={40}
                height={40}
                className="rounded object-cover"
                priority
              />
              <h5 className="text-sm sm:text-base font-medium whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px] md:max-w-[250px]">
                {product.name}
              </h5>
            </Link>

            <span className="text-sm sm:text-base font-semibold whitespace-nowrap">
              {product.quantity} x ${product.price}
            </span>

            <button
              className=" bg-red-600 hover:bg-red-800 text-white w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
              onClick={() => removeProduct(product.id)}
            >
              <DeleteIcon fontSize="small" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-between pt-2 border-t border-gray-300 mt-4 px-4 pb-4">
        <span className="font-medium md:text-xl">Total de productos:</span>
        <span className="font-medium md:text-xl">{totalQuantity}</span>
      </div>

      <div className="flex justify-between pt-2 px-4 border-t border-gray-300">
        <span className="font-medium text-xl">Total:</span>
        <span className="font-medium text-xl">$ {totalAmount}</span>
      </div>

      <button
        className="w-full bg-gray-800 text-white px-4 py-3 mt-4 rounded hover:bg-gray-700 cursor-pointer"
        onClick={clearShoppingCart}
      >
        Vaciar carrito
      </button>
    </div>
  );
}
