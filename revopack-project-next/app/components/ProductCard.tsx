"use client";

import { useState } from "react";
import Card from "./Card";

/* ============================================
   TYPES
   ============================================ */
export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
}

export interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product, qty: number) => void;
  showCounter?: boolean;
}

/* ============================================
   HELPER
   ============================================ */
export function getButtonClasses(inStock: boolean): string {
  const base = "w-full rounded-lg py-2 text-sm font-semibold transition";
  if (inStock) {
    return `${base} bg-indigo-600 text-white hover:bg-indigo-700 active:scale-[0.98]`;
  }
  return `${base} bg-slate-300 text-slate-500 cursor-not-allowed`;
}

/* ============================================
   COMPONENT
   ============================================ */
export default function ProductCard({
  product,
  onAddToCart,
  showCounter = true,
}: ProductCardProps) {
  const [qty, setQty] = useState(1);
  const inStock = product.stock > 0;

  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(product.price);

  function handleAddToCart() {
    if (!inStock || !onAddToCart) return;
    onAddToCart(product, qty);
  }

  return (
    <Card>
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="text-base font-bold text-slate-900 leading-snug">
          {product.name}
        </h3>
        <span className="text-[0.7rem] font-medium text-slate-500 capitalize">
          {product.category}
        </span>
      </div>

      <p className="text-xl font-extrabold text-indigo-600 mb-3">
        {formattedPrice}
      </p>

      {inStock ? (
        <span className="inline-block text-xs px-2 py-1 rounded-full
                         bg-green-100 text-green-700 font-semibold mb-4">
          Stok: {product.stock}
        </span>
      ) : (
        <span className="inline-block text-xs px-2 py-1 rounded-full
                         bg-red-100 text-red-700 font-semibold mb-4">
          Stok habis
        </span>
      )}

      {showCounter && inStock && (
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
            disabled={qty <= 1}
            className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200
                       disabled:opacity-50 disabled:cursor-not-allowed
                       font-bold transition"
          >
            −
          </button>
          <span className="font-bold w-8 text-center">{qty}</span>
          <button
            onClick={() => setQty(Math.min(product.stock, qty + 1))}
            disabled={qty >= product.stock}
            className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200
                       disabled:opacity-50 disabled:cursor-not-allowed
                       font-bold transition"
          >
            +
          </button>
        </div>
      )}

      <button
        onClick={handleAddToCart}
        disabled={!inStock}
        className={getButtonClasses(inStock)}
      >
        {inStock ? "Add to Cart" : "Stok Habis"}
      </button>
    </Card>
  );
}