import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CONTACT_LIMITS, CONTACT_SUCCESS_MESSAGE } from "@/lib/contact";
import { sendContactMessage, type ContactState } from "./contact";

// Resend and the request headers are mocked: no real email is ever sent.
const mocks = vi.hoisted(() => ({
  send: vi.fn(),
  apiKeys: [] as string[],
  ip: "203.0.113.1",
}));

vi.mock("resend", () => ({
  Resend: class {
    emails = { send: mocks.send };
    constructor(apiKey: string) {
      mocks.apiKeys.push(apiKey);
    }
  },
}));

vi.mock("next/headers", () => ({
  headers: async () => new Headers({ "x-forwarded-for": mocks.ip }),
}));

const idle: ContactState = { status: "idle", message: "" };

const valid = {
  name: "Ana López",
  email: "student@ucla.edu",
  subject: "Site tour question",
  message: "Hi!\nIs the next tour open to first-years?\n\nThanks",
};

const form = (fields: Record<string, string>) => {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) data.set(key, value);
  return data;
};

// The rate limiter is per IP, so give every test its own visitor.
let visitor = 0;

beforeEach(() => {
  mocks.ip = `203.0.113.${++visitor}`;
  vi.stubEnv("RESEND_API_KEY", "re_test_key");
  vi.stubEnv("CONTACT_TO_EMAIL", "officers@example.org");
  vi.stubEnv("CONTACT_FROM_EMAIL", "SoCET Website <noreply@example.org>");
  mocks.send.mockResolvedValue({ data: { id: "email_1" }, error: null });
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
  mocks.send.mockReset();
  mocks.apiKeys.length = 0;
});

