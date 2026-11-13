import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MobileCta, showsMobileCta } from "./MobileCta";

let pathname = "/about";
vi.mock("next/navigation", () => ({ usePathname: () => pathname }));

beforeEach(() => {
  pathname = "/about";
});

afterEach(() => {
  cleanup();
  document.body.innerHTML = "";
});

function bar() {
  return screen.queryByRole("complementary", {
    name: "Join SoCET",
    hidden: true,
  });
}

describe("showsMobileCta", () => {
  it("skips pages with their own primary action", () => {
    expect(showsMobileCta("/join")).toBe(false);
    expect(showsMobileCta("/contact")).toBe(false);
    expect(showsMobileCta("/events/2026-04-22-earth-day")).toBe(false);
  });

  it("shows on the other pages", () => {
    for (const path of ["/", "/about", "/events", "/team", "/projects"]) {
      expect(showsMobileCta(path)).toBe(true);
    }
  });
});

describe("MobileCta", () => {
  it("renders nothing on the Join page", () => {
    pathname = "/join";
    render(<MobileCta />);
    expect(bar()).toBeNull();
  });

  it("shows a Join SoCET link when no other Join link is on the page", () => {
    render(<MobileCta />);
    expect(bar()?.getAttribute("data-shown")).toBe("true");
    expect(
      screen.getByRole("link", { name: "Join SoCET" }).getAttribute("href"),
    ).toBe("/join");
  });

  it("hides while the page's own Join link is on screen", async () => {
    render(
      <>
        <main>
          <a href="/join">Join SoCET</a>
        </main>
        <MobileCta />
      </>,
    );
    const pageJoin = screen.getByRole("main").querySelector("a")!;
    const placeAt = async (top: number) => {
      pageJoin.getBoundingClientRect = () =>
        ({ top, bottom: top + 40, width: 120 }) as DOMRect;
      await act(async () => {
        window.dispatchEvent(new Event("scroll"));
        await new Promise((resolve) => requestAnimationFrame(resolve));
      });
    };

    await placeAt(100);
    expect(bar()?.getAttribute("data-shown")).toBe("false");
    expect(bar()?.hasAttribute("inert")).toBe(true);

    await placeAt(window.innerHeight + 200);
    expect(bar()?.getAttribute("data-shown")).toBe("true");
    expect(bar()?.hasAttribute("inert")).toBe(false);
  });

  it("hides while someone is typing in a form", () => {
    render(
      <>
        <input aria-label="Email" type="email" />
        <MobileCta />
      </>,
    );
    const input = screen.getByRole("textbox", { name: "Email" });
    act(() => input.focus());
    expect(bar()?.getAttribute("data-shown")).toBe("false");
    act(() => input.blur());
    expect(bar()?.getAttribute("data-shown")).toBe("true");
  });
});
