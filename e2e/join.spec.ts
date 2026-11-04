import { expect, test } from "@playwright/test";
import { site } from "../src/lib/site";

test.describe("join page", () => {
  test("loads with the key content and links", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));

    await page.goto("/join");

    await expect(page).toHaveTitle(/Join/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByText(/all majors/i).first()).toBeVisible();

    const main = page.getByRole("main");
    await expect(
      main.getByRole("link", { name: "Open the sign-up form" }),
    ).toHaveAttribute("href", site.joinFormUrl);
    await expect(
      main.getByRole("link", { name: "Join the SoCET Discord" }),
    ).toHaveAttribute("href", site.discordUrl);
    await expect(
      main.getByRole("link", { name: "Follow SoCET on Instagram" }),
    ).toHaveAttribute("href", site.instagramUrl);
    await expect(
      main.getByRole("link", { name: "See upcoming events" }),
    ).toHaveAttribute("href", "/#events");

    await expect(main.getByRole("listitem").first()).toBeVisible();
    expect(errors).toEqual([]);
  });

  for (const width of [393, 1280]) {
    test(`has no horizontal scroll at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/join");
      const overflow = await page.evaluate(
        () =>
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }
});

test("home page Join button goes to /join", async ({ page }) => {
  await page.goto("/");
  await page
    .getByRole("main")
    .getByRole("link", { name: "Join SoCET", exact: true })
    .click();
  await expect(page).toHaveURL(/\/join$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});
