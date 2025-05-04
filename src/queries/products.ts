"use client";

import { useEffect, useState } from "react";
import httpClient from "@/services/httpClient";
import { API} from "@/utils/constants";

export interface Product {
  _id: string;
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  quantity: number;
  offer: boolean;
  createdAt: string;
  updatedAt: string;
}

export const useProducts = (searchQuery: string = "") => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = API.PRODUCTS;
        if (searchQuery) {
          url = `${url}?search=${encodeURIComponent(searchQuery)}`;
        }

        const { data } = await httpClient.get<Product[]>(url);
        setProducts(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error al cargar los productos"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery]); 

  return { products, loading, error };
};
