import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { MailingListState } from "@/server/mailing-list";
import { MailingListForm } from "./MailingListForm";

afterEach(cleanup);

describe("MailingListForm", () => {
  it("sends the name and email and shows the confirmation message", async () => {
    const user = userEvent.setup();
    const action = vi.fn(
      async (
        _: MailingListState,
        data: FormData,
      ): Promise<MailingListState> => {
        expect(data.get("name")).toBe("Ana López");
        expect(data.get("email")).toBe("student@ucla.edu");
        return { status: "success", message: "Check your inbox to confirm." };
      },
    );
    render(<MailingListForm action={action} />);

    await user.type(screen.getByLabelText("Name"), "Ana López");
    await user.type(screen.getByLabelText("Email"), "student@ucla.edu");
    await user.click(
      screen.getByRole("button", { name: "Join the mailing list" }),
    );

    expect((await screen.findByRole("status")).textContent).toBe(
      "Check your inbox to confirm.",
    );
    expect(action).toHaveBeenCalledOnce();
  });

  it("marks invalid fields and links their error messages", async () => {
    const user = userEvent.setup();
    const action = async (): Promise<MailingListState> => ({
      status: "error",
      message: "Check the highlighted fields.",
      fieldErrors: { email: "Enter a valid email address." },
    });
    render(<MailingListForm action={action} />);

    await user.click(
      screen.getByRole("button", { name: "Join the mailing list" }),
    );

    const email = await screen.findByLabelText("Email");
    expect(email.getAttribute("aria-invalid")).toBe("true");
    expect(
      document.getElementById(email.getAttribute("aria-describedby") ?? "")
        ?.textContent,
    ).toBe("Enter a valid email address.");
    expect(screen.getByText("Check the highlighted fields.")).toBeTruthy();
  });

  it("keeps what the visitor typed and offers the Google Form on a server error", async () => {
    const user = userEvent.setup();
    const action = async (): Promise<MailingListState> => ({
      status: "error",
      message: "Something went wrong on our end. Please try again.",
      values: { name: "Ana López", email: "student@ucla.edu" },
      showFormFallback: true,
    });
    render(<MailingListForm action={action} />);

    await user.click(
      screen.getByRole("button", { name: "Join the mailing list" }),
    );

    expect(
      await screen.findByRole("link", { name: "join with our Google Form" }),
    ).toBeTruthy();
    expect((screen.getByLabelText("Email") as HTMLInputElement).value).toBe(
      "student@ucla.edu",
    );
    expect((screen.getByLabelText("Name") as HTMLInputElement).value).toBe(
      "Ana López",
    );
  });
});
