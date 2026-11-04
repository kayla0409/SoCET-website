import { expect, test } from "@playwright/test";
import { events } from "../src/content/events";

test.describe("events pages", () => {
  test("list loads with a heading and no errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));

    await page.goto("/events");

    await expect(page).toHaveTitle(/Events/);
    await expect(
      page.getByRole("heading", { level: 1, name: "Events" }),
    ).toBeVisible();
    expect(errors).toEqual([]);
  });

  test("is reachable from the main nav", async ({ page }) => {
    await page.goto("/");
    await page
      .getByRole("navigation", { name: "Main" })
      .getByRole("link", { name: "Events" })
      .click();
    await expect(page).toHaveURL(/\/events$/);
  });

  test("every event card opens its detail page", async ({ page }) => {
    for (const event of events) {
      await page.goto("/events");
      await page.getByRole("link", { name: event.title, exact: true }).click();
      await expect(page).toHaveURL(new RegExp(`/events/${event.id}$`));
      await expect(
        page.getByRole("heading", { level: 1, name: event.title }),
      ).toBeVisible();
    }
  });

  test("an event page has schema.org Event data", async ({ page }) => {
    test.skip(events.length === 0, "no events in the data file");
    await page.goto(`/events/${events[0].id}`);
    const json = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(JSON.parse(json ?? "{}")).toMatchObject({
      "@type": "Event",
      name: events[0].title,
    });
  });

  for (const slug of ["no-such-event", "%E0"]) {
    test(`an unknown event (${slug}) returns 404`, async ({ page }) => {
      const response = await page.goto(`/events/${slug}`);
      expect(response?.status()).toBe(404);
    });
  }

  for (const width of [393, 1280]) {
    test(`has no horizontal scroll at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      for (const path of [
        "/events",
        ...events.slice(0, 1).map((e) => `/events/${e.id}`),
      ]) {
        await page.goto(path);
        const overflow = await page.evaluate(
          () =>
            document.documentElement.scrollWidth -
            document.documentElement.clientWidth,
        );
        expect(overflow, path).toBeLessThanOrEqual(0);
      }
    });
  }
});
