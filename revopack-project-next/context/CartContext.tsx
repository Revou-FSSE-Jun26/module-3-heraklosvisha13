"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import type { Product, CartItem } from "@/lib/types";

interface CartContextValue {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Ambil data cart dari localStorage saat pertama kali dimuat
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error("Failed to restore cart:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 2. Simpan ke localStorage setiap kali isi cart berubah
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, isLoading]);

  // 3. Fungsi tambah barang
  function addToCart(product: Product, quantity: number) {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);

      if (existingItem) {
        // Kalau barang sudah ada, tambah jumlahnya (quantity)
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      // Kalau barang belum ada, masukkan sebagai barang baru
      return [...prev, { ...product, quantity }];
    });
  }

  // 4. Fungsi hapus barang
  function removeFromCart(productId: number) {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  }

  // 5. Fungsi kosongkan keranjang
  function clearCart() {
    setCart([]);
  }

  // Hitung total barang (contoh: 2 tas + 1 dompet = 3 item)
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Hitung total harga
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (isLoading) return null; // Cegah UI berkedip sebelum data siap

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Hook untuk memakai CartContext di komponen lain
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}