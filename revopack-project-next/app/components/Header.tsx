"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  // const searchParams = useSearchParams();
  // const currentCategory = searchParams.get("category");

  const navLinks = [
    // { href: "/products", label: "All", category: null },
    // { href: "/products?category_id=1", label: "Backpack", category: "backpack" },
    // { href: "/products?category_id=2", label: "Pouch", category: "pouch" },
    // { href: "/products?category_id=3", label: "Totebag", category: "totebag" },
    // { href: "/products?category_id=4", label: "Cross Body", category: "crossbody" },
    { href: "/", label: "HOME" },
    { href: "/products", label: "PRODUCTS" },
    { href: "/categories", label: "CATEGORIES" },
    { href: "/orders", label: "ORDERS" },
  ];

  function isActive(href: string) : boolean{
    if(href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href+"/");
  }

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-3 sm:py-4 flex items-center justify-between gap-4">
          <Link href="/" className="text-xl sm:text-2xl font-extrabold shrink-0">
            Revo<span className="text-indigo-600">Pack</span>
          </Link>

          {/* NAV DESKTOP dengan active state */}
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
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

          <div className="flex items-center gap-1 shrink-0">
            <Link
              href="/cart"
              className="relative w-10 h-10 rounded-lg hover:bg-slate-100
                         flex items-center justify-center transition text-lg"
            >
              🛒
              <span className="absolute top-1 right-1 min-w-4.5 h-4.5 px-1
                               bg-red-500 text-white text-[0.7rem] font-bold
                               rounded-full flex items-center justify-center
                               leading-none">
                0
              </span>
            </Link>

            <Link
              href="/login"
              className="hidden sm:inline-flex items-center
                         px-4 py-2 text-sm font-semibold
                         text-indigo-600 hover:bg-indigo-50
                         rounded-lg transition"
            >
              Login
            </Link>

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
                      className={
                        active
                          ? "block px-3 py-2 rounded-lg bg-indigo-50 text-indigo-600 font-semibold"
                          : "block px-3 py-2 rounded-lg tex-slate-700 hover:bg-slate-100"
                      }
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}

              <li className="sm:hidden pt-2 border-t border-slate-200 mt-2">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-lg text-sm font-semibold
                             text-indigo-600 hover:bg-indigo-50 transition-colors"
                >
                  Login
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}