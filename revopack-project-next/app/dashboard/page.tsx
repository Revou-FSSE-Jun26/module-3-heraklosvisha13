"use client";

import { useState, useEffect } from "react";
import { getProducts, deleteProduct } from "@/lib/api";
import type { Product } from "@/lib/types";
import Modal from "../components/Modal";
import ProductForm from "../components/ProductForm";
import toast from "react-hot-toast";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // State untuk Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined);

  // State untuk Delete Confirmation
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  async function loadProducts() {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  function handleCreate() {
    setEditingProduct(undefined);
    setIsModalOpen(true);
  }

  function handleEdit(product: Product) {
    setEditingProduct(product);
    setIsModalOpen(true);
  }

  async function handleDelete(id: number) {
    try {
      await deleteProduct(id);
      toast.success("Product deleted successfully");
      setConfirmDeleteId(null); // Reset state konfirmasi
      loadProducts(); // Refresh tabel
    } catch (err: any) {
      // Menangkap error 400 (misal: produk sedang ada di order aktif)
      toast.error(err.message || "Failed to delete product");
      setConfirmDeleteId(null);
    }
  }

  if (loading) return <p className="text-slate-500">Loading products...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold">Products</h1>
        <button
          onClick={handleCreate}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700"
        >
          + Add Product
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
            <tr>
              <th className="px-6 py-3 font-semibold">Name</th>
              <th className="px-6 py-3 font-semibold">Category</th>
              <th className="px-6 py-3 font-semibold text-right">Price</th>
              <th className="px-6 py-3 font-semibold text-center">Stock</th>
              <th className="px-6 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-medium text-slate-900">{p.name}</td>
                <td className="px-6 py-4 text-slate-500">Cat #{p.category_id}</td>
                <td className="px-6 py-4 text-right">Rp{p.price.toLocaleString("id-ID")}</td>
                <td className="px-6 py-4 text-center">{p.stock}</td>
                <td className="px-6 py-4 text-right space-x-3">
                  {/* Logika Inline Confirmation untuk Delete */}
                  {confirmDeleteId === p.id ? (
                    <span className="text-xs">
                      Are you sure?{" "}
                      <button onClick={() => handleDelete(p.id)} className="text-red-600 font-bold hover:underline">Yes</button>{" "}
                      <button onClick={() => setConfirmDeleteId(null)} className="text-slate-500 hover:underline">No</button>
                    </span>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(p)} className="text-indigo-600 hover:underline font-semibold">Edit</button>
                      <button onClick={() => setConfirmDeleteId(p.id)} className="text-red-600 hover:underline font-semibold">Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL FORM (Create / Edit) */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProduct ? "Edit Product" : "Add New Product"}
      >
        <ProductForm
          initialData={editingProduct}
          onSuccess={() => {
            setIsModalOpen(false);
            loadProducts();
          }}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}