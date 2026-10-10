import { getProducts, getCategories } from "@/lib/api";
import ProductList from "./ProductList";

export const metadata = {
  title: "Products | RevoShop",
  description: "Browse our collection of products",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; category_id?: string }>;
}) {
  const params = await searchParams;
  const search = params.search ?? "";
  const categoryId = params.category_id;

  const [products, categories] = await Promise.all([
    getProducts({
      search: search || undefined,
      category_id: categoryId ? Number(categoryId) : undefined,
    }),
    getCategories(),
  ]);

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold mb-6">Products</h1>
      <ProductList
        products={products}
        categories={categories}
        search={search}
      />
    </main>
  );
}