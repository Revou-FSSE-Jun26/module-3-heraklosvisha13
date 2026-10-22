import { test, expect } from "@playwright/test";

test.use({ storageState: { cookies: [], origins: [] } });

test("register form validation", async ({ page }) => {
  
  await page.goto("/register", { waitUntil: "domcontentloaded" });
  
  await page.getByRole("button", { name: "Register" }).click();
  
  await expect(page.locator("text=Username is required")).toBeVisible();
  await expect(page.locator("text=Email is required")).toBeVisible();
  await expect(page.locator("text=Password is required")).toBeVisible();
});

test("complete registration and login flow", async ({ page }) => {
  const timestamp = Date.now();
  const randomEmail = `ui_test_${timestamp}@example.com`;
  const randomUsername = `tester_${timestamp}`; // ← Tanpa spasi

  // Buka halaman register
  await page.goto("/register", { waitUntil: "domcontentloaded" });
  
  // Isi form
  await page.locator('input[placeholder="e.g. budi_santoso"]').fill(randomUsername);
  await page.locator('input[placeholder="e.g. budi_santoso@example.com"]').fill(randomEmail);
  await page.locator('input[placeholder="min 6 characters"]').fill("password123");
  await page.locator('input[placeholder="Type password again"]').fill("password123");
  
  // Submit
  await page.getByRole("button", { name: "Register" }).click();
  
  // Tunggu redirect
  try {
    await expect(page).toHaveURL("/", { timeout: 30000 });
  } catch (error) {
    // Jika gagal redirect, ambil screenshot atau teks error di UI
    const errorText = await page.locator(".bg-red-50").innerText().catch(() => "Tidak ada pesan error di UI");
    console.log("Gagal Register. Pesan dari Backend/UI:", errorText);
    throw error; // Lempar error agar test tetap gagal
  }

  // Pastikan username (tanpa spasi) muncul di header
  await expect(page.locator(`text=${randomUsername}`).first()).toBeVisible();
  
  // Logout
  await page.getByRole("button", { name: new RegExp(randomUsername, "i") }).click();
  await page.getByRole("button", { name: "Logout" }).click();
  
  await expect(page).toHaveURL("/login");
});