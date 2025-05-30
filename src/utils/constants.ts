export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export const API = {
  LOGIN: `${API_URL}/auth/login`,
  PRODUCTS: `${API_URL}/products`,
};
