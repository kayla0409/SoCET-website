import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import type { TeamMember } from "@/content/team";
import { TeamGrid, initials } from "./TeamGrid";

afterEach(cleanup);

// Made-up people; no real personal data in fixtures.
const withPhoto: TeamMember = {
  id: "alex-example",
  name: "Alex Example",
  role: "President",
  bio: "Studies mechanical engineering.",
  photo: "/team/alex-example.jpg",
  photoAlt: "Alex Example in front of solar panels",
};

const withoutPhoto: TeamMember = {
  id: "sam-q-sample",
  name: "Sam Q. Sample",
  role: "Treasurer",
};

describe("initials", () => {
  it("uses the first and last name", () => {
    expect(initials("Sam Q. Sample")).toBe("SS");
    expect(initials("  alex   example ")).toBe("AE");
  });

  it("handles a single name", () => {
    expect(initials("Prince")).toBe("P");
  });
});

describe("TeamGrid", () => {
  it("lists officers in the order given, with name and role", () => {
    render(<TeamGrid members={[withPhoto, withoutPhoto]} />);

    const cards = screen.getAllByRole("listitem");
    expect(cards).toHaveLength(2);
    expect(
      within(cards[0]).getByRole("heading", { name: "Alex Example" }),
    ).toBeTruthy();
    expect(within(cards[0]).getByText("President")).toBeTruthy();
    expect(within(cards[0]).getByText(/mechanical engineering/)).toBeTruthy();
    expect(
      within(cards[1]).getByRole("heading", { name: "Sam Q. Sample" }),
    ).toBeTruthy();
  });

  it("shows the photo with its alt text", () => {
    render(<TeamGrid members={[withPhoto]} />);
    expect(
      screen.getByRole("img", {
        name: "Alex Example in front of solar panels",
      }),
    ).toBeTruthy();
  });

  it("shows hidden initials instead of a photo when there is none", () => {
    render(<TeamGrid members={[withoutPhoto]} />);
    expect(screen.queryByRole("img")).toBeNull();
    const placeholder = screen.getByText("SS");
    expect(placeholder.getAttribute("aria-hidden")).toBe("true");
  });

  it("shows a friendly empty state with the club email", () => {
    render(<TeamGrid members={[]} />);
    expect(screen.queryByRole("list")).toBeNull();
    expect(screen.getByText(/coming soon/i)).toBeTruthy();
    expect(
      screen
        .getByRole("link", { name: "socet.ucla@gmail.com" })
        .getAttribute("href"),
    ).toBe("mailto:socet.ucla@gmail.com");
  });
});
