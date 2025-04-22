"use client";

import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  ReactNode,
} from "react";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  offer?: boolean;
}

interface ShoppingCartContextType {
  products: Product[];
  totalAmount: number;
  totalQuantity: number;
  addProduct: (product: Omit<Product, "quantity">) => void;
  removeProduct: (productId: string) => void;
  clearShoppingCart: () => void;
}

export const ShoppingCartContext = createContext<ShoppingCartContextType>({
  products: [],
  totalAmount: 0,
  totalQuantity: 0,
  addProduct: () => {},
  removeProduct: () => {},
  clearShoppingCart: () => {},
});

interface ShoppingCartProviderProps {
  children: ReactNode;
}

export const ShoppingCartProvider = ({
  children,
}: ShoppingCartProviderProps) => {
  const isClient = typeof window !== "undefined";

  const loadProductsFromLocalStorage = (): Product[] => {
    if (isClient) {
      const storedProducts = localStorage.getItem("shoppingCart");
      return storedProducts ? JSON.parse(storedProducts) : [];
    }
    return []; 
  };

  const [products, setProducts] = useState<Product[]>(
    loadProductsFromLocalStorage
  );

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("shoppingCart", JSON.stringify(products));
    }
  }, [products, isClient]);

  const totalAmount = useMemo(() => {
    return products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  }, [products]);

  const totalQuantity = useMemo(() => {
    return products.reduce((total, product) => total + product.quantity, 0);
  }, [products]);

  const addProduct = useCallback((product: Omit<Product, "quantity">) => {
    setProducts((prevProducts) => {
      const existingProduct = prevProducts.find((p) => p.id === product.id);
      if (existingProduct) {// Limite de cantidad
        if (existingProduct.quantity === 10) return prevProducts; 
        return prevProducts.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        return [...prevProducts, { ...product, quantity: 1 }];
      }
    });
  }, []);

  const removeProduct = useCallback((productId: string) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts
        .map((p) =>
          p.id === productId ? { ...p, quantity: p.quantity - 1 } : p
        )
        .filter((p) => p.quantity > 0); 

      return updatedProducts;
    });
  }, []);

  const clearShoppingCart = useCallback(() => setProducts([]), []);

  const value = useMemo(
    () => ({
      products,
      totalAmount,
      totalQuantity,
      addProduct,
      removeProduct,
      clearShoppingCart,
    }),
    [
      products,
      totalAmount,
      totalQuantity,
      addProduct,
      removeProduct,
      clearShoppingCart,
    ]
  );

  return (
    <ShoppingCartContext.Provider value={value}>
      {children}
    </ShoppingCartContext.Provider>
  );
};
