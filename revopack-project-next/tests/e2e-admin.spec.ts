import { test, expect } from "@playwright/test";

// Matikan auto-login dari global-setup agar kita bisa login manual sebagai Admin
test.use({ storageState: { cookies: [], origins: [] } });

test("admin can create, edit, and delete product", async ({ page }) => {
  // 1. Login sebagai Admin
  await page.goto("/login", { waitUntil: "domcontentloaded" });
  await page.locator('input[type="email"]').fill("admin1@example.com");
  await page.locator('input[type="password"]').fill("hashed_password_1");
  await page.getByRole("button", { name: "Login" }).click();

  // 2. Pastikan masuk ke halaman dashboard (atau home)
  // Admin diarahkan ke /dashboard
  await expect(page).toHaveURL(/.*\/dashboard/);

  // 3. Klik "+ Add Product"
  await page.getByRole("button", { name: "+ Add Product" }).click();

  // 4. Isi form Create Product
  const uniqueProductName = `Test Prod ${Date.now()}`;
  
  await page.getByTestId("product-name-input").fill(uniqueProductName);
  await page.getByTestId("product-category-select").selectOption({ index: 1 });
  
  await page.locator('input[type="number"]').nth(0).fill("150000"); // Price
  await page.locator('input[type="number"]').nth(1).fill("10");     // Stock

  // 5. Klik Save Product
  await page.getByRole("button", { name: "Save Product" }).click();

  // 6. Pastikan notifikasi sukses muncul dan modal tertutup
  await expect(page.locator("text=Product created successfully!")).toBeVisible();
  
  // 7. Cari produk yang baru dibuat di tabel, dan klik Edit
  const row = page.locator("tr", { hasText: uniqueProductName });
  await row.getByRole("button", { name: "Edit" }).click();

  // 8. Ubah harganya
  await page.locator('input[type="number"]').nth(0).fill("200000");
  await page.getByRole("button", { name: "Save Product" }).click();
  
  // Pastikan notifikasi update muncul
  await expect(page.locator("text=Product updated successfully!")).toBeVisible();

  // 9. Klik Delete pada produk tersebut
  await row.getByRole("button", { name: "Delete" }).click();
  
  // Konfirmasi Yes
  await row.getByRole("button", { name: "Yes" }).click();

  // 10. Pastikan notifikasi delete muncul dan produk hilang
  await expect(page.locator("text=Product deleted successfully")).toBeVisible();
  await expect(page.locator("tr", { hasText: uniqueProductName })).toBeHidden();
});