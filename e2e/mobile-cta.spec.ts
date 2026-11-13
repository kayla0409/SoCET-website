import { expect, test, type Page } from "@playwright/test";
import { socialLinks } from "../src/lib/site";

/** Scrolls without smooth scrolling, retrying while the page settles on load. */
async function scrollToY(page: Page, y: number) {
  await expect
    .poll(() =>
      page.evaluate((top) => {
        window.scrollTo({ top, behavior: "instant" });
        const max = document.documentElement.scrollHeight - window.innerHeight;
        return Math.abs(window.scrollY - Math.min(top, max)) < 2;
      }, y),
    )
    .toBe(true);
}

const bar = (page: Page) =>
  page.getByRole("complementary", { name: "Join SoCET" });

test.describe("sticky mobile call-to-action (IF-5)", () => {
  test.describe("on phones", () => {
    test.beforeEach(({ isMobile }) => {
      test.skip(!isMobile, "The bar is phone-only.");
    });

    for (const path of ["/", "/about", "/team", "/events", "/projects"]) {
      test(`${path} never shows two Join buttons at once`, async ({ page }) => {
        await page.goto(path);
        const height = await page.evaluate(
          () => document.documentElement.scrollHeight,
        );
        for (let top = 0; top < height; top += 400) {
          await scrollToY(page, top);
          const pageJoinInView = await page.evaluate(() =>
            [...document.querySelectorAll('main a[href="/join"]')].some(
              (link) => {
                const box = link.getBoundingClientRect();
                return box.bottom > 0 && box.top < window.innerHeight;
              },
            ),
          );
          if (pageJoinInView) await expect(bar(page)).toBeHidden();
          else await expect(bar(page)).toBeVisible();
        }
      });
    }

    test("goes to the Join page", async ({ page }) => {
      await page.goto("/events");
      await scrollToY(page, 600);
      await bar(page).getByRole("link", { name: "Join SoCET" }).click();
      await expect(page).toHaveURL(/\/join$/);
    });

    test("is not on the Join, Contact or event detail pages", async ({
      page,
    }) => {
      for (const path of [
        "/join",
        "/contact",
        "/events/2026-04-22-earth-day",
      ]) {
        await page.goto(path);
        await page.mouse.wheel(0, 600);
        await expect(bar(page)).toHaveCount(0);
      }
    });

    test("leaves room so it never covers the end of the page", async ({
      page,
    }) => {
      await page.goto("/events");
      // Retried, because the page can still jump back to the top while it
      // finishes loading. Measures how far the footer's bottom edge overlaps
      // the bar's spot at the bottom of the screen; 0 or less is clear.
      await expect
        .poll(() =>
          page.evaluate(() => {
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: "instant",
            });
            const barHeight =
              document.querySelector<HTMLElement>(
                "aside[data-shown]",
              )!.offsetHeight;
            return (
              document.querySelector("footer")!.getBoundingClientRect().bottom -
              (window.innerHeight - barHeight)
            );
          }),
        )
        .toBeLessThanOrEqual(0);
    });

    test("hides while typing in a form", async ({ page }) => {
      await page.goto("/");
      const email = page.getByRole("main").getByRole("textbox").first();
      test.skip(
        (await email.count()) === 0,
        "The newsletter form only shows when Mailchimp keys are set.",
      );
      await email.focus();
      await expect(bar(page)).toBeHidden();
    });
  });

  test("is hidden on desktop", async ({ page, isMobile }) => {
    test.skip(isMobile, "Desktop only.");
    await page.goto("/team");
    await expect(bar(page)).toBeHidden();
  });
});

test("footer, Join and Contact show the same social links", async ({
  page,
}) => {
  const expected = socialLinks.map((link) => link.label);
  for (const path of ["/join", "/contact"]) {
    await page.goto(path);
    const lists = page.getByRole("list", { name: "SoCET on social media" });
    await expect(lists).toHaveCount(2);
    for (const list of await lists.all()) {
      await expect(list.getByRole("link")).toHaveText(expected);
    }
  }
});
