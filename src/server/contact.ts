"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import {
  CONTACT_SUCCESS_MESSAGE,
  validateContact,
  type ContactFieldErrors,
  type ContactValues,
} from "@/lib/contact";
import { buildContactEmail, getContactEmailConfig } from "@/lib/contactEmail";
import { clientIp, createRateLimiter } from "@/lib/rateLimit";
import { site } from "@/lib/site";

export interface ContactState {
  status: "idle" | "success" | "error";
  message: string;
  /** Field-level errors, keyed by input name. */
  fieldErrors?: ContactFieldErrors;
  /** What the visitor typed, so the form can refill after an error. */
  values?: ContactValues;
}

const SEND_ERROR = `We couldn't send your message. Please try again in a few minutes, or email us at ${site.email}.`;

// 3 messages per visitor IP per 10 minutes. See rateLimit.ts for the limits
// of an in-memory limiter.
const limiter = createRateLimiter({ limit: 3, windowMs: 10 * 60 * 1000 });

export async function sendContactMessage(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot: real visitors never see or fill this field. Pretend it worked.
  if (formData.get("website")) {
    return { status: "success", message: CONTACT_SUCCESS_MESSAGE };
  }

  const values: ContactValues = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    subject: String(formData.get("subject") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  const result = validateContact(values);
  if (!result.ok) {
    return {
      status: "error",
      message: "Check the highlighted fields.",
      fieldErrors: result.fieldErrors,
      values,
    };
  }

  const { allowed } = limiter.check(clientIp(await headers()));
  if (!allowed) {
    return {
      status: "error",
      message:
        "You've sent several messages in a short time. Please wait about 10 minutes and try again.",
      values,
    };
  }

  const config = getContactEmailConfig();
  if (!config) {
    console.error(
      "Contact form: RESEND_API_KEY, CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL is not set.",
    );
    return { status: "error", message: SEND_ERROR, values };
  }

  try {
    const resend = new Resend(config.apiKey);
    const { error } = await resend.emails.send(
      buildContactEmail(config, result.data),
    );
    if (error) {
      // Log the failure type only; never the visitor's details.
      console.error(`Contact form: Resend error (${error.name}).`);
      return { status: "error", message: SEND_ERROR, values };
    }
  } catch {
    console.error("Contact form: could not reach Resend.");
    return { status: "error", message: SEND_ERROR, values };
  }

  return { status: "success", message: CONTACT_SUCCESS_MESSAGE };
}
