// lib/api.ts
// API client untuk WMS Platform

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 
  (typeof window !== 'undefined' 
    ? 'http://localhost:8080/api/v1'  // Browser (client-side)
    : 'http://backend:8080/api/v1'    // Server (Docker internal)
  );

interface ApiResponse<T> {
  data: T;
  message?: string;
}

interface Product {
  id: string;
  sku: string;
  name: string;
  description: string;
  category: string;
  price: number;
  cost: number;
  unit: string;
  barcode: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface ProductListResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
}

interface CreateProductRequest {
  sku: string;
  name: string;
  description: string;
  category: string;
  price: number;
  cost: number;
  unit: string;
  barcode: string;
}

// Helper untuk handle response
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }
  return response.json();
}

// Product API
export const productApi = {
  // Get all products
  getProducts: async (page = 1, limit = 10): Promise<{ products: Product[]; total: number; meta: any }> => {
    const response = await fetch(`${API_BASE_URL}/products?page=${page}&page_size=${limit}`);
    const result = await handleResponse(response);
    return {
      products: result.data || [],
      total: result.meta?.total || 0,
      meta: result.meta,
    };
  },

  // Get single product
  getProduct: async (id: string): Promise<Product> => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    return handleResponse(response);
  },

  // Create product
  createProduct: async (data: CreateProductRequest): Promise<Product> => {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  // Update product
  updateProduct: async (id: string, data: Partial<CreateProductRequest>): Promise<Product> => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  // Delete product
  deleteProduct: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  },

  // Search products
  searchProducts: async (query: string): Promise<ProductListResponse> => {
    const response = await fetch(`${API_BASE_URL}/products/search?q=${encodeURIComponent(query)}`);
    return handleResponse(response);
  },
};

// Health check
export const healthApi = {
  check: async (): Promise<{ status: string; version: string; modules: string[] }> => {
    const response = await fetch('http://localhost:8080/health');
    return handleResponse(response);
  },
};

export type { Product, ProductListResponse, CreateProductRequest };
