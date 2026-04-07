// lib/api.ts
// API client untuk WMS Platform - Client-side only

const getBaseUrl = () => {
  // Client-side: use env or default
  if (typeof window !== 'undefined') {
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';
  }
  // Server-side: return empty (will be handled by client)
  return '';
};

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
    const baseUrl = getBaseUrl();
    if (!baseUrl) return { products: [], total: 0, meta: {} };
    
    const response = await fetch(`${baseUrl}/products?page=${page}&page_size=${limit}`);
    const result = await handleResponse(response);
    return {
      products: result.data || [],
      total: result.meta?.total || 0,
      meta: result.meta,
    };
  },

  // Get single product
  getProduct: async (id: string): Promise<Product> => {
    const baseUrl = getBaseUrl();
    if (!baseUrl) throw new Error('API not available');
    
    const response = await fetch(`${baseUrl}/products/${id}`);
    return handleResponse(response);
  },

  // Create product
  createProduct: async (data: any): Promise<Product> => {
    const baseUrl = getBaseUrl();
    if (!baseUrl) throw new Error('API not available');
    
    const response = await fetch(`${baseUrl}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  // Update product
  updateProduct: async (id: string, data: any): Promise<Product> => {
    const baseUrl = getBaseUrl();
    if (!baseUrl) throw new Error('API not available');
    
    const response = await fetch(`${baseUrl}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  // Delete product
  deleteProduct: async (id: string): Promise<void> => {
    const baseUrl = getBaseUrl();
    if (!baseUrl) throw new Error('API not available');
    
    const response = await fetch(`${baseUrl}/products/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  },

  // Search products
  searchProducts: async (query: string): Promise<{ products: Product[]; total: number; meta: any }> => {
    const baseUrl = getBaseUrl();
    if (!baseUrl) return { products: [], total: 0, meta: {} };
    
    const response = await fetch(`${baseUrl}/products/search?q=${encodeURIComponent(query)}`);
    const result = await handleResponse(response);
    return {
      products: result.data || [],
      total: result.meta?.total || 0,
      meta: result.meta,
    };
  },
};

// Health check
export const healthApi = {
  check: async (): Promise<{ status: string; version: string; modules: string[] }> => {
    const baseUrl = getBaseUrl();
    if (!baseUrl) {
      return { status: 'offline', version: '-', modules: [] };
    }
    
    try {
      const response = await fetch('http://localhost:8080/health');
      return handleResponse(response);
    } catch {
      return { status: 'offline', version: '-', modules: [] };
    }
  },
};

export type { Product };
