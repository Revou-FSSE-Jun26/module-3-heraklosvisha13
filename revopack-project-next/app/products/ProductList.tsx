"use client";

import type { Product, Category } from "@/lib/types";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "./CategoryFilter";

interface ProductListProps {
  products: Product[];
  categories: Category[];
  search?: string;
}

export default function ProductList({
  products,
  categories,
  search = "",
}: ProductListProps) {
  // Map category_id → category_name
  const categoryMap = new Map(
    categories.map((c) => [c.id, c.category_name])
  );

  return (
    <>
      {/* Search + Category Filter */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_240px] gap-3 mb-6">
        <SearchBar />
        <CategoryFilter categories={categories} />
      </div>

      {/* Counter */}
      <p className="text-sm text-slate-500 mb-4">
        Showing {products.length} products
        {search && ` for "${search}"`}
      </p>

      {/* Products */}
      {products.length === 0 ? (
        <p className="text-center py-12 text-slate-500">
          No products found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              categoryName={categoryMap.get(product.category_id)}
            />
          ))}
        </div>
      )}
    </>
  );
}