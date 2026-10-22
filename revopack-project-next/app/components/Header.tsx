"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, isLoggedIn, logout } = useAuth();
  const { totalItems } = useCart();

  const navLinks = [
    { href: "/", label: "HOME" },
    { href: "/products", label: "PRODUCTS" },
    { href: "/categories", label: "CATEGORIES" },
    { href: "/orders", label: "ORDERS" },
  ];

  function isActive(href: string): boolean {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  }

  function handleLogout() {
    logout();
    setUserMenuOpen(false);
    setIsOpen(false);
    router.push("/login");
  }

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-3 sm:py-4 flex items-center justify-between gap-4">
          {/* LOGO */}
          <Link href="/" className="text-xl sm:text-2xl font-extrabold shrink-0">
            Revo<span className="text-indigo-600">Pack</span>
          </Link>

          {/* NAV DESKTOP */}
          <nav className="hidden md:flex gap-1 text-sm font-medium">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  data-testid={`nav-${link.label.toLowerCase()}`}
                  className={
                    active
                      ? "px-4 py-2 rounded-lg bg-indigo-50 text-indigo-600 font-semibold"
                      : "px-4 py-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
                  }
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* ACTIONS */}
          <div className="flex items-center gap-1 shrink-0">
            {/* CART */}
            <Link
              href="/cart"
              aria-label="Cart"
              data-testid="cart-icon"
              className="relative w-10 h-10 rounded-lg hover:bg-slate-100
                         flex items-center justify-center transition text-lg"
            >
              🛒
              <span className="absolute top-1 right-1 min-w-4.5 h-4.5 px-1
                               bg-red-500 text-white text-[0.7rem] font-bold
                               rounded-full flex items-center justify-center
                               leading-none">
                {totalItems}
              </span>
            </Link>

            {/* AUTH AREA */}
            {isLoggedIn && currentUser ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="inline-flex items-center gap-2 px-3 py-2 text-sm
                             font-semibold text-slate-700 hover:bg-slate-100
                             rounded-lg transition"
                >
                  <span className="w-6 h-6 rounded-full bg-indigo-600 text-white
                                   flex items-center justify-center text-xs">
                    {currentUser.username.charAt(0).toUpperCase()}
                  </span>
                  <span className="hidden sm:inline">{currentUser.username}</span>
                  <span className="text-xs">▼</span>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg
                                  border border-slate-200 shadow-lg py-1 z-50">
                    {currentUser.role === "admin" && (
                      <Link
                        href="/dashboard"
                        onClick={() => setUserMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-slate-700
                                   hover:bg-slate-100"
                      >
                        📊 Dashboard
                      </Link>
                    )}
                    <Link
                      href="/orders"
                      onClick={() => setUserMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-slate-700
                                 hover:bg-slate-100"
                    >
                      📦 My Orders
                    </Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600
                                 hover:bg-red-50 transition"
                    >
                      🚪 Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden md:inline-flex items-center px-4 py-2 text-sm font-semibold
                           text-white bg-indigo-600 hover:bg-indigo-700
                           rounded-lg transition"
              >
                Login / Register
              </Link>
            )}

            {/* HAMBURGER */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              className="md:hidden inline-flex items-center justify-center
                         w-10 h-10 rounded-lg hover:bg-slate-100 transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* NAV MOBILE */}
        {isOpen && (
          <nav className="md:hidden pb-4 border-t border-slate-200 pt-3">
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      data-testid={`nav-mobile-${link.label.toLowerCase()}`}
                      className={
                        active
                          ? "block px-3 py-2 rounded-lg bg-indigo-50 text-indigo-600 font-semibold"
                          : "block px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
                      }
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}

              {isLoggedIn && currentUser ? (
                <>
                  {currentUser.role === "admin" && (
                    <li>
                      <Link
                        href="/dashboard"
                        onClick={() => setIsOpen(false)}
                        className="block px-3 py-2 rounded-lg text-slate-700
                                   hover:bg-slate-100 transition-colors"
                      >
                        📊 Dashboard
                      </Link>
                    </li>
                  )}
                  <li>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 rounded-lg text-red-600
                                 hover:bg-red-50 transition"
                    >
                      🚪 Logout ({currentUser.username})
                    </button>
                  </li>
                </>
              ) : (
                <li className="pt-2 border-t border-slate-200 mt-2">
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 rounded-lg text-sm font-semibold
                               text-white bg-indigo-600 hover:bg-indigo-700
                               transition-colors text-center"
                  >
                    Login / Register
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}