import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 60000, // Toleransi cold start backend
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  
  // Daftarkan global setup di sini
  globalSetup: require.resolve("./global-setup"),

  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    // Gunakan sesi login dari file user.json
    storageState: "user.json",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});