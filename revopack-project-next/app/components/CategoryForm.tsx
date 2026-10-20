"use client";

import { useState } from "react";
import { createCategory, updateCategory } from "@/lib/api";
import type { Category } from "@/lib/types";
import toast from "react-hot-toast";

interface CategoryFormProps {
  initialData?: Category;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function CategoryForm({ initialData, onSuccess, onCancel }: CategoryFormProps) {
  const [name, setName] = useState(initialData?.category_name || "");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }

    setLoading(true);
    const payload = { category_name: name };

    try {
      if (initialData) {
        await updateCategory(initialData.id, payload);
        toast.success("Category updated!");
      } else {
        await createCategory(payload);
        toast.success("Category created!");
      }
      onSuccess();
    } catch (err: any) {
      toast.error(err.message || "Failed to save category");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="block text-xs font-semibold mb-1">Category Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 text-sm"
          placeholder="e.g. Backpack"
        />
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
          {loading ? "Saving..." : "Save Category"}
        </button>
      </div>
    </form>
  );
}