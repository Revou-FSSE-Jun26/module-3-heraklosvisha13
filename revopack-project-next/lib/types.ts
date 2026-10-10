/* =========================================================
   RevoShop — Shared Type Definitions
   ========================================================= */

export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category_id: number;
}

export interface Category {
  id: number;
  category_name: string;
}

export interface OrderItem {
  order_id: number;
  product_id: number;
  quantity: number;
  unit_price: number;
}

export interface Order {
  id: number;
  user_id: number;
  total_price: number;
  status: string;
  created_at: string | null;
  items?: OrderItem[];
}

export interface User {
  id: number;
  username: string;
  email: string;
}

/* =========================================================
   API RESPONSE WRAPPER
   
   API kamu bungkus response dalam { data, status }
   ========================================================= */
export interface ApiResponse<T> {
  data: T;
  status: "success" | "error";
  message?: string;
}