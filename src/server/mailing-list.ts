"use server";

import { z } from "zod";
import { getMailchimpConfig, subscribe } from "@/lib/mailchimp";

export interface MailingListState {
  status: "idle" | "success" | "error";
  message: string;
  /** Field-level errors, keyed by input name. */
  fieldErrors?: Partial<Record<"name" | "email", string>>;
  /** What the visitor typed, so the form can refill after an error. */
  values?: { name: string; email: string };
  /** Offer the Google Form when the problem is on our side. */
  showFormFallback?: boolean;
}

const signupSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Enter your name.")
    .max(100, "Keep your name under 100 characters."),
  email: z
    .string()
    .trim()
    .max(254, "That email address is too long.")
    .pipe(z.email("Enter a valid email address.")),
});

const GENERIC_ERROR = "Something went wrong on our end. Please try again.";

export async function joinMailingList(
  _previous: MailingListState,
  formData: FormData,
): Promise<MailingListState> {
  // Honeypot: real visitors never see or fill this field. Pretend it worked.
  if (formData.get("website")) {
    return { status: "success", message: "Thanks! Check your inbox." };
  }

  const values = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
  };
  const parsed = signupSchema.safeParse(values);
  if (!parsed.success) {
    const fieldErrors: MailingListState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if ((field === "name" || field === "email") && !fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    }
    return {
      status: "error",
      message: "Check the highlighted fields.",
      fieldErrors,
      values,
    };
  }

  const config = getMailchimpConfig();
  if (!config) {
    return {
      status: "error",
      message: GENERIC_ERROR,
      values,
      showFormFallback: true,
    };
  }

  const result = await subscribe(config, parsed.data);
  switch (result.kind) {
    case "pending":
      return {
        status: "success",
        message:
          "Almost done! Check your inbox and click the link to confirm your subscription.",
      };
    case "already-subscribed":
      return {
        status: "success",
        message: "You're already on the list. See you soon!",
      };
    case "cannot-resubscribe":
      return {
        status: "error",
        message:
          "That address unsubscribed before, so we can't re-add it here. Email socet.ucla@gmail.com and we'll help.",
        values,
      };
    case "invalid-email":
      return {
        status: "error",
        message: "We couldn't add that address.",
        fieldErrors: { email: "Check the address and try again." },
        values,
      };
    case "error":
      return {
        status: "error",
        message: GENERIC_ERROR,
        values,
        showFormFallback: true,
      };
  }
}
