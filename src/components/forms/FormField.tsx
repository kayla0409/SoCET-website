import type { ChangeEventHandler } from "react";

/**
 * A labelled text input or textarea for forms on dark sections or cards.
 * The error (and optional hint) sit under the field and are linked with
 * aria-describedby; aria-invalid marks the field when there is an error.
 */
interface FormFieldProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  defaultValue?: string;
  error?: string;
  /** Short help text shown under the field. */
  hint?: string;
  maxLength?: number;
  /** Renders a multi-line textarea with this many rows. */
  rows?: number;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  className?: string;
}

const controlClass =
  "border bg-graphite px-4 py-3 text-paper transition-colors duration-200 placeholder:text-fog focus:border-gold";

export function FormField({
  id,
  name,
  label,
  type = "text",
  autoComplete,
  defaultValue,
  error,
  hint,
  maxLength,
  rows,
  onChange,
  className = "",
}: FormFieldProps) {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy =
    [error && errorId, hint && hintId].filter(Boolean).join(" ") || undefined;

  const shared = {
    id,
    name,
    required: true,
    autoComplete,
    defaultValue,
    maxLength,
    onChange,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy,
    className: `${controlClass} ${error ? "border-gold" : "border-border"}`,
  } as const;

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label htmlFor={id} className="eyebrow text-muted">
        {label}
      </label>
      {rows ? (
        <textarea
          {...shared}
          rows={rows}
          className={`${shared.className} resize-y`}
        />
      ) : (
        <input {...shared} type={type} />
      )}
      {error && (
        <p id={errorId} className="text-sm font-semibold text-gold">
          {error}
        </p>
      )}
      {hint && (
        <p id={hintId} className="text-xs text-muted">
          {hint}
        </p>
      )}
    </div>
  );
}