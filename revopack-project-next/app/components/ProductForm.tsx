"use client";

import { useState, useEffect } from "react";
import { createProduct, updateProduct, getCategories } from "@/lib/api";
import type { Product, Category } from "@/lib/types";
import toast from "react-hot-toast";

interface ProductFormProps {
  initialData?: Product;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function ProductForm({ initialData, onSuccess, onCancel }: ProductFormProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [price, setPrice] = useState(initialData?.price || 0);
  const [stock, setStock] = useState(initialData?.stock || 0);
  const [categoryId, setCategoryId] = useState(initialData?.category_id || "");
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  // Ambil list kategori untuk dropdown
  useEffect(() => {
    getCategories().then(setCategories).catch(console.error);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || price <= 0 || stock < 0 || !categoryId) {
      toast.error("Please fill all fields correctly");
      return;
    }

    setLoading(true);
    const payload = {
      name,
      price: Number(price),
      stock: Number(stock),
      category_id: Number(categoryId),
    };

    try {
      if (initialData) {
        // Mode Edit
        await updateProduct(initialData.id, payload);
        toast.success("Product updated successfully!");
      } else {
        // Mode Create
        await createProduct(payload);
        toast.success("Product created successfully!");
      }
      onSuccess(); // Beritahu parent kalau sukses
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="block text-xs font-semibold mb-1">Product Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 text-sm"
        />
      </div>
      
      <div>
        <label className="block text-xs font-semibold mb-1">Category</label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 text-sm"
        >
          <option value="">Select category...</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.category_name}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold mb-1">Price (Rp)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1">Stock</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <button type="button" onClick={onCancel} className="px-4 py-2 text-sm font-semibold text-slate-600">
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold disabled:bg-slate-300"
        >
          {loading ? "Saving..." : "Save Product"}
        </button>
      </div>
    </form>
  );
}