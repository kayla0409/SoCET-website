import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CONTACT_SUCCESS_MESSAGE } from "@/lib/contact";
import type { ContactState } from "@/server/contact";
import { ContactForm } from "./ContactForm";

afterEach(cleanup);

type Action = (state: ContactState, data: FormData) => Promise<ContactState>;

async function fillValid(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText("Name"), "Ana López");
  await user.type(screen.getByLabelText("Email"), "student@ucla.edu");
  await user.type(screen.getByLabelText("Subject"), "Site tours");
  await user.type(screen.getByLabelText("Message"), "Hello{Enter}there");
}

const sendButton = () => screen.getByRole("button", { name: "Send message" });

describe("ContactForm", () => {
  it("shows an error under each empty field and doesn't send", async () => {
    const user = userEvent.setup();
    const action = vi.fn<Action>();
    render(<ContactForm action={action} />);

    await user.click(sendButton());

    for (const [label, message] of [
      ["Name", "Enter your name."],
      ["Email", "Enter your email address."],
      ["Subject", "Enter a subject."],
      ["Message", "Enter a message."],
    ]) {
      const field = screen.getByLabelText(label);
      expect(field.getAttribute("aria-invalid")).toBe("true");
      const describedBy = field.getAttribute("aria-describedby") ?? "";
      expect(
        describedBy
          .split(" ")
          .map((id) => document.getElementById(id)?.textContent),
      ).toContain(message);
    }
    expect(screen.getByText("Check the highlighted fields.")).toBeTruthy();
    // Focus goes to the first field that needs fixing.
    expect(document.activeElement).toBe(screen.getByLabelText("Name"));
    expect(action).not.toHaveBeenCalled();
  });

  it("checks the email format before sending", async () => {
    const user = userEvent.setup();
    const action = vi.fn<Action>();
    render(<ContactForm action={action} />);

    await fillValid(user);
    await user.clear(screen.getByLabelText("Email"));
    await user.type(screen.getByLabelText("Email"), "not-an-email");
    await user.click(sendButton());

    expect(screen.getByText("Enter a valid email address.")).toBeTruthy();
    expect(action).not.toHaveBeenCalled();
  });

  it("replaces the form with a confirmation after a successful send", async () => {
    const user = userEvent.setup();
    const action = vi.fn<Action>(async (_, data) => {
      expect(data.get("name")).toBe("Ana López");
      expect(data.get("message")).toBe("Hello\nthere");
      return { status: "success", message: CONTACT_SUCCESS_MESSAGE };
    });
    render(<ContactForm action={action} />);

    await fillValid(user);
    await user.click(sendButton());

    const status = await screen.findByRole("status");
    expect(status.textContent).toBe(
      "Thanks, we received your message! Please give us 3–5 business days to get back to you.",
    );
    expect(screen.queryByLabelText("Name")).toBeNull();
    expect(action).toHaveBeenCalledOnce();

    // "Send another message" brings back an empty form.
    await user.click(
      screen.getByRole("button", { name: "Send another message" }),
    );
    const name = screen.getByLabelText("Name") as HTMLInputElement;
    expect(name.value).toBe("");
    expect(document.activeElement).toBe(name);
  });

  it("shows the error and keeps everything typed after a failed send", async () => {
    const user = userEvent.setup();
    const action = vi.fn<Action>(async () => ({
      status: "error",
      message: "We couldn't send your message. Please try again.",
      values: {
        name: "Ana López",
        email: "student@ucla.edu",
        subject: "Site tours",
        message: "Hello\nthere",
      },
    }));
    render(<ContactForm action={action} />);

    await fillValid(user);
    await user.click(sendButton());

    expect(
      await screen.findByText(
        "We couldn't send your message. Please try again.",
      ),
    ).toBeTruthy();
    expect((screen.getByLabelText("Name") as HTMLInputElement).value).toBe(
      "Ana López",
    );
    expect((screen.getByLabelText("Email") as HTMLInputElement).value).toBe(
      "student@ucla.edu",
    );
    expect((screen.getByLabelText("Subject") as HTMLInputElement).value).toBe(
      "Site tours",
    );
    expect(
      (screen.getByLabelText("Message") as HTMLTextAreaElement).value,
    ).toBe("Hello\nthere");
    // The send button is usable again.
    expect(sendButton().hasAttribute("disabled")).toBe(false);
  });
});
