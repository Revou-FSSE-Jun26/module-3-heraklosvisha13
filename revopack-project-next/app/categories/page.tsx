import Link from "next/link";
import { getCategories } from "@/lib/api";

export const metadata = {
  title: "Categories | RevoShop",
  description: "Browse products by category",
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold mb-2">Categories</h1>
      <p className="text-slate-600 mb-8">
        Browse our products by category.
      </p>

      {categories.length === 0 ? (
        <p className="text-slate-500">No categories yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category_id=${category.id}`}
              className="bg-white rounded-xl border border-slate-200 p-6
                         hover:shadow-md hover:border-indigo-300
                         transition text-center"
            >
              <span className="text-2xl mb-2 block">🛍️</span>
              <span className="font-semibold text-slate-900">
                {category.category_name}
              </span>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}