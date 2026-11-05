"use client";

import { useActionState, useId } from "react";
import { site } from "@/lib/site";
import type { MailingListState } from "@/server/mailing-list";

const initialState: MailingListState = { status: "idle", message: "" };

interface MailingListFormProps {
  action: (
    previous: MailingListState,
    formData: FormData,
  ) => Promise<MailingListState>;
}

export function MailingListForm({ action }: MailingListFormProps) {
  const [state, formAction, pending] = useActionState(action, initialState);
  const id = useId();
  const nameError = state.fieldErrors?.name;
  const emailError = state.fieldErrors?.email;

  if (state.status === "success") {
    return (
      <p
        role="status"
        className="mt-10 rounded-lg border border-lime/50 px-6 py-4 text-lg font-semibold text-lime"
      >
        {state.message}
      </p>
    );
  }

  return (
    <form
      action={formAction}
      noValidate
      className="mt-10 w-full max-w-xl text-left"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          id={`${id}-name`}
          name="name"
          label="Name"
          autoComplete="name"
          defaultValue={state.values?.name}
          error={nameError}
        />
        <Field
          id={`${id}-email`}
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
          defaultValue={state.values?.email}
          error={emailError}
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
        className="btn-lime mt-6 w-full justify-center hover:border-paper hover:bg-paper disabled:cursor-wait disabled:opacity-70 sm:w-auto"
      >
        {pending ? "Joining…" : "Join the mailing list"}
      </button>

      <p
        aria-live="polite"
        className="mt-4 min-h-6 text-sm font-semibold text-lime"
      >
        {state.status === "error" && (
          <>
            {state.message}
            {state.showFormFallback && (
              <>
                {" "}
                Or{" "}
                <a href={site.joinFormUrl} className="link-u">
                  join with our Google Form
                </a>
                .
              </>
            )}
          </>
        )}
      </p>
      <p className="mt-2 text-sm text-muted">
        We&apos;ll email you a link to confirm. We only use your email for SoCET
        news, and you can unsubscribe anytime.
      </p>
    </form>
  );
}

interface FieldProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  autoComplete: string;
  defaultValue?: string;
  error?: string;
}

function Field({
  id,
  name,
  label,
  type = "text",
  autoComplete,
  defaultValue,
  error,
}: FieldProps) {
  const errorId = `${id}-error`;
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="eyebrow text-muted">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`border bg-graphite px-4 py-3 text-paper transition-colors duration-200 placeholder:text-fog focus:border-lime ${
          error ? "border-lime" : "border-border"
        }`}
      />
      {error && (
        <p id={errorId} className="text-sm font-semibold text-lime">
          {error}
        </p>
      )}
    </div>
  );
}
