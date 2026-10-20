"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { createOrder } from "@/lib/api";
import ProtectedRoute from "../components/ProtectedRoute";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, totalPrice, totalItems, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleConfirmOrder() {
    if (cart.length === 0) return;

    setLoading(true);
    setError("");

    try {
      // Susun data untuk dikirim ke API
      const payload = {
        items: cart.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
        })),
      };

      // Kirim ke API
      await createOrder(payload);

      // Jika sukses: kosongkan keranjang & pindah ke halaman orders
      clearCart();
      router.push("/orders");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to place order");
    } finally {
      setLoading(false);
    }
  }

  // Jika keranjang kosong, jangan izinkan checkout
  if (cart.length === 0) {
    return (
      <ProtectedRoute>
        <main className="max-w-2xl mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-extrabold mb-4">Checkout</h1>
          <p className="text-slate-600 mb-6">Your cart is empty.</p>
          <Link href="/products" className="bg-indigo-600 text-white px-6 py-2 rounded-lg">
            Go Shopping
          </Link>
        </main>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-extrabold mb-8">Checkout</h1>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-center">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* RINGKASAN ITEM */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-xl font-bold mb-4 border-b pb-4">Order Summary</h2>
            <ul className="space-y-4 mb-4">
              {cart.map((item) => (
                <li key={item.id} className="flex justify-between text-sm">
                  <span className="text-slate-700">
                    {item.name} <span className="text-slate-400">x{item.quantity}</span>
                  </span>
                  <span className="font-semibold">
                    Rp{(item.price * item.quantity).toLocaleString("id-ID")}
                  </span>
                </li>
              ))}
            </ul>
            <div className="border-t pt-4 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-indigo-600">
                Rp{totalPrice.toLocaleString("id-ID")}
              </span>
            </div>
          </div>

          {/* KONFIRMASI */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-center items-center text-center">
            <div className="text-5xl mb-4">📦</div>
            <h2 className="text-xl font-bold mb-2">Ready to order?</h2>
            <p className="text-slate-600 mb-6">
              You are about to place an order for {totalItems} items.
            </p>
            <button
              onClick={handleConfirmOrder}
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg
                         hover:bg-indigo-700 transition font-bold
                         disabled:bg-slate-300 disabled:cursor-not-allowed"
            >
              {loading ? "Processing..." : "Confirm Order"}
            </button>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}