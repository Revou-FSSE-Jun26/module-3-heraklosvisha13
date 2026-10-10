"use client";

import { useState } from "react";
import Card from "./Card";
import type { Product } from "@/lib/types";
import Link from "next/link";

export interface ProductCardProps {
  product: Product;
  categoryName?: string;
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
  categoryName,
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
        <Link
          href={`/products/${product.id}`}
          className="text-base font-bold text-slate-900 leading-snug
                     hover:text-indigo-600 transition-colors"
        >
        {product.name}
        </Link>
        <span className="text-[0.7rem] font-medium text-slate-500 capitalize">
          {categoryName ?? `Cat #${product.category_id}`}
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

      <div className="flex flex-col gap-2">
        <Link
          href ={`/products/${product.id}`}
          className="w-full rounded-lg py-2 text-sm font-semibold
                     text-center border border-slate-300
                     text-slate-700 hover:bg-slate-50 hover:border-slate-400
                     transition"
        >
          View Details  
        </Link>

        <button
          onClick={handleAddToCart}
          disabled={!inStock}
          className={getButtonClasses(inStock)}
        >
          {inStock ? "Add to Cart" : "Stok Habis"}
        </button>
      </div>
    </Card>
  );
}