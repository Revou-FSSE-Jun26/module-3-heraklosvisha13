/* =========================================================
   RevoPack — Typed Interactive Product Catalog
   Matches layout: sidebar + product grid (2-column)
   ========================================================= */

/* ---------------------------------------------------------
   1. TYPES
   --------------------------------------------------------- */

type Category = "backpack" | "pouch" | "totebag" | "crossbody";
type IDR = number;
type StockStatus = "available" | "low" | "out";

interface Product {
  id: number;
  name: string;
  price: IDR;
  category: Category;
  stock: number;
  rating: number;
}

interface CartItem extends Product {
  qty: number;
}

/* ---------------------------------------------------------
   2. DATA
   --------------------------------------------------------- */
const products: Product[] = [
  { id: 1, name: "Urban Backpack",     price: 350000, category: "backpack",  stock: 12, rating: 4.8 },
  { id: 2, name: "Mini Pouch",         price: 85000,  category: "pouch",     stock: 30, rating: 4.5 },
  { id: 3, name: "Canvas Totebag",     price: 130000, category: "totebag",   stock: 0,  rating: 4.2 },
  { id: 4, name: "Leather Cross Body", price: 420000, category: "crossbody", stock: 5,  rating: 4.9 },
  { id: 5, name: "Travel Backpack",    price: 550000, category: "backpack",  stock: 3,  rating: 4.7 },
  { id: 6, name: "Everyday Totebag",   price: 145000, category: "totebag",   stock: 18, rating: 4.4 },
];

/* ---------------------------------------------------------
   3. STATE
   --------------------------------------------------------- */
let query = "";
const cart: CartItem[] = [];

/* ---------------------------------------------------------
   4. DOM
   --------------------------------------------------------- */
const grid = document.getElementById("product-grid") as HTMLElement;
const searchInput = document.getElementById("search") as HTMLInputElement;
const cartBadge = document.getElementById("cart-badge") as HTMLElement;
const resultCount = document.getElementById("result-count") as HTMLElement;
const emptyState = document.getElementById("empty-state") as HTMLElement;

/* ---------------------------------------------------------
   5. HELPERS
   --------------------------------------------------------- */
function formatIDR(value: IDR): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function getStockStatus(stock: number): StockStatus {
  if (stock === 0) return "out";
  if (stock <= 5) return "low";
  return "available";
}

function getStockBadgeClasses(status: StockStatus): string {
  switch (status) {
    case "available":
      return "bg-green-100 text-green-700";
    case "low":
      return "bg-yellow-100 text-yellow-800";
    case "out":
      return "bg-red-100 text-red-700";
  }
}

function getStockLabel(status: StockStatus, stock: number): string {
  if (status === "out") return "Out of stock";
  if (status === "low") return `Only ${stock} left`;
  return `In stock: ${stock}`;
}

function getCartCount(): number {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

/* ---------------------------------------------------------
   6. RENDER
   --------------------------------------------------------- */
function renderProducts(): void {
  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase())
  );

  resultCount.textContent = `Showing ${filtered.length} of ${products.length} products`;

  if (filtered.length === 0) {
    grid.innerHTML = "";
    emptyState.classList.remove("hidden");
    return;
  }
  emptyState.classList.add("hidden");

  grid.innerHTML = filtered
    .map((product) => {
      const status = getStockStatus(product.stock);
      const badgeClasses = getStockBadgeClasses(status);
      const stockLabel = getStockLabel(status, product.stock);
      const isOut = status === "out";

      return `
        <article
          class="bg-white rounded-2xl border border-slate-200
                 shadow-[0_2px_10px_rgba(15,23,42,0.04)]
                 p-5 flex flex-col gap-3
                 hover:shadow-[0_6px_20px_rgba(15,23,42,0.08)]
                 transition-shadow"
          data-testid="product-card"
        >
          <div class="flex items-start justify-between gap-2">
            <h2 class="text-base font-bold text-slate-900 leading-snug">
              ${product.name}
            </h2>
            <span class="text-[0.7rem] font-medium text-slate-500
                         capitalize tracking-wide">
              ${product.category}
            </span>
          </div>

          <p class="text-xl font-extrabold text-brand-600">
            ${formatIDR(product.price)}
          </p>

          <div class="flex items-center justify-between">
            <span class="inline-block text-xs px-2.5 py-1 rounded-full
                         font-semibold ${badgeClasses}">
              ${stockLabel}
            </span>
            <span class="text-xs text-slate-500 font-medium">
              ★ ${product.rating.toFixed(1)}
            </span>
          </div>

          <button
            class="mt-auto w-full rounded-xl py-2.5 text-sm font-semibold
                   text-white transition
                   ${
                     isOut
                       ? "bg-slate-300 cursor-not-allowed"
                       : "bg-brand-600 hover:bg-brand-700 active:scale-[0.98]"
                   }"
            data-id="${product.id}"
            data-testid="add-to-cart"
            ${isOut ? "disabled" : ""}
          >
            ${isOut ? "Out of Stock" : "Add to Cart"}
          </button>
        </article>
      `;
    })
    .join("");

  grid.querySelectorAll<HTMLButtonElement>("button[data-id]").forEach((btn) => {
    btn.addEventListener("click", () => {
      addToCart(Number(btn.dataset.id));
    });
  });
}

/* ---------------------------------------------------------
   7. CART (immutable update)
   --------------------------------------------------------- */
function addToCart(id: number): void {
  const product = products.find((p) => p.id === id);
  if (!product || product.stock === 0) return;

  const existingIndex = cart.findIndex((item) => item.id === id);

  if (existingIndex >= 0) {
    cart[existingIndex] = {
      ...cart[existingIndex],
      qty: cart[existingIndex].qty + 1,
    };
  } else {
    cart.push({ ...product, qty: 1 });
  }

  updateCartBadge();
}

function updateCartBadge(): void {
  cartBadge.textContent = String(getCartCount());
}

/* ---------------------------------------------------------
   8. INIT
   --------------------------------------------------------- */
searchInput.addEventListener("input", () => {
  query = searchInput.value;
  renderProducts();
});

renderProducts();
updateCartBadge();