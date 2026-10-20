import type {
  Product,
  Category,
  Order,
  User,
  ApiResponse,
} from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

function handleUnauthorized() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  }
}

/* =========================================================
   GENERIC FETCH HELPER
   
   Karena API bungkus response dalam { data, status },
   apiFetch perlu buka wrapper dan return `data` saja.
   ========================================================= */
export async function apiFetch<T>(path: string): Promise<T> {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined in .env.local");
  }

  const res = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    if (res.status === 401) handleUnauthorized();
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }

  const json: ApiResponse<T> = await res.json();

  // API bungkus response: { data, status }
  return json.data;
}

/* =========================================================
   PRODUCTS
   ========================================================= */
export async function getProducts(params?: {
  search?: string;
  category_id?: number;
}): Promise<Product[]> {
  const query = new URLSearchParams();

  if (params?.search) query.set("search", params.search);
  if (params?.category_id) query.set("category_id", String(params.category_id));

  const qs = query.toString();
  return apiFetch<Product[]>(qs ? `/products?${qs}` : "/products");
}

export async function getProduct(id: number): Promise<Product> {
  return apiFetch<Product>(`/products/${id}`);
}

/* =========================================================
   CATEGORIES
   ========================================================= */
export async function getCategories(): Promise<Category[]> {
  return apiFetch<Category[]>("/categories");
}

/* =========================================================
   ORDERS
   ========================================================= */
export async function getOrders(): Promise<Order[]> {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const res = await fetch(`${API_URL}/orders`, {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    if (res.status === 401) handleUnauthorized();
    throw new Error(`API error: ${res.status}`);
  }

  const json = await res.json();
  return json.data;
}

export async function getOrder(id: number): Promise<Order> {
  return apiFetch<Order>(`/orders/${id}`);
}

/* ========================================================
   LOGIN/AUTH
   ========================================================= */
export async function login(
  email: string,
  password: string
): Promise<{ token: string; user: User }> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type" : "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message ?? "Login failed");
  }

  return {
    token: json.data.token,
    user: json.data.user,
  };
}

export async function register (
  username: string,
  email: string,
  password: string
): Promise<User> {
  const res = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message ?? "Registration failed");
  }

  return json.data.user;
}

/* =========================================================
   CHECKOUT / CREATE ORDER
   ========================================================= */
export async function createOrder(payload: {
  items: { product_id: number; quantity: number }[];
}): Promise<Order> {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const res = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(payload),
  });

  const json = await res.json();

  if (!res.ok) {
    if (res.status === 401) handleUnauthorized();
    const errorMsg = json.message || json.error || json.errors || "Failed to create order";
    const displayMsg = typeof errorMsg === "string" ? errorMsg : JSON.stringify(errorMsg);
    throw new Error(displayMsg);
  }

  return json.data;
}

/* =========================================================
   ADMIN CRUD HELPER
   ========================================================= */
async function adminFetch<T>(
  path: string,
  method: "POST" | "PUT" | "DELETE",
  body?: any
): Promise<T> {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const json = await res.json();

  if (!res.ok) {
    if (res.status === 401) handleUnauthorized();
    const errorMsg = json.message || json.error || "Something went wrong";
    throw new Error(typeof errorMsg === "string" ? errorMsg : JSON.stringify(errorMsg));
  }

  return json.data;
}

/* --- PRODUCTS --- */
export async function createProduct(data: Omit<Product, "id">) {
  return adminFetch<Product>("/products", "POST", data);
}
export async function updateProduct(id: number, data: Omit<Product, "id">) {
  return adminFetch<Product>(`/products/${id}`, "PUT", data);
}
export async function deleteProduct(id: number) {
  return adminFetch<void>(`/products/${id}`, "DELETE");
}

/* --- CATEGORIES --- */
export async function createCategory(data: { category_name: string }) {
  return adminFetch<Category>("/categories", "POST", data);
}
export async function updateCategory(id: number, data: { category_name: string }) {
  return adminFetch<Category>(`/categories/${id}`, "PUT", data);
}
export async function deleteCategory(id: number) {
  return adminFetch<void>(`/categories/${id}`, "DELETE");
}