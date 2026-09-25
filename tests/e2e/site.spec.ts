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

test("location pages are crawlable, unique and internally linked", async ({ page, request }) => {
  const sitemap = await (await request.get("/sitemap.xml")).text();
  for (const area of ["christleton", "rowton", "waverton"]) {
    const path = `/roof-repairs/${area}`;
    expect(sitemap).toContain(`https://vallano.example${path}`);
    await page.goto(path);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toContainText(new RegExp(area, "i"));
    const localStrip = page.locator(".location-header .local-strip");
    await expect(localStrip).toHaveCount(1);
    await expect(localStrip).toContainText("Local roof repairs");
    await expect(localStrip).toContainText("Christleton • Rowton • Waverton");
    await expect(localStrip).toContainText("Three priority service areas");
    await expect(localStrip).toHaveCSS("background-color", "rgb(182, 204, 215)");
    const headerWhatsAppLink = page.locator('.location-header a[href*="wa.me"]');
    await expect(headerWhatsAppLink).toContainText("WhatsApp Jamie");
    await expect(headerWhatsAppLink.locator(".whatsapp-icon")).toHaveCount(1);
    await expect(page.locator(".work-example .section-label")).toHaveCSS("color", "rgb(182, 204, 215)");
    await expect(page.locator("#work-example-heading")).toHaveCSS("color", "rgb(255, 255, 255)");
    const guidance = page.locator(".homeowner-guidance");
    await expect(guidance).toHaveCount(1);
    await expect(guidance.locator("h2")).toContainText(new RegExp(area, "i"));
    await expect(guidance.locator(".guidance-grid article")).toHaveCount(3);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://vallano.example${path}`);
    const schema = await page.locator('script[type="application/ld+json"]').textContent();
    expect(schema).toContain("BreadcrumbList");
    expect(schema).toContain("Service");
  }
  await page.goto("/");
  for (const area of ["christleton", "rowton", "waverton"]) {
    await expect(page.locator(`#areas a[href="/roof-repairs/${area}"]`)).toHaveCount(1);
  }
});

test("completed-work example does not claim a Christleton project location", async ({ page }) => {
  await page.goto("/roof-repairs/christleton");
  const caseFile = page.locator(".case-file");
  await expect(caseFile).toContainText("Example of our completed work");
  await expect(caseFile).toContainText("The project location is not stated");
  await expect(caseFile).not.toContainText(/Christleton/i);
  await expect(caseFile).toContainText("Traditional detailing, carefully reinstated");
  await expect(caseFile).toContainText("Welsh slate");
  await expect(caseFile).toContainText("200 mm laps");
  await expect(caseFile.locator(".case-file-gallery figure")).toHaveCount(4);
  await expect(caseFile.locator(".case-file-gallery img")).toHaveCount(4);
  for (const image of await caseFile.locator(".case-file-gallery img").all()) {
    await expect(image).toHaveAttribute("alt", /.+/);
  }
  const guidance = page.locator(".homeowner-guidance");
  await expect(guidance).toContainText("What to check when a Christleton roof develops a problem");
  await expect(guidance.locator(".guidance-grid article")).toHaveCount(3);
  await expect(guidance).toContainText("Never climb onto a wet or damaged roof");
  await expect(guidance).toContainText("The roof’s condition must determine the recommendation");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
});

test("Rowton presents its own flue repair case study", async ({ page }) => {
  await page.goto("/roof-repairs/rowton");
  const heroImage = page.locator(".location-hero img");
  await expect(heroImage).toHaveAttribute("src", /rowton-flue-roof-damage\.jpeg/);
  await expect(heroImage).toHaveAttribute("alt", "Broken and missing slates exposing the roof beside a newly installed boiler flue");
  const caseFile = page.locator(".case-file");
  await expect(caseFile).toContainText("Emergency slate repair around a new boiler flue");
  await expect(caseFile).toContainText("An older homeowner contacted Vallano Roofing");
  await expect(caseFile).toContainText("she had no money left for the urgent roof repair");
  await expect(caseFile).not.toContainText("A homeowner in Rowton");
  await expect(caseFile).toContainText("50 mm × 25 mm blue roofing battens");
  await expect(caseFile).toContainText("70 mm batten-fixing screws");
  await expect(caseFile).toContainText("without charge");
  await expect(caseFile).not.toContainText("Welsh slate");
  await expect(caseFile).not.toContainText("200 mm laps");
  await expect(caseFile.locator(".case-file-gallery figure")).toHaveCount(4);
  await expect(caseFile.locator(".case-file-gallery img")).toHaveCount(4);
  for (const image of await caseFile.locator(".case-file-gallery img").all()) {
    await expect(image).toHaveAttribute("alt", /.+/);
  }
  const guidance = page.locator(".homeowner-guidance");
  await expect(guidance).toContainText("What to check when a Rowton roof is damaged around a flue");
  await expect(guidance).toContainText("Look for openings around the flue");
  await expect(guidance).toContainText("Record changes after the installation");
  await expect(guidance).not.toContainText("Defects at lead junctions");
});

