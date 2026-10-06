import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12
                      grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        {/* Brand */}
        <section>
          <h2 className="text-xl font-extrabold text-white mb-2">
            Revo<span className="text-indigo-400">Pack</span>
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Quality bags for every journey.
          </p>
        </section>

        {/* Shop */}
        <nav aria-labelledby="footer-shop">
          <h3
            id="footer-shop"
            className="text-xs font-semibold uppercase tracking-wider
                       text-white mb-3"
          >
            Shop
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/products" className="hover:text-white transition-colors">
                All
              </Link>
            </li>
            <li>
              <Link href="/products?category=backpack" className="hover:text-white transition-colors">
                Backpack
              </Link>
            </li>
            <li>
              <Link href="/products?category=pouch" className="hover:text-white transition-colors">
                Pouch
              </Link>
            </li>
            <li>
              <Link href="/products?category=totebag" className="hover:text-white transition-colors">
                Totebag
              </Link>
            </li>
            <li>
              <Link href="/products?category=crossbody" className="hover:text-white transition-colors">
                Cross Body
              </Link>
            </li>
          </ul>
        </nav>

        {/* Support */}
        <nav aria-labelledby="footer-support">
          <h3
            id="footer-support"
            className="text-xs font-semibold uppercase tracking-wider
                       text-white mb-3"
          >
            Support
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/contact" className="hover:text-white transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/shipping" className="hover:text-white transition-colors">
                Shipping
              </Link>
            </li>
            <li>
              <Link href="/returns" className="hover:text-white transition-colors">
                Returns
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-white transition-colors">
                FAQ
              </Link>
            </li>
          </ul>
        </nav>

        {/* Contact */}
        <section aria-labelledby="footer-contact">
          <h3
            id="footer-contact"
            className="text-xs font-semibold uppercase tracking-wider
                       text-white mb-3"
          >
            Contact
          </h3>
          <address className="not-italic text-sm space-y-2">
            <p>
              ✉️{" "}
              <a
                href="mailto:hello@revoshop.co.id"
                className="hover:text-white transition-colors"
              >
                hello@revoshop.co.id
              </a>
            </p>
            <p>
              📞{" "}
              <a
                href="tel:+6281751207990"
                className="hover:text-white transition-colors"
              >
                +62 817-5120-7990
              </a>
            </p>
          </address>
        </section>
      </div>

      {/* Copyright */}
      <div className="border-t border-slate-800">
        <p className="max-w-6xl mx-auto px-4 sm:px-6 py-4
                      text-center text-xs text-slate-500">
          &copy; 2025 RevoShop. All rights reserved.
        </p>
      </div>
    </footer>
  );
}