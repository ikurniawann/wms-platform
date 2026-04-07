// app/page.tsx
// Dashboard home page

import Link from "next/link";

export default function HomePage() {
  const modules = [
    {
      title: "Products",
      description: "Manage products, variants, and categories",
      href: "/products",
      icon: "📦",
    },
    {
      title: "Inventory",
      description: "Track stock levels and movements",
      href: "/inventory",
      icon: "📊",
    },
    {
      title: "Sales Orders",
      description: "Create and manage sales orders",
      href: "/sales",
      icon: "🛒",
    },
    {
      title: "Purchase Orders",
      description: "Manage supplier purchases",
      href: "/purchase",
      icon: "📝",
    },
    {
      title: "Customers",
      description: "Customer management",
      href: "/customers",
      icon: "👥",
    },
    {
      title: "Suppliers",
      description: "Supplier management",
      href: "/suppliers",
      icon: "🏢",
    },
  ];

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">
          WMS Platform
        </h1>
        <p className="text-muted-foreground text-lg">
          Warehouse Management System
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {modules.map((module) => (
          <Link
            key={module.href}
            href={module.href}
            className="block p-6 rounded-lg border bg-card hover:bg-accent transition-colors"
          >
            <div className="text-3xl mb-3">{module.icon}</div>
            <h2 className="text-xl font-semibold mb-2">
              {module.title}
            </h2>
            <p className="text-muted-foreground text-sm">
              {module.description}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-8 p-4 rounded-lg border bg-muted">
        <h2 className="font-semibold mb-2">API Status</h2>
        <p className="text-sm text-muted-foreground">
          Backend: http://localhost:8080
        </p>
        <p className="text-sm text-muted-foreground">
          Health: <Link href="http://localhost:8080/health" className="text-primary hover:underline">/health</Link>
        </p>
      </div>
    </main>
  );
}
