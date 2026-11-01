import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { joinMailingList, type MailingListState } from "./mailing-list";

const idle: MailingListState = { status: "idle", message: "" };

const form = (fields: Record<string, string>) => {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) data.set(key, value);
  return data;
};

const fetchMock = vi.fn<typeof fetch>();

beforeEach(() => {
  vi.stubEnv("MAILCHIMP_API_KEY", "abc123-us21");
  vi.stubEnv("MAILCHIMP_AUDIENCE_ID", "list42");
  vi.stubGlobal("fetch", fetchMock);
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  fetchMock.mockReset();
});

describe("joinMailingList", () => {
  it("asks the visitor to confirm by email after a new signup", async () => {
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify({ status: "pending" }), { status: 200 }),
    );

    const state = await joinMailingList(
      idle,
      form({ name: "Ana López", email: "student@ucla.edu" }),
    );

    expect(state.status).toBe("success");
    expect(state.message).toMatch(/check your inbox/i);
    expect(fetchMock).toHaveBeenCalledOnce();
  });

  it("returns field errors without calling Mailchimp", async () => {
    const state = await joinMailingList(
      idle,
      form({ name: " ", email: "not-an-email" }),
    );

    expect(state.status).toBe("error");
    expect(state.fieldErrors).toEqual({
      name: "Enter your name.",
      email: "Enter a valid email address.",
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("silently accepts honeypot submissions without calling Mailchimp", async () => {
    const state = await joinMailingList(
      idle,
      form({ name: "Bot", email: "bot@example.com", website: "spam.example" }),
    );

    expect(state.status).toBe("success");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("shows a friendly error when Mailchimp isn't configured", async () => {
    vi.stubEnv("MAILCHIMP_API_KEY", "");

    const state = await joinMailingList(
      idle,
      form({ name: "Ana", email: "student@ucla.edu" }),
    );

    expect(state.status).toBe("error");
    expect(state.showFormFallback).toBe(true);
    expect(state.values).toEqual({ name: "Ana", email: "student@ucla.edu" });
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
