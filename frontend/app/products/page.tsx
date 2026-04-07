// app/products/page.tsx
// Products page - static untuk Vercel

import Link from 'next/link';

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <button className="px-4 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-800">
          + Add Product
        </button>
      </div>

      <div className="border rounded-lg p-8 text-center text-gray-500">
        <p className="text-lg mb-2">📦</p>
        <p>Products will appear here</p>
        <p className="text-sm mt-2">Connect to backend API to load data</p>
      </div>

      <div className="mt-6">
        <Link href="/" className="text-blue-600 hover:underline">
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
