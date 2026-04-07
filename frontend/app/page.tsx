// app/page.tsx
// Dashboard - Client-side only untuk Vercel deployment

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface DashboardStats {
  products: number;
  orders: number;
  customers: number;
  apiStatus: 'online' | 'offline';
  version: string;
}

const modules = [
  { title: 'Products', description: 'Manage products', href: '/products', icon: '📦', color: 'bg-blue-50 hover:bg-blue-100' },
  { title: 'Inventory', description: 'Track stock levels', href: '/inventory', icon: '📊', color: 'bg-green-50 hover:bg-green-100' },
  { title: 'Sales Orders', description: 'Manage sales', href: '/sales', icon: '🛒', color: 'bg-purple-50 hover:bg-purple-100' },
  { title: 'Purchase Orders', description: 'Manage purchases', href: '/purchase', icon: '📝', color: 'bg-orange-50 hover:bg-orange-100' },
  { title: 'Customers', description: 'Customer management', href: '/customers', icon: '👥', color: 'bg-pink-50 hover:bg-pink-100' },
  { title: 'Suppliers', description: 'Supplier management', href: '/suppliers', icon: '🏢', color: 'bg-gray-50 hover:bg-gray-100' },
];

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState<DashboardStats>({
    products: 0,
    orders: 0,
    customers: 0,
    apiStatus: 'offline',
    version: '-',
  });

  useEffect(() => {
    setMounted(true);
    
    // Only run on client
    if (typeof window === 'undefined') return;

    const loadStats = async () => {
      try {
        // Check API health
        const healthRes = await fetch('http://localhost:8080/health');
        const health = await healthRes.json();
        
        // Get product count  
        const productsRes = await fetch('http://localhost:8080/api/v1/products?page=1&page_size=1');
        const products = await productsRes.json();
        
        setStats({
          products: products.meta?.total || 0,
          orders: 0,
          customers: 0,
          apiStatus: health.status === 'ok' ? 'online' : 'offline',
          version: health.version || '-',
        });
      } catch {
        setStats(s => ({ ...s, apiStatus: 'offline' }));
      }
    };

    loadStats();
    const interval = setInterval(loadStats, 30000);
    return () => clearInterval(interval);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-2">WMS Platform</h1>
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">WMS Platform</h1>
        <p className="text-gray-500 text-lg">Warehouse Management System</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 rounded-lg border bg-white">
          <div className="text-sm text-gray-500 mb-1">Total Products</div>
          <div className="text-2xl font-bold">{stats.products}</div>
        </div>
        <div className="p-4 rounded-lg border bg-white">
          <div className="text-sm text-gray-500 mb-1">Active Orders</div>
          <div className="text-2xl font-bold">{stats.orders}</div>
        </div>
        <div className="p-4 rounded-lg border bg-white">
          <div className="text-sm text-gray-500 mb-1">Customers</div>
          <div className="text-2xl font-bold">{stats.customers}</div>
        </div>
        <div className="p-4 rounded-lg border bg-white">
          <div className="text-sm text-gray-500 mb-1">API Status</div>
          <div className={`text-2xl font-bold ${
            stats.apiStatus === 'online' ? 'text-green-600' : 'text-red-600'
          }`}>
            {stats.apiStatus === 'online' ? '🟢 Online' : '🔴 Offline'}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {modules.map((module) => (
          <Link
            key={module.href}
            href={module.href}
            className={`block p-6 rounded-lg border transition-colors ${module.color}`}
          >
            <div className="text-3xl mb-3">{module.icon}</div>
            <h2 className="text-xl font-semibold mb-2">{module.title}</h2>
            <p className="text-gray-600 text-sm">{module.description}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 p-4 rounded-lg border bg-gray-50">
        <h2 className="font-semibold mb-2">API Status</h2>
        <p className="text-sm">Backend: http://localhost:8080 | Version: {stats.version}</p>
      </div>
    </div>
  );
}
