import { chromium, FullConfig } from "@playwright/test";

async function globalSetup(config: FullConfig) {
  const apiURL = "https://module-2-heraklosvisha13.onrender.com";
  const email = `testuser_${Date.now()}@example.com`;
  const password = "password123";
  const username = `testuser_${Date.now()}`;

  // 1. Register via API
  await fetch(`${apiURL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });

  // 2. Login via API untuk dapat token
  const loginRes = await fetch(`${apiURL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const loginData = await loginRes.json();
  const { token, user } = loginData.data;

  // 3. Buka browser dan suntikkan token ke localStorage
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Pergi ke halaman web (hanya untuk mendapatkan origin localhost:3000)
  await page.goto(config.projects[0].use.baseURL || "http://localhost:3000");
  
  // Set localStorage
  await page.evaluate(([u, t]) => {
    localStorage.setItem("user", JSON.stringify(u));
    localStorage.setItem("token", t);
  }, [user, token] as const);

  // Simpan sesi (cookies + localStorage) ke file user.json
  await page.context().storageState({ path: "user.json" });
  await browser.close();
}

export default globalSetup;