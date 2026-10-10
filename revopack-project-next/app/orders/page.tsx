import Link from "next/link";
import { getOrders } from "@/lib/api";
import type { Order } from "@/lib/types";

export const metadata = {
  title: "Orders | RevoShop",
  description: "Order history",
};

export default async function OrdersPage() {
  let orders: Order[] = [];
  let error: { status: number; message: string } | null = null;

  try {
    orders = await getOrders();
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    const statusMatch = message.match(/API error: (\d+)/);
    const status = statusMatch ? Number(statusMatch[1]) : 500;
    error = { status, message };
  }

  /* ---------- 401: Belum login ---------- */
  if (error?.status === 401) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-extrabold mb-6">Orders</h1>

        <div className="bg-white rounded-2xl border border-slate-200
                        p-12 text-center max-w-md mx-auto">
          <div className="text-5xl mb-4">🔒</div>
          <h2 className="text-xl font-bold mb-2">Login Required</h2>
          <p className="text-slate-600 mb-6">
            You need to login to view your orders.
          </p>
          <Link
            href="/login"
            className="inline-block bg-indigo-600 text-white px-6 py-2
                       rounded-lg hover:bg-indigo-700 transition font-semibold"
          >
            Login
          </Link>
        </div>
      </main>
    );
  }

  /* ---------- Error lain ---------- */
  if (error) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl font-extrabold mb-6">Orders</h1>
        <p className="text-red-600">Error: {error.message}</p>
      </main>
    );
  }

  /* ---------- Sukses ---------- */
  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold mb-2">Orders</h1>
      <p className="text-slate-600 mb-8">
        All orders from our customers.
      </p>

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
    </main>
  );
}