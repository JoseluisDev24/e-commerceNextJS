"use client";

// import { useShoppingCart } from "../hooks";
// import { useCallback } from "react";
import { Product } from "../../context/ShoppingCartContext";
import dataProductsJson from "@/data.json";
import ProductCard from "@/components/products/ProductCard";
const dataProducts: Product[] = dataProductsJson as Product[];

export default function ProductList() {
  // const { products } = useShoppingCart();

  // const checkAvailableToAddCart = useCallback(
  //   (productId: string): boolean => {
  //     const cartProduct = products.find((p) => p.id === productId);
  //     const productData = dataProducts.find((p) => p.id === productId);

  //     return cartProduct
  //       ? cartProduct.quantity >= (productData?.quantity ?? 0)
  //       : false;
  //   },
  //   [products]
  // );

  return (
    <div className="w-full max-w-5xl px-4 mx-auto mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 sm:gap-4">
      {dataProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
