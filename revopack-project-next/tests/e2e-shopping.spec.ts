import { test, expect } from "@playwright/test";

test("customer can add to cart and checkout", async ({ page }) => {
  // 1. Buka halaman products
  await page.goto("/products", { waitUntil: "domcontentloaded" });

  // 2. Klik Add to Cart pada produk pertama
  // (Menggunakan locator role button dengan teks 'Add to Cart')
  await page.getByRole("button", { name: "Add to Cart" }).first().click();

  // 3. Pastikan badge cart di header bertambah menjadi 1
  // Kita asumsikan badge cart ada di dalam elemen dengan data-testid="cart-icon"
  await expect(page.getByTestId("cart-icon")).toContainText("1");

  // 4. Klik icon cart untuk masuk ke halaman /cart
  await page.getByTestId("cart-icon").click();
  await expect(page).toHaveURL(/.*\/cart/);

  // 5. Klik tombol "Proceed to Checkout"
  await page.getByRole("link", { name: "Proceed to Checkout" }).click();
  await expect(page).toHaveURL(/.*\/checkout/);

  // 6. Klik tombol "Confirm Order"
  await page.getByRole("button", { name: "Confirm Order" }).click();

  // 7. Pastikan redirect ke halaman /orders
  await expect(page).toHaveURL(/.*\/orders/);

  // 8. Pastikan pesanan muncul di halaman orders
  // (Mengecek apakah ada teks "Order #" di halaman)
  await expect(page.locator("text=Order #").first()).toBeVisible();
});