"use client";

import { useState, useEffect } from "react";
import { getOrders } from "@/lib/api";
import type { Order } from "@/lib/types";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrders()
      .then(setOrders)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-slate-500">Loading orders...</p>;

  return (
    <div>
      <h1 className="text-3xl font-extrabold mb-6">All Orders</h1>
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
            <tr>
              <th className="px-6 py-3 font-semibold">Order ID</th>
              <th className="px-6 py-3 font-semibold">User ID</th>
              <th className="px-6 py-3 font-semibold">Items</th>
              <th className="px-6 py-3 font-semibold text-right">Total Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-medium text-slate-900 align-top">#{order.id}</td>
                <td className="px-6 py-4 text-slate-600 align-top">{order.user_id}</td>
                <td className="px-6 py-4 align-top">
                  {/* Render daftar item jika API menyediakannya */}
                  {order.items && order.items.length > 0 ? (
                    <ul className="list-disc pl-4 space-y-1 text-xs text-slate-600">
                      {order.items.map((item, idx) => (
                        <li key={idx}>
                          Product ID {item.product_id} (x{item.quantity})
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-slate-400 text-xs italic">No item details</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right font-bold text-indigo-600 align-top">
                  Rp{order.total_price.toLocaleString("id-ID")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && (
          <p className="p-6 text-center text-slate-500">No orders found.</p>
        )}
      </div>
    </div>
  );
}