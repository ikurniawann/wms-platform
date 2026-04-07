// app/page.tsx
// Simple Dashboard tanpa API calls

import Link from 'next/link';

const modules = [
  { title: 'Products', description: 'Manage products', href: '/products', icon: '📦' },
  { title: 'Inventory', description: 'Track stock levels', href: '/inventory', icon: '📊' },
  { title: 'Sales Orders', description: 'Manage sales', href: '/sales', icon: '🛒' },
  { title: 'Purchase Orders', description: 'Manage purchases', href: '/purchase', icon: '📝' },
  { title: 'Customers', description: 'Customer management', href: '/customers', icon: '👥' },
  { title: 'Suppliers', description: 'Supplier management', href: '/suppliers', icon: '🏢' },
];

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">WMS Platform</h1>
        <p className="text-gray-500 text-lg">Warehouse Management System</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {modules.map((module) => (
          <Link
            key={module.href}
            href={module.href}
            className="block p-6 rounded-lg border bg-white hover:bg-gray-50 transition-colors"
          >
            <div className="text-3xl mb-3">{module.icon}</div>
            <h2 className="text-xl font-semibold mb-2">{module.title}</h2>
            <p className="text-gray-600 text-sm">{module.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
