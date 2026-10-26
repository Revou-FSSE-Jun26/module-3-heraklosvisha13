"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import ProtectedRoute from "../components/ProtectedRoute";
import toast from "react-hot-toast";

export default function CartPage() {
  const { cart, removeFromCart, totalPrice, totalItems } = useCart();

  // Fungsi hapus dengan notifikasi
  function handleRemove(productId: number) {
    removeFromCart(productId);
    toast.success("Removed from cart"); 
  }

  return (
    <ProtectedRoute>
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-extrabold mb-6">Your Cart</h1>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden mb-8">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
              <tr>
                <th className="px-6 py-4 font-semibold">Product</th>
                <th className="px-6 py-4 font-semibold text-center">Qty</th>
                <th className="px-6 py-4 font-semibold text-right">Subtotal</th>
                <th className="px-6 py-4 font-semibold text-right">Remove</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {cart.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                    Your cart is empty.
                  </td>
                </tr>
              ) : (
                cart.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-bold text-slate-900">{item.name}</td>
                    <td className="px-6 py-4 text-center">{item.quantity}</td>
                    <td className="px-6 py-4 text-right font-semibold text-indigo-600">
                      Rp{(item.price * item.quantity).toLocaleString("id-ID")}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleRemove(item.id)} // ← Panggil handleRemove
                        className="text-red-500 hover:text-red-700 font-semibold"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <p className="text-slate-600 text-sm">Total Items: {totalItems}</p>
            <p className="text-2xl font-extrabold text-slate-900">
              Total Price: <span className="text-indigo-600">Rp{totalPrice.toLocaleString("id-ID")}</span>
            </p>
          </div>
          
          <div className="flex gap-4 w-full md:w-auto">
            <Link
              href="/products"
              className="px-6 py-3 rounded-lg font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition text-center w-full md:w-auto"
            >
              Continue Shopping
            </Link>
            
            <Link
              href="/checkout"
              className={`px-6 py-3 rounded-lg font-bold text-center w-full md:w-auto transition ${
                cart.length === 0
                  ? "bg-slate-300 text-slate-500 cursor-not-allowed pointer-events-none" // ← Styling jika disabled
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
              aria-disabled={cart.length === 0}
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>

      </main>
    </ProtectedRoute>
  );
}