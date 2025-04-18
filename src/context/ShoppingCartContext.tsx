"use client";

import {
  createContext,
  useCallback,
  useMemo,
  useState,
  ReactNode,
} from "react";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  enOferta?: boolean;
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
  const [products, setProducts] = useState<Product[]>([]);

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
      if (existingProduct) {
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
    setProducts((prevProducts) =>
      prevProducts
        .map((p) =>
          p.id === productId ? { ...p, quantity: p.quantity - 1 } : p
        )
        .filter((p) => p.quantity > 0)
    );
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
