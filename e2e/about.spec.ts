import { expect, test } from "@playwright/test";

test("about page loads with the title and a visible h1", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));

  await page.goto("/about");

  await expect(page).toHaveTitle(/About/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  expect(errors).toEqual([]);
});

test("about page says the club is open to all majors", async ({ page }) => {
  await page.goto("/about");
  await expect(page.locator("main")).toContainText(/all majors/i);
});

test("the only primary button links to /join", async ({ page }) => {
  await page.goto("/about");
  const primary = page.locator('main [data-button="primary"]');
  await expect(primary).toHaveCount(1);
  await expect(primary).toHaveAttribute("href", "/join");
});

test("a FAQ item opens and closes with the keyboard", async ({ page }) => {
  await page.goto("/about");

  const details = page
    .locator("details")
    .filter({ hasText: "Do I need to be an engineering major?" });
  const summary = details.locator("summary");

  // Tab from the top of the page until the summary has focus.
  await page.locator("body").press("Tab");
  for (let i = 0; i < 40 && !(await summary.evaluate(isFocused)); i++) {
    await page.keyboard.press("Tab");
  }
  await expect(summary).toBeFocused();

  await expect(details).not.toHaveAttribute("open", "");
  await page.keyboard.press("Enter");
  await expect(details).toHaveAttribute("open", "");
  await page.keyboard.press("Enter");
  await expect(details).not.toHaveAttribute("open", "");
});

test("about is reachable from the main nav", async ({ page }) => {
  await page.goto("/");
  await page
    .getByRole("navigation", { name: "Main" })
    .getByRole("link", { name: "About" })
    .click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/About/);
});

for (const width of [393, 1280]) {
  test(`no horizontal scroll at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/about");
    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
}

function isFocused(el: Element) {
  return el === document.activeElement;
}
