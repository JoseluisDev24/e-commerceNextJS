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

// Producto que se envía desde el formulario para CREAR (sin id, ni fechas)
export type CreateProductInput = Omit<
  Product,
  "id" | "createdAt" | "updatedAt"
>;

// Producto para actualizar: puede ser igual al anterior, o incluir fechas
export type UpdateProductInput = Partial<Product>; // o ajustar según tus necesidades
