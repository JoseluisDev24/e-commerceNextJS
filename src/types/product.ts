// Este representa el producto completo como lo recibe o envía el backend
export interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  quantity: number;
  offer: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type CreateProductInput = Omit<
  Product,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateProductInput = Partial<Product>; 
