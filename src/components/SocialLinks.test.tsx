import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { socialLinks } from "@/lib/site";
import { SocialLinks } from "./SocialLinks";

afterEach(cleanup);

describe("SocialLinks", () => {
  it("lists every social link from site.ts, in order", () => {
    render(<SocialLinks />);
    const list = screen.getByRole("list", { name: "SoCET on social media" });
    const links = within(list).getAllByRole("link");
    expect(links.map((link) => link.textContent)).toEqual(
      socialLinks.map((link) => link.label),
    );
    expect(links.map((link) => link.getAttribute("href"))).toEqual(
      socialLinks.map((link) => link.href),
    );
  });

  it("applies the caller's classes", () => {
    render(<SocialLinks className="row" linkClassName="link-u" />);
    expect(screen.getByRole("list").className).toBe("row");
    for (const link of screen.getAllByRole("link")) {
      expect(link.className).toBe("link-u");
    }
  });
});
