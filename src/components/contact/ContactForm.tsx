"use client";

import {
  useActionState,
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { FormField } from "@/components/forms/FormField";
import {
  CONTACT_FIELDS,
  CONTACT_LIMITS,
  readContactValues,
  validateContact,
  type ContactField,
  type ContactFieldErrors,
} from "@/lib/contact";
import type { ContactState } from "@/server/contact";

const initialState: ContactState = { status: "idle", message: "" };

type ContactAction = (
  previous: ContactState,
  formData: FormData,
) => Promise<ContactState>;

/**
 * The contact form. "Send another message" remounts the inner form with a new
 * key, which gives it a fresh action state and empty fields.
 */
export function ContactForm({ action }: { action: ContactAction }) {
  const [round, setRound] = useState(0);
  return (
    <ContactFormRound
      key={round}
      action={action}
      focusOnMount={round > 0}
      onSendAnother={() => setRound((n) => n + 1)}
    />
  );
}

function ContactFormRound({
  action,
  focusOnMount,
  onSendAnother,
}: {
  action: ContactAction;
  focusOnMount: boolean;
  onSendAnother: () => void;
}) {
  const [state, formAction, pending] = useActionState(action, initialState);
  const id = useId();
  const fieldId = (field: ContactField) => `${id}-${field}`;

  // Errors found in the browser before sending. `null` means "show whatever
  // the server said"; it is reset on every submit that goes to the server.
  const [clientErrors, setClientErrors] = useState<ContactFieldErrors | null>(
    null,
  );
  const [clientMessage, setClientMessage] = useState<string | null>(null);

  const statusRef = useRef<HTMLParagraphElement>(null);
  const successRef = useRef<HTMLParagraphElement>(null);

  const fieldErrors = clientErrors ?? state.fieldErrors ?? {};
  const statusMessage =
    clientMessage ?? (state.status === "error" ? state.message : "");

  // After "Send another message", put the visitor back in the first field.
  useEffect(() => {
    if (focusOnMount) document.getElementById(fieldId("name"))?.focus();
    // Runs once per round; fieldId is stable for this mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When the server answers, move focus somewhere useful for keyboard and
  // screen reader users: the confirmation, the first bad field, or the error.
  useEffect(() => {
    if (state.status === "success") {
      successRef.current?.focus();
    } else if (state.status === "error") {
      const first = CONTACT_FIELDS.find((field) => state.fieldErrors?.[field]);
      if (first) document.getElementById(fieldId(first))?.focus();
      else statusRef.current?.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-start">
        <p
          ref={successRef}
          role="status"
          tabIndex={-1}
          className="font-display text-2xl leading-snug font-extrabold tracking-tight text-lime sm:text-3xl"
        >
          {state.message}
        </p>
        <button
          type="button"
          onClick={onSendAnother}
          className="btn-outline mt-10 text-paper hover:border-lime hover:bg-lime hover:text-ink"
        >
          Send another message
        </button>
      </div>
    );
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const data = new FormData(event.currentTarget);
    const result = validateContact(readContactValues(data));
    if (!result.ok) {
      // Stop here: no request is sent until the fields look right.
      event.preventDefault();
      setClientErrors(result.fieldErrors);
      setClientMessage("Check the highlighted fields.");
      const first = CONTACT_FIELDS.find((field) => result.fieldErrors[field]);
      if (first) document.getElementById(fieldId(first))?.focus();
      return;
    }
    setClientErrors(null);
    setClientMessage(null);
  };

  // Typing in a field clears that field's error.
  const clearError = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const field = event.target.name as ContactField;
    if (!fieldErrors[field]) return;
    const rest = { ...fieldErrors };
    delete rest[field];
    setClientErrors(rest);
  };

  const field = (name: ContactField) => ({
    id: fieldId(name),
    name,
    defaultValue: state.values?.[name],
    error: fieldErrors[name],
    maxLength: CONTACT_LIMITS[name],
    onChange: clearError,
  });

  return (
    <form action={formAction} onSubmit={handleSubmit} noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField {...field("name")} label="Name" autoComplete="name" />
        <FormField
          {...field("email")}
          label="Email"
          type="email"
          autoComplete="email"
        />
        <FormField
          {...field("subject")}
          label="Subject"
          autoComplete="off"
          className="sm:col-span-2"
        />
        <FormField
          {...field("message")}
          label="Message"
          rows={7}
          hint={`Up to ${CONTACT_LIMITS.message.toLocaleString("en-US")} characters.`}
          className="sm:col-span-2"
        />
      </div>

      {/* Honeypot for bots. Hidden from people and screen readers. */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-px w-px overflow-hidden"
      >
        <label htmlFor={`${id}-website`}>Website</label>
        <input
          id={`${id}-website`}
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        aria-disabled={pending}
        className="btn-lime mt-8 w-full justify-center hover:border-paper hover:bg-paper disabled:cursor-wait disabled:opacity-70 sm:w-auto"
      >
        {pending ? "Sending…" : "Send message"}
      </button>

      <p
        ref={statusRef}
        tabIndex={-1}
        aria-live="polite"
        className="mt-4 min-h-6 text-sm font-semibold text-lime"
      >
        {statusMessage}
      </p>
    </form>
  );
}
