"use client";

import { useEffect, useState, useCallback } from "react";
import httpClient from "@/services/httpClient";
import { API } from "@/utils/constants";

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

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let url = API.PRODUCTS;
      const normalize = (text: string) =>
        text.normalize("NFD").replace(/\p{Diacritic}/gu, "");

      if (searchQuery) {
        url = `${url}?search=${encodeURIComponent(normalize(searchQuery))}`;
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
  }, [searchQuery]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    refetch: fetchProducts, 
  };
};
