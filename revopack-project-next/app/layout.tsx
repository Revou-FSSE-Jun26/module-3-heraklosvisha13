import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Plus_Jakarta_Sans } from "next/font/google";

const jakarta_sans = Plus_Jakarta_Sans ({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RevoShop — Quality Bags for Every Journey",
  description: "Browse our collection of bags.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jakarta_sans.className}>
      <body className="bg-slate-50 text-slate-900 min-h-screen flex flex-col">
        <Header />

        {/* Konten halaman dimasukkan di sini */}
        <div className="flex-1">{children}</div>

        <Footer />
      </body>
    </html>
  );
}