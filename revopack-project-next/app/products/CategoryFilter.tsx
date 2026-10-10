"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { Category } from "@/lib/types";

interface CategoryFilterProps {
  categories: Category[];
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategoryId = searchParams.get("category_id") ?? "";

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams);

    if (e.target.value) {
      params.set("category_id", e.target.value);
    } else {
      params.delete("category_id");
    }

    router.push(`/products?${params.toString()}`);
  }

  return (
    <select
      value={currentCategoryId}
      onChange={handleChange}
      className="w-full rounded-xl border border-slate-300 bg-white
                 px-4 py-3 text-sm text-slate-900
                 focus:border-indigo-500 focus:outline-none
                 focus:ring-4 focus:ring-indigo-500/15 transition-shadow"
    >
      <option value="">All Categories</option>
      {categories.map((cat) => (
        <option key={cat.id} value={cat.id}>
          {cat.category_name}
        </option>
      ))}
    </select>
  );
}