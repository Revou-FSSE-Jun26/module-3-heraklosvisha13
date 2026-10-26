"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import AdminRoute from "../components/AdminRoute";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const menu = [
    { href: "/dashboard", label: "📦 Products" },
    { href: "/dashboard/categories", label: "🏷️ Categories" },
    { href: "/dashboard/orders", label: "🧾 Orders" },
  ];

  return (
    <AdminRoute>
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        {/* SIDEBAR */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-white rounded-xl border border-slate-200 p-4 sticky top-24">
            <h2 className="text-lg font-bold text-slate-900 mb-4 px-2">Admin Panel</h2>
            <nav className="flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-visible">
              {menu.map((item) => {
                // Cek apakah menu aktif
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                      isActive
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* KONTEN */}
        <main className="flex-1 w-full overflow-hidden">
          {children}
        </main>
      </div>
    </AdminRoute>
  );
}