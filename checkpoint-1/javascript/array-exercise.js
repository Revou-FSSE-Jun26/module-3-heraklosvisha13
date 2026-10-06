// javascript/array-exercise.js

const products = [
  { id: 1, name: "Urban Backpack",    price: 350000, category: "backpack",  stock: 12 },
  { id: 2, name: "Mini Pouch",        price: 85000,  category: "pouch",     stock: 30 },
  { id: 3, name: "Canvas Totebag",    price: 130000, category: "totebag",   stock: 0  },
  { id: 4, name: "Leather Cross Body",price: 420000, category: "crossbody", stock: 5  },
  { id: 5, name: "Travel Backpack",   price: 550000, category: "backpack",  stock: 8  },
];

// 1. forEach — log tiap produk
console.log("=== Semua produk ===");
products.forEach((p) => console.log(`${p.name} — Rp${p.price}`));

// 2. map — ambil nama saja
const names = products.map((p) => p.name);
console.log("=== Nama produk ===", names);

// 3. filter — produk stok tersedia
const inStock = products.filter((p) => p.stock > 0);
console.log("=== Produk tersedia ===", inStock.length);

// 4. reduce — total nilai inventori
const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);
console.log("=== Total nilai inventori ===", totalValue);

// 5. Kombinasi filter + map + reduce
const backpackValue = products
  .filter((p) => p.category === "backpack")
  .map((p) => p.price * p.stock)
  .reduce((sum, val) => sum + val, 0);
console.log("=== Total nilai kategori backpack ===", backpackValue);