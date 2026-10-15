import type {
  Product,
  Category,
  Order,
  User,
  ApiResponse,
} from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

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
  return apiFetch<Order[]>("/orders");
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
