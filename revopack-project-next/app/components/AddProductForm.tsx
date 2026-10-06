"use client";

import { useState } from "react";
import { Product } from "./ProductCard";

/* TYPES */
export interface FormState {
    name: string;
    price: number;
    stock: number;
    category: string;
}

export interface FormErrors {
    name?: string;
    price?: string;
    stock?: string;
    category?: string;
}

/* VALIDATE - pure function */
export function validate(data:FormState): FormErrors {
    const errors: FormErrors = {};

    if (!data.name.trim()) {
        errors.name = "Name is required";
    } else if (data.name.trim().length < 2) {
        errors.name = "Name must be at least 2 characters";
    }

    if (isNaN(data.price) || data.price <= 0) {
        errors.price = "Price must be a valid positive number";
    }

    if (isNaN(data.stock) || data.stock < 0) {
        errors.stock = "Stock must be a valid non-negative number";
    }

    if (!data.category) {
        errors.category = "Please select a category";
    }

    return errors;
}

/* PROPS */
interface AddProductFormProps {
    onAdd: (product: Omit<Product, "id">) => void;
}

const CATEGORIES = ["Backpack", "Pouch", "Totebag", "Crossbody"];

/* COMPONENT */
export default function AddProductForm({ onAdd }: AddProductFormProps) {
    const [form, setForm] = useState<FormState>({
        name: "",
        price: 0,
        stock: 0,
        category: "",
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [submitted, setSubmitted] = useState(false);

    function handleChange(field: keyof FormState, value: string | number) {
        let finalValue: string | number = value;

        if (field === "price" || field === "stock") {
            const num = Number(value);
            if (isNaN(num)) {
                finalValue = 0;
            } else {
                finalValue = num;
            }
        }

        const updated = { ...form, [field]: finalValue};
        setForm(updated);
        if (submitted) setErrors(validate(updated));
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSubmitted(true);

        const validationErrors = validate(form);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) return;

        onAdd({
            name: form.name,
            price: form.price,
            stock: form.stock,
            category: form.category,
        });

        setForm({ name: "", price: 0, stock: 0, category: ""});
        setErrors({});
        setSubmitted(false);
    }

    return (
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">
            
            {/* NAME */}
            <div>
                <label className="block text-xs font-semibold mb-1">Name</label>
                <input 
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className={`w-full border rounded-lg px-3 py-2 text-sm 
                        ${errors.name ? "border-red-500" : "border-slate-300"
                }`}
                    placeholder="Enter product name"
                />
                {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
            </div>

            {/* PRICE */}
            <div>
                <label className="block text-xs font-semibold mb-1">Price</label>
                <input
                    type="number" 
                    value={form.price}
                    onChange={(e) => handleChange("price",Number(e.target.value))}
                    className={`w-full border rounded-lg px-3 py-2 text-sm 
                        ${errors.price ? "border-red-500" : "border-slate-300"
                }`}
                />
                {errors.price && (
                    <p className="text-red-500 text-xs mt-1">{errors.price}</p>
                )}
            </div>

            {/* STOCK */}
            <div>
                <label className="block text-xs font-semibold mb-1">Stock</label>
                <input
                    type="number" 
                    value={form.stock}
                    onChange={(e) => handleChange("stock",Number(e.target.value))}
                    className={`w-full border rounded-lg px-3 py-2 text-sm 
                        ${errors.stock ? "border-red-500" : "border-slate-300"
                }`}
                />
                {errors.stock && (
                    <p className="text-red-500 text-xs mt-1">{errors.stock}</p>
                )}
            </div>

             {/* CATEGORY */}
            <div>
                <label className="block text-xs font-semibold mb-1">Category</label>
                <select 
                    value={form.category}
                    onChange={(e) => handleChange("category", e.target.value)}
                    className={`w-full border rounded-lg px-3 py-2 text-sm 
                        ${errors.category ? "border-red-500" : "border-slate-300"
                    }`}
                >
                    <option value=""> Select category</option>
                    {CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                            {c}
                        </option>
                    ))}
                </select>
                {errors.category && (
                    <p className="text-red-500 text-xs mt-1">{errors.category}</p>
                )}
            </div>

            <button
                type="submit"
                className="bg-indigo-600 text-white py-2 rounded-lg
                    hover:bg-indigo-700 transition text-sm font-semibold"   
            >
                Add Product
            </button>
        </form>
    );
}