test("Waverton presents its own chimney-side slate repair case study", async ({ page }) => {
  await page.goto("/roof-repairs/waverton");
  const heroImage = page.locator(".location-hero img");
  await expect(heroImage).toHaveAttribute("src", /waverton-chimney-timber-inspection\.jpeg/);
  await expect(heroImage).toHaveAttribute("alt", "Roof opened beside a chimney to inspect failed battens, underlay and timber");
  const guidance = page.locator(".homeowner-guidance");
  await expect(guidance).toContainText("What to check after a Waverton roof loses slates in high winds");
  await expect(guidance).toContainText("Check for wind-related slate loss");
  await expect(guidance).toContainText("Allow for concealed deterioration");
  await expect(guidance).not.toContainText("Defects at lead junctions");
  const caseFile = page.locator(".case-file");
  await expect(caseFile).toContainText("Wind-damaged slate repair beside a chimney");
  await expect(caseFile).toContainText("report prepared for the sale of her home");
  await expect(caseFile).toContainText("rotted through");
  await expect(caseFile).toContainText("commercial timber-treatment product");
  await expect(caseFile).toContainText("Two larger Welsh slates");
  await expect(caseFile).toContainText("sold the home around two months later");
  await expect(caseFile.locator(".case-file-details")).toHaveCount(1);
  await expect(caseFile.locator(".case-file-gallery figure")).toHaveCount(4);
  await expect(caseFile.locator(".case-file-gallery img")).toHaveCount(4);
  for (const image of await caseFile.locator(".case-file-gallery img").all()) {
    await expect(image).toHaveAttribute("alt", /.+/);
  }
});

test("new service pages are unique, crawlable and internally linked", async ({ page, request }) => {
  const sitemap = await (await request.get("/sitemap.xml")).text();
  const services = [
    ["slate-roof-repairs", "Slate Roof Repairs in Christleton, Rowton & Waverton | Vallano Roofing", "Slate roof repairs in Christleton, Rowton & Waverton", "Repairing the defect while retaining sound slates"],
    ["chimney-flashing-repairs", "Chimney Flashing Repairs in Christleton, Rowton & Waverton | Vallano Roofing", "Chimney flashing repairs in Christleton, Rowton & Waverton", "A leak near a chimney is not automatically a flashing failure"]
  ] as const;

  for (const [slug, title, heading, introduction] of services) {
    const path = `/${slug}`;
    expect(sitemap).toContain(`https://vallano.example${path}`);
    await page.goto(path);
    await expect(page).toHaveTitle(title);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /Christleton, Rowton and Waverton/);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", title);
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute("content", /Christleton, Rowton and Waverton/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://vallano.example${path}`);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toContainText(heading);
    await expect(page.locator("#service-introduction-heading")).toContainText(introduction);
    await expect(page.locator(".guidance-grid article")).toHaveCount(3);
    await expect(page.locator(".faq-list details")).toHaveCount(5);
    await expect(page.locator('.area-grid a[href^="/roof-repairs/"]')).toHaveCount(3);
    const schema = await page.locator('script[type="application/ld+json"]').textContent();
    expect(schema).toContain("BreadcrumbList");
    expect(schema).toContain("FAQPage");
    expect(schema).toContain("Service");
    expect(schema?.toLowerCase()).not.toContain("chester");
    await expect(page.locator("body")).not.toContainText(/Chester/i);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
    const accessibility = await new AxeBuilder({ page: page as never }).analyze();
    expect(accessibility.violations).toEqual([]);
  }

  await page.goto("/");
  await expect(page.locator('#services a[href="/slate-roof-repairs"]')).toHaveCount(1);
  await expect(page.locator('#services a[href="/chimney-flashing-repairs"]')).toHaveCount(1);
});

test("service pages use verified project evidence without unsupported locations", async ({ page }) => {
  await page.goto("/slate-roof-repairs");
  const slateEvidence = page.locator(".service-evidence");
  await expect(slateEvidence.locator("article")).toHaveCount(3);
  await expect(slateEvidence).not.toContainText("Location not published");
  for (const area of ["christleton", "rowton", "waverton"]) {
    const link = slateEvidence.locator(`a[href="/roof-repairs/${area}"]`);
    await expect(link).toHaveCount(1);
    await expect(link).toHaveText(/Read the completed-work case study/);
  }
  await expect(slateEvidence).toContainText("Christleton");
  await expect(slateEvidence).toContainText("Rowton");
  await expect(slateEvidence).toContainText("Waverton");

  await page.goto("/chimney-flashing-repairs");
  const chimneyCaseStudy = page.locator(".service-case-file");
  await expect(chimneyCaseStudy).toContainText("Three-storey chimney flashing and slate repair");
  await expect(chimneyCaseStudy).toContainText("daylight visible through a gap");
  await expect(chimneyCaseStudy).toContainText("600 mm-wide Code 4 lead");
  await expect(chimneyCaseStudy).toContainText("three levels of access");
  await expect(chimneyCaseStudy.locator(".case-file-gallery figure")).toHaveCount(3);
  await expect(chimneyCaseStudy.locator(".case-file-gallery img")).toHaveCount(3);
  await expect(chimneyCaseStudy).not.toContainText("Rowton");
  await expect(chimneyCaseStudy).not.toContainText("Waverton");
  await expect(chimneyCaseStudy).not.toContainText("Christleton");
});