describe("sendContactMessage", () => {
  it("emails the officers and shows the confirmation", async () => {
    const state = await sendContactMessage(idle, form(valid));

    expect(state).toEqual({
      status: "success",
      message: CONTACT_SUCCESS_MESSAGE,
    });
    expect(mocks.apiKeys).toEqual(["re_test_key"]);
    expect(mocks.send).toHaveBeenCalledOnce();
    expect(mocks.send.mock.calls[0][0]).toEqual({
      from: "SoCET Website <noreply@example.org>",
      to: "officers@example.org",
      replyTo: "student@ucla.edu",
      subject: "[SoCET Contact] Site tour question",
      text: expect.stringContaining(
        "Name: Ana López\nEmail: student@ucla.edu\nSubject: Site tour question\n\nMessage:\nHi!\nIs the next tour open to first-years?\n\nThanks",
      ),
    });
  });

  it("always sends to CONTACT_TO_EMAIL, whatever the form says", async () => {
    await sendContactMessage(
      idle,
      form({ ...valid, to: "attacker@example.com", cc: "x@example.com" }),
    );

    const email = mocks.send.mock.calls[0][0];
    expect(email.to).toBe("officers@example.org");
    expect(JSON.stringify(email)).not.toContain("attacker@example.com");
  });

  it("trims input and keeps the message's line breaks", async () => {
    await sendContactMessage(
      idle,
      form({
        name: "  Ana  ",
        email: "  student@ucla.edu ",
        subject: "  Hello\nthere  ",
        message: "\n  Line one\r\nLine two  \n",
      }),
    );

    const email = mocks.send.mock.calls[0][0];
    expect(email.replyTo).toBe("student@ucla.edu");
    // Subjects are forced onto one line, since they go in an email header.
    expect(email.subject).toBe("[SoCET Contact] Hello there");
    expect(email.text).toContain("Name: Ana\n");
    expect(email.text).toContain("Message:\nLine one\nLine two\n");
  });

  it("rejects missing fields without sending", async () => {
    const state = await sendContactMessage(
      idle,
      form({ name: "", email: "", subject: " ", message: "\n" }),
    );

    expect(state.status).toBe("error");
    expect(state.fieldErrors).toEqual({
      name: "Enter your name.",
      email: "Enter your email address.",
      subject: "Enter a subject.",
      message: "Enter a message.",
    });
    expect(mocks.send).not.toHaveBeenCalled();
  });

  it("rejects an invalid email and keeps what was typed", async () => {
    const typed = { ...valid, email: "not-an-email" };
    const state = await sendContactMessage(idle, form(typed));

    expect(state.status).toBe("error");
    expect(state.fieldErrors).toEqual({
      email: "Enter a valid email address.",
    });
    expect(state.values).toEqual(typed);
    expect(mocks.send).not.toHaveBeenCalled();
  });

  it.each([
    ["name", "a".repeat(CONTACT_LIMITS.name + 1)],
    ["subject", "a".repeat(CONTACT_LIMITS.subject + 1)],
    ["message", "a".repeat(CONTACT_LIMITS.message + 1)],
    ["email", `${"a".repeat(CONTACT_LIMITS.email)}@ucla.edu`],
  ])("rejects an over-long %s", async (field, value) => {
    const state = await sendContactMessage(
      idle,
      form({ ...valid, [field]: value }),
    );

    expect(state.status).toBe("error");
    expect(Object.keys(state.fieldErrors ?? {})).toEqual([field]);
    expect(mocks.send).not.toHaveBeenCalled();
  });

  it("accepts a message right at the length limit", async () => {
    const state = await sendContactMessage(
      idle,
      form({ ...valid, message: "a".repeat(CONTACT_LIMITS.message) }),
    );
    expect(state.status).toBe("success");
  });

  it("pretends to succeed for honeypot submissions but sends nothing", async () => {
    const state = await sendContactMessage(
      idle,
      form({ ...valid, website: "spam.example" }),
    );

    expect(state).toEqual({
      status: "success",
      message: CONTACT_SUCCESS_MESSAGE,
    });
    expect(mocks.send).not.toHaveBeenCalled();
  });

  it("allows 3 messages per visitor, then blocks the 4th", async () => {
    for (let i = 0; i < 3; i++) {
      expect((await sendContactMessage(idle, form(valid))).status).toBe(
        "success",
      );
    }

    const blocked = await sendContactMessage(idle, form(valid));
    expect(blocked.status).toBe("error");
    expect(blocked.message).toMatch(/wait/i);
    expect(blocked.values).toEqual(valid);
    expect(mocks.send).toHaveBeenCalledTimes(3);

    // A different visitor is not affected.
    mocks.ip = "198.51.100.7";
    expect((await sendContactMessage(idle, form(valid))).status).toBe(
      "success",
    );
  });

  it("does not count failed sends against the visitor's limit", async () => {
    mocks.send.mockRejectedValue(new Error("network down"));
    for (let i = 0; i < 4; i++) {
      const state = await sendContactMessage(idle, form(valid));
      expect(state.message).toMatch(/couldn't send/i);
    }

    mocks.send.mockResolvedValue({ data: { id: "email_1" }, error: null });
    expect((await sendContactMessage(idle, form(valid))).status).toBe(
      "success",
    );
  });

  it("keeps what was typed when Resend returns an error", async () => {
    mocks.send.mockResolvedValue({
      data: null,
      error: { name: "validation_error", message: "Invalid `from` field." },
    });

    const state = await sendContactMessage(idle, form(valid));

    expect(state.status).toBe("error");
    expect(state.message).toMatch(/couldn't send/i);
    expect(state.values).toEqual(valid);
  });

  it("keeps what was typed when Resend can't be reached", async () => {
    mocks.send.mockRejectedValue(new Error("network down"));

    const state = await sendContactMessage(idle, form(valid));

    expect(state.status).toBe("error");
    expect(state.values).toEqual(valid);
  });

  it("shows an error and sends nothing when email isn't configured", async () => {
    vi.stubEnv("RESEND_API_KEY", "");

    const state = await sendContactMessage(idle, form(valid));

    expect(state.status).toBe("error");
    expect(state.values).toEqual(valid);
    expect(mocks.send).not.toHaveBeenCalled();
  });
});
