import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/api";

/* Metadata dinamis dari nama produk */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  try {
    const product = await getProduct(Number(id));
    return {
      title: `${product.name} | RevoShop`,
      description: `Buy ${product.name} at the best price.`,
    };
  } catch {
    return { title: "Product Not Found | RevoShop" };
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let product;
  try {
    product = await getProduct(Number(id));
  } catch {
    notFound();
  }

  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(product.price);

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <Link
        href="/products"
        className="text-sm text-indigo-600 hover:underline mb-6 inline-block"
      >
        ← Back to Products
      </Link>

      <div className="bg-white rounded-2xl border border-slate-200 p-8">
        <h1 className="text-3xl font-extrabold mb-4">{product.name}</h1>

        <p className="text-3xl text-indigo-600 font-extrabold mb-6">
          {formattedPrice}
        </p>

        <div className="space-y-2 text-sm text-slate-600 border-t pt-6">
          <p>
            <span className="font-semibold text-slate-900">Stock:</span>{" "}
            {product.stock} units
          </p>
          {/* <p>
            <span className="font-semibold text-slate-900">Category ID:</span>{" "}
            {product.category_id}
          </p>
          <p>
            <span className="font-semibold text-slate-900">Product ID:</span>{" "}
            {product.id}
          </p> */}
        </div>
      </div>
    </main>
  );
}