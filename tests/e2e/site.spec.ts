import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("semantic content, metadata and links are valid", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page).toHaveTitle("Roof Repairs Christleton, Rowton & Waverton | Vallano Roofing");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /Repair-led roofing/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /^https:\/\/vallano\.example\/?$/);
  const ids = await page.locator("[id]").evaluateAll(nodes => nodes.map(n => n.id));
  for (const href of await page.locator('a[href^="#"]').evaluateAll(nodes => nodes.map(n => n.getAttribute("href")!))) expect(ids).toContain(href.slice(1));
  const whatsappLinks = await page.locator('a[href*="wa.me"]').evaluateAll(nodes => nodes.map(n => n.getAttribute("href")!));
  expect(whatsappLinks).not.toHaveLength(0);
  for (const href of whatsappLinks) {
    const url = new URL(href);
    expect(url.origin).toBe("https://wa.me");
    expect(url.pathname).toBe("/447990101321");
    expect(url.searchParams.get("text")).toContain("Hello Jamie");
  }
  for (const href of await page.locator('a[href^="tel:"]').evaluateAll(nodes => nodes.map(n => n.getAttribute("href")!))) expect(href).toBe("tel:+447990101321");
});

test("images, JSON-LD, crawl routes and accessibility pass", async ({ page, request }) => {
  await page.goto("/");
  for (const image of await page.locator("img").all()) { expect(await image.getAttribute("alt")).not.toBeNull(); expect(Number(await image.getAttribute("width"))).toBeGreaterThan(0); expect(Number(await image.getAttribute("height"))).toBeGreaterThan(0); }
  const schema = await page.locator('script[type="application/ld+json"]').textContent();
  expect(() => JSON.parse(schema!)).not.toThrow();
  expect(await (await request.get("/robots.txt")).text()).toContain("https://vallano.example/sitemap.xml");
  expect(await (await request.get("/sitemap.xml")).text()).toContain("https://vallano.example/");
  const results = await new AxeBuilder({ page: page as never }).analyze();
  expect(results.violations).toEqual([]);
});

test("has no horizontal overflow and keyboard-operable CTAs", async ({ page }) => {
  await page.goto("/");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  await page.keyboard.press("Tab");
  await expect(page.locator(".skip-link")).toBeFocused();
  await page.locator("#faqs").scrollIntoViewIfNeeded();
  await expect(page.locator(".mobile-contact")).toHaveAttribute("data-visible", "true");
  const lastFaq = page.locator("details").last();
  await lastFaq.locator("summary").focus(); await page.keyboard.press("Enter");
  await expect(lastFaq).toHaveAttribute("open", "");
  await page.locator("footer").scrollIntoViewIfNeeded();
  const overlap = await page.evaluate(() => { const bar=document.querySelector(".mobile-contact")!.getBoundingClientRect(); const footer=document.querySelector("footer")!.getBoundingClientRect(); return Math.max(0, Math.min(bar.bottom,footer.bottom)-Math.max(bar.top,footer.top)); });
  expect(overlap).toBeLessThanOrEqual(70);
});