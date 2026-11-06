import { expect, test } from "@playwright/test";

const pages = [
  { path: "/projects", label: "Projects", title: /Projects/ },
  { path: "/resources", label: "Resources", title: /Resources/ },
];

for (const { path, label, title } of pages) {
  test.describe(`${label} page`, () => {
    test("loads with a heading and no errors", async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));

      await page.goto(path);

      await expect(page).toHaveTitle(title);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      expect(errors).toEqual([]);
    });

    test("is reachable from the main nav", async ({ page }) => {
      await page.goto("/");
      await page
        .getByRole("navigation", { name: "Main" })
        .getByRole("link", { name: label })
        .click();
      await expect(page).toHaveURL(new RegExp(`${path}$`));
    });

    for (const width of [393, 1280]) {
      test(`has no horizontal scroll at ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(path);
        const overflow = await page.evaluate(
          () =>
            document.documentElement.scrollWidth -
            document.documentElement.clientWidth,
        );
        expect(overflow).toBeLessThanOrEqual(0);
      });
    }
  });
}
