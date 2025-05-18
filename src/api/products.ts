import { API } from "@/utils/constants";
import httpClient from "../services/httpClient";
import {
  Product,
  CreateProductInput,
  UpdateProductInput,
} from "@/types/product";

interface GetProductsResponse {
  selfUrl: string;
  nextUrl: string | null;
  results: Product[];
  total: number;
}

export const getProducts = async (
  searchParams: { search?: string; skip?: number; limit?: number } = {},
  next?: string
): Promise<GetProductsResponse> => {
  if (next) {
    const response = await httpClient.get<GetProductsResponse>(next);
    return response.data;
  }

  const urlSearchParams = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      urlSearchParams.append(key, value.toString());
    }
  });

  const endpoint = new URL(API.PRODUCTS);
  endpoint.search = urlSearchParams.toString();

  const response = await httpClient.get<GetProductsResponse>(
    endpoint.toString()
  );
  return response.data;
};

export const createProduct = async (
  data: CreateProductInput
): Promise<Product> => {
  const response = await httpClient.post<Product>(API.PRODUCTS, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const getProductById = async (id: string): Promise<Product> => {
  const response = await httpClient.get<Product>(`${API.PRODUCTS}/${id}`);
  return response.data;
};

export const deleteProduct = async (id: string): Promise<void> => {
  await httpClient.delete(`${API.PRODUCTS}/${id}`);
};

export const updateProduct = async (
  id: string,
  data: UpdateProductInput
): Promise<Product> => {
  const response = await httpClient.put<Product>(
    `${API.PRODUCTS}/${id}`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
