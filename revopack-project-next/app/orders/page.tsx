"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getOrders } from "@/lib/api";
import type { Order } from "@/lib/types";
import ProtectedRoute from "../components/ProtectedRoute";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadOrders() {
      try {
        setLoading(true);
        const data = await getOrders();
        setOrders(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load orders");
      } finally {
        setLoading(false);
      }
    }

    loadOrders();
  }, []);

  return (
    <ProtectedRoute>
      <main className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-extrabold mb-6">Orders</h1>

        {loading && (
          <p className="text-center py-12 text-slate-500">Loading orders...</p>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl text-center">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            {orders.length === 0 ? (
              <p className="text-slate-500">No orders yet.</p>
            ) : (
              <div className="space-y-3">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-xl border border-slate-200
                              p-5 flex flex-col sm:flex-row sm:items-center
                              sm:justify-between gap-3"
                  >
                    <div>
                      <p className="font-bold text-slate-900">
                        Order #{order.id}
                      </p>
                      <p className="text-sm text-slate-600">
                        User ID: {order.user_id}
                      </p>
                      {order.status && (
                        <span
                          className={`inline-block mt-1 text-xs px-2 py-1 rounded-full font-semibold ${
                            order.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : order.status === "completed"
                              ? "bg-green-100 text-green-700"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {order.status}
                        </span>
                      )}
                    </div>

                    <p className="text-xl font-extrabold text-indigo-600">
                      Rp{order.total_price.toLocaleString("id-ID")}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </ProtectedRoute>
  );
}