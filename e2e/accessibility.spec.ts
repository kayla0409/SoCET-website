import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

// Every page's definition of done includes "axe reports zero violations".
// Add new routes here as they're built.
const routes = ["/", "/about"];

// WCAG 2.2 A and AA, the level the plan targets.
const wcagTags = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

for (const route of routes) {
  for (const colorScheme of ["light", "dark"] as const) {
    test(`${route} has no WCAG A/AA violations in ${colorScheme} mode`, async ({
      page,
    }) => {
      await page.emulateMedia({ colorScheme });
      await page.goto(route);

      // Check the expanded state too: open every FAQ item in the dark run.
      if (route === "/about" && colorScheme === "dark") {
        const summaries = page.locator("details > summary");
        for (const summary of await summaries.all()) await summary.click();
        await expect(page.locator("details[open]")).not.toHaveCount(0);
      }

      const results = await new AxeBuilder({ page })
        .withTags(wcagTags)
        .analyze();

      // List each violation and where it is, so a failing run says what to fix.
      const violations = results.violations.map((violation) => ({
        rule: violation.id,
        impact: violation.impact,
        help: violation.help,
        targets: violation.nodes.map((node) => node.target.join(" ")),
      }));
      expect(violations).toEqual([]);
    });
  }
}
