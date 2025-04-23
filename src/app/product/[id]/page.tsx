"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import dataProductsJson from "@/data.json";
import { Product } from "@/context/ShoppingCartContext";
import ProductDetail from "@/components/products/ProductDetail";

const dataProducts: Product[] = dataProductsJson as Product[];

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const product = dataProducts.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />; 
}
