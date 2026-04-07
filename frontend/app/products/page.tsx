// app/products/page.tsx
// Products page with real API integration

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { productApi, Product } from '@/lib/api';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await productApi.getProducts(page, limit);
      setProducts(response.products);
      setTotal(response.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  // Search products
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchProducts();
      return;
    }
    try {
      setLoading(true);
      const response = await productApi.searchProducts(searchQuery);
      setProducts(response.products);
      setTotal(response.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  // Delete product
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      await productApi.deleteProduct(id);
      setProducts(products.filter(p => p.id !== id));
      setTotal(total - 1);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-800"
        >
          + Add Product
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          className="px-3 py-2 border rounded-md flex-1 max-w-md"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 border rounded-md hover:bg-gray-100"
        >
          Search
        </button>
        <button
          onClick={() => { setSearchQuery(''); fetchProducts(); }}
          className="px-4 py-2 border rounded-md hover:bg-gray-100"
        >
          Clear
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 rounded-md text-red-700">
          ❌ {error}
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading products...</div>
        </div>
      ) : (
        <>
          {/* Products Table */}
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">SKU</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Category</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold">Price</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">Status</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                      No products found
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium">{product.sku}</td>
                      <td className="px-4 py-3 text-sm">
                        <div className="font-medium">{product.name}</div>
                        <div className="text-gray-500 text-xs">{product.description}</div>
                      </td>
                      <td className="px-4 py-3 text-sm">{product.category}</td>
                      <td className="px-4 py-3 text-sm text-right">
                        ${product.price.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          product.is_active
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {product.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {products.length} of {total} products
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1 border rounded-md disabled:opacity-50 hover:bg-gray-100"
              >
                Previous
              </button>
              <span className="px-3 py-1">Page {page}</span>
              <button
                onClick={() => setPage(p => p + 1)}
                disabled={products.length < limit}
                className="px-3 py-1 border rounded-md disabled:opacity-50 hover:bg-gray-100"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}

      {/* Back Link */}
      <div className="mt-6">
        <Link href="/" className="text-blue-600 hover:underline">
          ← Back to Dashboard
        </Link>
      </div>

      {/* Add Product Modal (Simple Version) */}
      {showAddModal && (
        <AddProductModal
          onClose={() => setShowAddModal(false)}
          onSuccess={() => {
            setShowAddModal(false);
            fetchProducts();
          }}
        />
      )}
    </div>
  );
}

// Add Product Modal Component
function AddProductModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    description: '',
    category: '',
    price: '',
    cost: '',
    unit: 'pcs',
    barcode: '',
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      await productApi.createProduct({
        ...formData,
        price: parseFloat(formData.price),
        cost: parseFloat(formData.cost),
      });
      onSuccess();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to create product');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Add New Product</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">SKU *</label>
            <input
              required
              value={formData.sku}
              onChange={e => setFormData({ ...formData, sku: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Name *</label>
            <input
              required
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <input
              value={formData.category}
              onChange={e => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Price *</label>
              <input
                required
                type="number"
                step="0.01"
                value={formData.price}
                onChange={e => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Cost</label>
              <input
                type="number"
                step="0.01"
                value={formData.cost}
                onChange={e => setFormData({ ...formData, cost: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Unit</label>
            <select
              value={formData.unit}
              onChange={e => setFormData({ ...formData, unit: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="pcs">Pieces</option>
              <option value="kg">Kilograms</option>
              <option value="g">Grams</option>
              <option value="l">Liters</option>
              <option value="m">Meters</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
              rows={3}
            />
          </div>
          
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border rounded-md hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-4 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-800 disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
