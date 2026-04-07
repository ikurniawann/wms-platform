// lib/api.ts
// API client configuration

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  meta?: {
    page?: number;
    page_size?: number;
    total?: number;
    total_pages?: number;
  };
}

export async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
}

// Products API
export const productsApi = {
  list: (page = 1, pageSize = 20) =>
    fetchApi(`/api/v1/products?page=${page}&page_size=${pageSize}`),
  
  get: (id: string) =>
    fetchApi(`/api/v1/products/${id}`),
  
  create: (data: unknown) =>
    fetchApi("/api/v1/products", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  
  update: (id: string, data: unknown) =>
    fetchApi(`/api/v1/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  
  delete: (id: string) =>
    fetchApi(`/api/v1/products/${id}`, {
      method: "DELETE",
    }),
};
