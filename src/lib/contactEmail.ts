import type { ContactInput } from "./contact";

/** Server-only email settings, read from environment variables. */
export interface ContactEmailConfig {
  apiKey: string;
  /** Where messages go. Always from the environment, never from the form. */
  to: string;
  from: string;
}

export function getContactEmailConfig(
  env: Record<string, string | undefined> = process.env,
): ContactEmailConfig | null {
  const apiKey = env.RESEND_API_KEY?.trim();
  const to = env.CONTACT_TO_EMAIL?.trim();
  const from = env.CONTACT_FROM_EMAIL?.trim();
  if (!apiKey || !to || !from) return null;
  return { apiKey, to, from };
}

/** The email officers receive. Plain text, line breaks preserved. */
export function buildContactEmail(
  config: Pick<ContactEmailConfig, "to" | "from">,
  input: ContactInput,
) {
  return {
    from: config.from,
    to: config.to,
    replyTo: input.email,
    subject: `[SoCET Contact] ${input.subject}`,
    text: [
      `Name: ${input.name}`,
      `Email: ${input.email}`,
      `Subject: ${input.subject}`,
      "",
      "Message:",
      input.message,
      "",
      "--",
      "Sent from the contact form on the SoCET website. Reply to this email to answer the sender.",
    ].join("\n"),
  };
}
