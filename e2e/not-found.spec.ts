import { expect, test } from "@playwright/test";

const missing = "/does-not-exist";

test("an unknown URL returns HTTP 404 and the branded page", async ({
  page,
}) => {
  const response = await page.goto(missing);
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    /not found/i,
  );
});

test("the 404 page has its own title and is not indexed", async ({ page }) => {
  await page.goto(missing);
  await expect(page).toHaveTitle(/not found/i);
  await expect(page.locator('meta[name="robots"]').first()).toHaveAttribute(
    "content",
    /noindex/,
  );
});

test("the only primary button links to /", async ({ page }) => {
  await page.goto(missing);
  const primary = page.locator('main [data-button="primary"]');
  await expect(primary).toHaveCount(1);
  await expect(primary).toHaveAttribute("href", "/");
  await expect(primary).toHaveText("Back to home");
});

test("Home, Events and Join links are present", async ({ page }) => {
  await page.goto(missing);
  const links = page.getByRole("navigation", { name: "Other pages" });
  await expect(links.getByRole("link", { name: "Home" })).toHaveAttribute(
    "href",
    "/",
  );
  await expect(links.getByRole("link", { name: "Events" })).toHaveAttribute(
    "href",
    "/events",
  );
  await expect(links.getByRole("link", { name: "Join" })).toHaveAttribute(
    "href",
    "/join",
  );
});

for (const width of [393, 1280]) {
  test(`no horizontal scroll at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(missing);
    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
}
