"use client";

import { useState, useEffect } from "react";
import { getCategories, deleteCategory } from "@/lib/api";
import type { Category } from "@/lib/types";
import Modal from "../../components/Modal";
import CategoryForm from "../../components/CategoryForm";
import toast from "react-hot-toast";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | undefined>(undefined);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  async function loadCategories() {
    try {
      setLoading(true);
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCategories();
  }, []);

  async function handleDelete(id: number) {
    try {
      await deleteCategory(id);
      toast.success("Category deleted");
      setConfirmDeleteId(null);
      loadCategories();
    } catch (err: any) {
      // Handle error 400 jika kategori masih dipakai produk
      toast.error(err.message || "Failed to delete category");
      setConfirmDeleteId(null);
    }
  }

  if (loading) return <p className="text-slate-500">Loading categories...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold">Categories</h1>
        <button
          onClick={() => { setEditingCategory(undefined); setIsModalOpen(true); }}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700"
        >
          + Add Category
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
            <tr>
              <th className="px-6 py-3 font-semibold w-16">ID</th>
              <th className="px-6 py-3 font-semibold">Name</th>
              <th className="px-6 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {categories.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 text-slate-500">#{c.id}</td>
                <td className="px-6 py-4 font-medium text-slate-900">{c.category_name}</td>
                <td className="px-6 py-4 text-right space-x-3">
                  {confirmDeleteId === c.id ? (
                    <span className="text-xs">
                      Are you sure?{" "}
                      <button onClick={() => handleDelete(c.id)} className="text-red-600 font-bold hover:underline">Yes</button>{" "}
                      <button onClick={() => setConfirmDeleteId(null)} className="text-slate-500 hover:underline">No</button>
                    </span>
                  ) : (
                    <>
                      <button onClick={() => { setEditingCategory(c); setIsModalOpen(true); }} className="text-indigo-600 hover:underline font-semibold">Edit</button>
                      <button onClick={() => setConfirmDeleteId(c.id)} className="text-red-600 hover:underline font-semibold">Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCategory ? "Edit Category" : "Add New Category"}
      >
        <CategoryForm
          initialData={editingCategory}
          onSuccess={() => { setIsModalOpen(false); loadCategories(); }}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}