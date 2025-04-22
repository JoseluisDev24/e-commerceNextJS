"use client";

import { useContext } from "react";
import { ShoppingCartContext } from "@/context/ShoppingCartContext";
import { FavoritesContext } from "@/context/FavoritesContext";

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context)
    throw new Error("useFavorites debe usarse dentro de FavoritesProvider");
  return context;
};


