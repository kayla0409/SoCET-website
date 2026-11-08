import { z } from "zod";

/**
 * Contact form rules, shared by the browser (fast feedback) and the server
 * action (the real check). Nothing in this file is secret.
 */
export const CONTACT_LIMITS = {
  name: 100,
  email: 254,
  subject: 150,
  message: 5000,
} as const;

export type ContactField = keyof typeof CONTACT_LIMITS;

export const CONTACT_SUCCESS_MESSAGE =
  "Thanks, we received your message! Please give us 3–5 business days to get back to you.";

export const CONTACT_FIELDS = Object.keys(CONTACT_LIMITS) as ContactField[];

/** Collapses runs of whitespace (including line breaks) to single spaces. */
const singleLine = (value: string) => value.replace(/\s+/g, " ").trim();

export const contactSchema = z.object({
  name: z
    .string()
    .transform(singleLine)
    .pipe(
      z
        .string()
        .min(1, "Enter your name.")
        .max(
          CONTACT_LIMITS.name,
          `Keep your name under ${CONTACT_LIMITS.name} characters.`,
        ),
    ),
  email: z
    .string()
    .trim()
    .max(CONTACT_LIMITS.email, "That email address is too long.")
    .pipe(
      z
        .string()
        .min(1, "Enter your email address.")
        .pipe(z.email("Enter a valid email address.")),
    ),
  // One line only: it becomes part of the email's subject header.
  subject: z
    .string()
    .transform(singleLine)
    .pipe(
      z
        .string()
        .min(1, "Enter a subject.")
        .max(
          CONTACT_LIMITS.subject,
          `Keep the subject under ${CONTACT_LIMITS.subject} characters.`,
        ),
    ),
  // Line breaks are kept (normalized to \n) so the email reads as typed.
  message: z
    .string()
    .transform((value) => value.replace(/\r\n?/g, "\n").trim())
    .pipe(
      z
        .string()
        .min(1, "Enter a message.")
        .max(
          CONTACT_LIMITS.message,
          `Keep your message under ${CONTACT_LIMITS.message.toLocaleString("en-US")} characters.`,
        ),
    ),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactValues = Record<ContactField, string>;
export type ContactFieldErrors = Partial<Record<ContactField, string>>;

/** Reads the contact fields out of a form, as plain strings. */
export function readContactValues(data: {
  get(name: string): FormDataEntryValue | null;
}): ContactValues {
  return Object.fromEntries(
    CONTACT_FIELDS.map((field) => [field, String(data.get(field) ?? "")]),
  ) as ContactValues;
}

/** Validates raw values. Returns the cleaned data or one error per field. */
export function validateContact(
  values: ContactValues,
):
  | { ok: true; data: ContactInput }
  | { ok: false; fieldErrors: ContactFieldErrors } {
  const parsed = contactSchema.safeParse(values);
  if (parsed.success) return { ok: true, data: parsed.data };
  const fieldErrors: ContactFieldErrors = {};
  for (const issue of parsed.error.issues) {
    const field = issue.path[0] as ContactField;
    if (CONTACT_FIELDS.includes(field) && !fieldErrors[field]) {
      fieldErrors[field] = issue.message;
    }
  }
  return { ok: false, fieldErrors };
}