"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import ProtectedRoute from "../components/ProtectedRoute";

export default function CartPage() {
  const { cart, removeFromCart, totalPrice, totalItems } = useCart();

  return (
    <ProtectedRoute>
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-extrabold mb-6">Your Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
            <div className="text-5xl mb-4">🛒</div>
            <h2 className="text-xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-slate-600 mb-6">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link
              href="/products"
              className="inline-block bg-indigo-600 text-white px-6 py-2
                         rounded-lg hover:bg-indigo-700 transition font-semibold"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* DAFTAR ITEM */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl border border-slate-200 p-5
                             flex items-center justify-between gap-4"
                >
                  <div>
                    <h3 className="font-bold text-slate-900">{item.name}</h3>
                    <p className="text-sm text-slate-600">
                      Rp{item.price.toLocaleString("id-ID")} x {item.quantity}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <p className="font-bold text-indigo-600 hidden sm:block">
                      Rp{(item.price * item.quantity).toLocaleString("id-ID")}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 text-sm font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* RINGKASAN */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl border border-slate-200 p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-4 border-b pb-4">Order Summary</h2>
                
                <div className="flex justify-between mb-2 text-slate-600">
                  <span>Total Items</span>
                  <span>{totalItems}</span>
                </div>
                
                <div className="flex justify-between mb-6 font-bold text-lg text-slate-900">
                  <span>Total Price</span>
                  <span className="text-indigo-600">
                    Rp{totalPrice.toLocaleString("id-ID")}
                  </span>
                </div>

                <Link
                  href="/checkout"
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg
                             hover:bg-indigo-700 transition font-bold"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </ProtectedRoute>
  );
}