// lib/api.ts
// API client untuk WMS Platform

const API_BASE_URL = typeof window !== 'undefined' 
  ? (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1')
  : '';

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

interface ApiResponse {
  data?: Product[];
  meta?: {
    total?: number;
  };
}

// Product API
export const productApi = {
  getProducts: async (): Promise<{ products: Product[]; total: number }> => {
    if (!API_BASE_URL) return { products: [], total: 0 };
    
    const response = await fetch(`${API_BASE_URL}/products?page=1&page_size=10`);
    const result: ApiResponse = await response.json();
    return {
      products: result.data || [],
      total: result.meta?.total || 0,
    };
  },
};

export type { Product };
