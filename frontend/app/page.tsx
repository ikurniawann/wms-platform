// app/page.tsx
// Dashboard with real API data

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { healthApi, productApi } from '@/lib/api';

interface DashboardStats {
  products: number;
  orders: number;
  customers: number;
  apiStatus: 'online' | 'offline';
  version: string;
}

export default function HomePage() {
  const [stats, setStats] = useState<DashboardStats>({
    products: 0,
    orders: 0,
    customers: 0,
    apiStatus: 'offline',
    version: '-',
  });
  const [loading, setLoading] = useState(true);

  const modules = [
    { title: 'Products', description: 'Manage products, variants, and categories', href: '/products', icon: '📦', color: 'bg-blue-50 hover:bg-blue-100' },
    { title: 'Inventory', description: 'Track stock levels and movements', href: '/inventory', icon: '📊', color: 'bg-green-50 hover:bg-green-100' },
    { title: 'Sales Orders', description: 'Create and manage sales orders', href: '/sales', icon: '🛒', color: 'bg-purple-50 hover:bg-purple-100' },
    { title: 'Purchase Orders', description: 'Manage supplier purchases', href: '/purchase', icon: '📝', color: 'bg-orange-50 hover:bg-orange-100' },
    { title: 'Customers', description: 'Customer management', href: '/customers', icon: '👥', color: 'bg-pink-50 hover:bg-pink-100' },
    { title: 'Suppliers', description: 'Supplier management', href: '/suppliers', icon: '🏢', color: 'bg-gray-50 hover:bg-gray-100' },
  ];

  useEffect(() => {
    const loadStats = async () => {
      try {
        // Check API health
        const health = await healthApi.check();
        
        // Get product count
        const products = await productApi.getProducts(1, 1);
        
        setStats({
          products: products.total,
          orders: 0, // TODO: Implement order count
          customers: 0, // TODO: Implement customer count
          apiStatus: 'online',
          version: health.version,
        });
      } catch {
        setStats(s => ({ ...s, apiStatus: 'offline' }));
      } finally {
        setLoading(false);
      }
    };

    loadStats();
    const interval = setInterval(loadStats, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">WMS Platform</h1>
        <p className="text-gray-500 text-lg">Warehouse Management System</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 rounded-lg border bg-white">
          <div className="text-sm text-gray-500 mb-1">Total Products</div>
          <div className="text-2xl font-bold">
            {loading ? '...' : stats.products}
          </div>
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

      {/* Module Cards */}
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

      {/* API Status Section */}
      <div className="mt-8 p-4 rounded-lg border bg-gray-50">
        <h2 className="font-semibold mb-2">API Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Backend: </span>
            <Link href="http://localhost:8080" className="text-blue-600 hover:underline">
              http://localhost:8080
            </Link>
          </div>
          <div>
            <span className="text-gray-500">Version: </span>
            <span className="font-mono">{stats.version}</span>
          </div>
          <div>
            <span className="text-gray-500">Health: </span>
            <Link href="http://localhost:8080/health" className="text-blue-600 hover:underline">
              /health
            </Link>
          </div>
          <div>
            <span className="text-gray-500">Auto-refresh: </span>
            <span>Every 30s</span>
          </div>
        </div>
      </div>
    </div>
  );
}
