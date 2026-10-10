"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("search") ?? "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const params = new URLSearchParams(searchParams);
    if (query.trim()) {
      params.set("search", query.trim());
    } else {
      params.delete("search");
    }

    router.push(`/products?${params.toString()}`);
  }

  function handleClear() {
    setQuery("");
    const params = new URLSearchParams(searchParams);
    params.delete("search");
    router.push(`/products?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      {/* INPUT dengan tombol clear */}
      <div className="relative flex-1">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full rounded-xl border border-slate-300 bg-white
                     px-4 py-3 pr-10 text-sm placeholder-slate-400
                     focus:border-indigo-500 focus:outline-none
                     focus:ring-4 focus:ring-indigo-500/15 transition-shadow"
        />

        {/* Tombol clear (X) — muncul kalau ada query */}
        {query && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2
                       w-6 h-6 rounded-full bg-slate-200 hover:bg-slate-300
                       flex items-center justify-center text-slate-600
                       text-xs font-bold transition"
          >
            ✕
          </button>
        )}
      </div>

      {/* TOMBOL SEARCH dengan icon */}
      <button
        type="submit"
        aria-label="Search"
        className="px-5 py-3 rounded-xl bg-indigo-600 text-white
                   hover:bg-indigo-700 active:scale-[0.98] transition
                   font-semibold text-sm flex items-center gap-2 shrink-0"
      >
        <span aria-hidden="true">🔍</span>
        <span className="hidden sm:inline">Search</span>
      </button>
    </form>
  );
}