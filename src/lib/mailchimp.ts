import { createHash } from "node:crypto";

/** Server-only Mailchimp settings, read from environment variables. */
export interface MailchimpConfig {
  apiKey: string;
  audienceId: string;
  /** Data center, e.g. "us21". The part of the API key after the dash. */
  serverPrefix: string;
}

export function getMailchimpConfig(
  env: Record<string, string | undefined> = process.env,
): MailchimpConfig | null {
  const apiKey = env.MAILCHIMP_API_KEY?.trim();
  const audienceId = env.MAILCHIMP_AUDIENCE_ID?.trim();
  if (!apiKey || !audienceId) return null;
  const serverPrefix =
    env.MAILCHIMP_SERVER_PREFIX?.trim() || apiKey.split("-").at(1);
  if (!serverPrefix) return null;
  return { apiKey, audienceId, serverPrefix };
}

/** Mailchimp identifies a member by the MD5 of their lowercased email. */
export function subscriberHash(email: string): string {
  return createHash("md5").update(email.trim().toLowerCase()).digest("hex");
}

export function splitName(name: string): { FNAME: string; LNAME: string } {
  const [first = "", ...rest] = name.trim().split(/\s+/);
  return { FNAME: first, LNAME: rest.join(" ") };
}

export type SubscribeResult =
  /** New signup; Mailchimp has sent a confirmation email. */
  | { kind: "pending" }
  /** Already confirmed and on the list. */
  | { kind: "already-subscribed" }
  /** Unsubscribed or bounced before; the API can't re-add them. */
  | { kind: "cannot-resubscribe" }
  /** Mailchimp rejected the address (fake, role or malformed). */
  | { kind: "invalid-email" }
  | { kind: "error" };

/**
 * Adds someone to the audience with double opt-in: new members start as
 * "pending" and only join once they click the link Mailchimp emails them.
 * Uses PUT so a repeat signup updates the member instead of failing.
 */
export async function subscribe(
  config: MailchimpConfig,
  { email, name }: { email: string; name: string },
  fetchImpl: typeof fetch = fetch,
): Promise<SubscribeResult> {
  const url = `https://${config.serverPrefix}.api.mailchimp.com/3.0/lists/${config.audienceId}/members/${subscriberHash(email)}`;
  const auth = Buffer.from(`socet:${config.apiKey}`).toString("base64");

  let response: Response;
  try {
    response = await fetchImpl(url, {
      method: "PUT",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: email,
        status_if_new: "pending",
        merge_fields: splitName(name),
      }),
      signal: AbortSignal.timeout(8000),
    });
  } catch {
    return { kind: "error" };
  }

  const body = (await response.json().catch(() => ({}))) as {
    status?: unknown;
    title?: unknown;
  };

  if (response.ok) {
    switch (body.status) {
      case "pending":
        return { kind: "pending" };
      case "subscribed":
        return { kind: "already-subscribed" };
      case "unsubscribed":
      case "cleaned":
        return { kind: "cannot-resubscribe" };
      default:
        return { kind: "error" };
    }
  }

  if (response.status === 400) {
    if (
      body.title === "Forgotten Email Not Subscribed" ||
      body.title === "Member In Compliance State"
    ) {
      return { kind: "cannot-resubscribe" };
    }
    if (body.title === "Invalid Resource") return { kind: "invalid-email" };
  }
  return { kind: "error" };
}
