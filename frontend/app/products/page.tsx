import Link from "next/link";

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <button className="px-4 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-800">
          + Add Product
        </button>
      </div>

      <div className="rounded-md border">
        <div className="p-4 border-b">
          <h2 className="font-semibold">Product List</h2>
          <p className="text-sm text-gray-500">
            Manage your products here
          </p>
          <div className="mt-4 flex gap-2">
            <input
              type="text"
              placeholder="Search products..."
              className="px-3 py-2 border rounded-md flex-1 max-w-sm"
            />
            <select className="px-3 py-2 border rounded-md">
              <option>All Categories</option>
            </select>
          </div>
        </div>

        <div className="p-8 text-center text-gray-500">
          <p className="text-lg mb-2">🛍️</p>
          <p>Products will be listed here</p>
          <p className="text-sm mt-2">
            Connect to backend API to load real data
          </p>
        </div>

        <div className="p-4 border-t flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing 0 products
          </p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded-md hover:bg-gray-100">
              Previous
            </button>
            <button className="px-3 py-1 border rounded-md hover:bg-gray-100">
              Next
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <Link href="/" className="text-blue-600 hover:underline">
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
