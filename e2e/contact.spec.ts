import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

// These tests never submit a valid form, so they can't send a real email even
// when RESEND_API_KEY is set locally. Sending is covered by the unit tests
// with Resend mocked.
test.describe("contact page", () => {
  test("loads with a heading and the form", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));

    await page.goto("/contact");

    await expect(page).toHaveTitle(/Contact/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    for (const label of ["Name", "Email", "Subject", "Message"]) {
      await expect(page.getByLabel(label)).toBeVisible();
    }
    await expect(
      page.getByRole("button", { name: "Send message" }),
    ).toBeEnabled();
    expect(errors).toEqual([]);
  });

  test("is reachable from the main nav and the footer", async ({ page }) => {
    await page.goto("/");
    await page
      .getByRole("navigation", { name: "Main" })
      .getByRole("link", { name: "Contact" })
      .click();
    await expect(page).toHaveURL(/\/contact$/);

    await page.goto("/");
    await page
      .getByRole("contentinfo")
      .getByRole("link", { name: "Contact" })
      .click();
    await expect(page).toHaveURL(/\/contact$/);
  });

  test("works with the keyboard and flags empty fields", async ({ page }) => {
    // Tabbing scrolls the page, and the header fades its colors as it scrolls.
    // Reduced motion makes both instant so axe never sees a half-faded header.
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/contact");

    // Tab from the top of the page into the Name field.
    const name = page.getByLabel("Name");
    await page.locator("body").press("Tab");
    for (let i = 0; i < 40 && !(await name.evaluate(isFocused)); i++) {
      await page.keyboard.press("Tab");
    }
    await expect(name).toBeFocused();

    await page.keyboard.type("Ana López");
    await page.keyboard.press("Tab");
    await expect(page.getByLabel("Email")).toBeFocused();
    await page.keyboard.type("not-an-email");

    // Submit with Enter from a text field; nothing is sent.
    await page.keyboard.press("Enter");

    await expect(page.getByText("Enter a valid email address.")).toBeVisible();
    await expect(page.getByText("Enter a subject.")).toBeVisible();
    await expect(page.getByText("Enter a message.")).toBeVisible();
    await expect(page.getByLabel("Email")).toBeFocused();
    await expect(page.getByLabel("Name")).toHaveValue("Ana López");

    // The error state is accessible too.
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(results.violations.map((v) => v.id)).toEqual([]);
  });

  for (const width of [393, 1280]) {
    test(`has no horizontal scroll at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/contact");
      const overflow = await page.evaluate(
        () =>
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }
});

function isFocused(el: Element) {
  return el === document.activeElement;
}
