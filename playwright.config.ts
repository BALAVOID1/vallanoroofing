import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/e2e",
  webServer: { command: "SITE_URL=https://vallano.example npm run start", url: "http://127.0.0.1:3000", reuseExistingServer: false },
  use: { baseURL: "http://127.0.0.1:3000", trace: "retain-on-failure" },
  projects: [
    { name: "mobile-320", use: { viewport: { width: 320, height: 740 } } },
    { name: "mobile-375", use: { viewport: { width: 375, height: 812 } } },
    { name: "mobile-430", use: { viewport: { width: 430, height: 932 } } },
    { name: "desktop", use: { ...devices["Desktop Chrome"] } }
  ]
});