import Link from "next/link";
import { getProducts, getCategories } from "@/lib/api";
import ProductCard from "./components/ProductCard";

export const metadata = {
  title: "RevoShop — Quality Bags for Every Journey",
  description: "Browse our collection of quality bags.",
};

export default async function Home() {
  // Fetch products + categories sekaligus (parallel)
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  const featured = products.slice(0, 6);

  // Map category_id → category_name
  const categoryMap = new Map(
    categories.map((c) => [c.id, c.category_name])
  );

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero */}
      <section className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
          Welcome to RevoShop
        </h1>
        <p className="text-lg text-slate-600 mb-8">
          Quality bags for every journey. Browse our collection.
        </p>
        <Link
          href="/products"
          className="inline-block bg-indigo-600 text-white px-6 py-3
                     rounded-lg hover:bg-indigo-700 transition font-semibold"
        >
          Lihat Semua Produk
        </Link>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          {/* <Link
            href="/products"
            className="text-sm font-semibold text-indigo-600 hover:underline"
          >
            Lihat semua →
          </Link> */}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              categoryName={categoryMap.get(product.category_id)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}