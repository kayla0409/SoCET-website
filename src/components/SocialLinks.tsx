import { socialLinks } from "@/lib/site";

/**
 * The club's social links (Discord, Instagram, LinkedIn), in one place so the
 * footer, Join and Contact pages always show the same set in the same order.
 * Callers pass the classes that fit their layout.
 */
export function SocialLinks({
  className,
  linkClassName,
  label = "SoCET on social media",
}: {
  className?: string;
  linkClassName?: string;
  /** Accessible name for the list, so screen readers can tell it apart. */
  label?: string;
}) {
  return (
    <ul aria-label={label} className={className}>
      {socialLinks.map((link) => (
        <li key={link.href}>
          <a href={link.href} className={linkClassName}>
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
