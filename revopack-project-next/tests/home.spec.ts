import { test, expect } from "@playwright/test";

test("user can view homepage and navigate to products", async ({ page }) => {
  // 1. Buka halaman utama (jangan tunggu 'load', cukup 'domcontentloaded')
  await page.goto("/", { waitUntil: "domcontentloaded" });

  // 2. Pastikan heading muncul (beri timeout lebih lama karena data API mungkin lambat)
  await expect(page.locator("h1").first()).toContainText("Welcome to RevoPack", { timeout: 15000 });

  // 3. Klik menu PRODUCTS menggunakan data-testid
  await page.getByTestId("nav-products").click();

  // 4. Pastikan URL berubah ke /products
  await expect(page).toHaveURL(/.*\/products/);
  
  // 5. Pastikan judul halaman Products muncul
  await expect(page.locator("h1")).toContainText("Products");
  
  // 6. Pastikan icon cart ada
  await expect(page.getByTestId("cart-icon")).toBeVisible();
});