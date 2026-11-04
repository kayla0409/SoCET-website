import { describe, expect, it, vi } from "vitest";
import {
  getMailchimpConfig,
  splitName,
  subscribe,
  subscriberHash,
  type MailchimpConfig,
} from "./mailchimp";

const config: MailchimpConfig = {
  apiKey: "abc123-us21",
  audienceId: "list42",
  serverPrefix: "us21",
};

const jsonResponse = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status });

describe("getMailchimpConfig", () => {
  it("reads the data center from the API key", () => {
    expect(
      getMailchimpConfig({
        MAILCHIMP_API_KEY: "abc123-us21",
        MAILCHIMP_AUDIENCE_ID: "list42",
      }),
    ).toEqual(config);
  });

  it("returns null when keys are missing", () => {
    expect(getMailchimpConfig({ MAILCHIMP_API_KEY: "abc123-us21" })).toBeNull();
    expect(getMailchimpConfig({})).toBeNull();
  });
});

describe("subscriberHash", () => {
  it("hashes the lowercased, trimmed email", () => {
    expect(subscriberHash("  Student@UCLA.edu ")).toBe(
      "43c1916025ac74a7775217606230f226",
    );
  });
});

describe("splitName", () => {
  it("puts the first word in FNAME and the rest in LNAME", () => {
    expect(splitName("Ana María López")).toEqual({
      FNAME: "Ana",
      LNAME: "María López",
    });
    expect(splitName("Kayla")).toEqual({ FNAME: "Kayla", LNAME: "" });
  });
});

describe("subscribe", () => {
  it("PUTs a pending member to the audience", async () => {
    const fetchMock = vi.fn<typeof fetch>(async () =>
      jsonResponse(200, { status: "pending" }),
    );

    const result = await subscribe(
      config,
      { email: "student@ucla.edu", name: "Ana López" },
      fetchMock,
    );

    expect(result).toEqual({ kind: "pending" });
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe(
      "https://us21.api.mailchimp.com/3.0/lists/list42/members/43c1916025ac74a7775217606230f226",
    );
    expect(init?.method).toBe("PUT");
    expect(JSON.parse(String(init?.body))).toEqual({
      email_address: "student@ucla.edu",
      status_if_new: "pending",
      merge_fields: { FNAME: "Ana", LNAME: "López" },
    });
  });

  it.each([
    [200, { status: "subscribed" }, "already-subscribed"],
    [200, { status: "unsubscribed" }, "cannot-resubscribe"],
    [400, { title: "Member In Compliance State" }, "cannot-resubscribe"],
    [400, { title: "Forgotten Email Not Subscribed" }, "cannot-resubscribe"],
    [400, { title: "Invalid Resource" }, "invalid-email"],
    [401, { title: "API Key Invalid" }, "error"],
    [500, {}, "error"],
  ])("maps HTTP %i %j to %s", async (status, body, kind) => {
    const fetchMock = vi.fn<typeof fetch>(async () =>
      jsonResponse(status, body),
    );
    const result = await subscribe(
      config,
      { email: "student@ucla.edu", name: "Ana" },
      fetchMock,
    );
    expect(result.kind).toBe(kind);
  });

  it("treats a network failure as an error", async () => {
    const fetchMock = vi.fn<typeof fetch>(async () => {
      throw new TypeError("fetch failed");
    });
    const result = await subscribe(
      config,
      { email: "student@ucla.edu", name: "Ana" },
      fetchMock,
    );
    expect(result.kind).toBe("error");
  });
});
