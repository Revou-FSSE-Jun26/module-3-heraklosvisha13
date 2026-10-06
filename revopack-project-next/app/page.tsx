"use client";

import { useState } from "react";
import ProductCard, { Product } from "./components/ProductCard";
import SearchBar from "./components/SearchBar";
import AddProductForm from "./components/AddProductForm";

const INITIAL_PRODUCTS: Product[] = [
  { id: 1, name: "Urban Backpack",     price: 350000, stock: 12, category: "backpack" },
  { id: 2, name: "Mini Pouch",         price: 85000,  stock: 30, category: "pouch" },
  { id: 3, name: "Canvas Totebag",     price: 130000, stock: 0,  category: "totebag" },
  { id: 4, name: "Leather Cross Body", price: 420000, stock: 5,  category: "crossbody" },
  { id: 5, name: "Travel Backpack",    price: 550000, stock: 3,  category: "backpack" },
  { id: 6, name: "Everyday Totebag",   price: 145000, stock: 18, category: "totebag" },
];

export default function Home() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [query, setQuery] = useState("");

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  function handleAddProduct(data: Omit<Product, "id">) {
    const newProduct: Product = { id: Date.now(), ...data };
    setProducts([...products, newProduct]);
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold mb-6">Products</h1>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        {/* KIRI: Search + Produk */}
        <div>
          <div className="mb-6">
            <SearchBar value={query} onChange={setQuery} />
          </div>

          <p className="text-sm text-slate-500 mb-4">
            Showing {filtered.length} of {products.length} products
          </p>

          {filtered.length === 0 ? (
            <p className="text-center text-slate-500 py-12">
              No products match "{query}"
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>

        {/* KANAN: Form */}
        <aside>
          <div className="bg-white rounded-xl border border-slate-200 p-5
                          sticky top-24">
            <h2 className="text-lg font-bold mb-4">Add Product</h2>
            <AddProductForm onAdd={handleAddProduct} />
          </div>
        </aside>
      </div>
    </main>
  );
}