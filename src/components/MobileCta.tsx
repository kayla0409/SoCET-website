"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Pages whose own primary action would compete with the bar: the Join and
 * Contact forms, and an event's RSVP link.
 */
export function showsMobileCta(pathname: string): boolean {
  return !(
    pathname === "/join" ||
    pathname === "/contact" ||
    pathname.startsWith("/events/")
  );
}

/** Text inputs open the on-screen keyboard; the bar would sit on top of them. */
function isTextEntry(el: Element | null): boolean {
  if (!el) return false;
  if (el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement) {
    return true;
  }
  if (el instanceof HTMLInputElement) {
    return !["button", "submit", "reset", "checkbox", "radio"].includes(
      el.type,
    );
  }
  return (el as HTMLElement).isContentEditable === true;
}

/** Whether a Join link in the page itself (not the header) is on screen. */
function pageJoinLinkOnScreen(): boolean {
  return Array.from(document.querySelectorAll('main a[href="/join"]')).some(
    (link) => {
      const box = link.getBoundingClientRect();
      return box.width > 0 && box.bottom > 0 && box.top < window.innerHeight;
    },
  );
}

/**
 * IF-5: a phone-only bar that keeps "Join SoCET" within thumb reach.
 *
 * So a page never shows two Join buttons at once, the bar hides while any Join
 * link inside <main> is on screen (the home hero, the About page's closing
 * section). It also hides while someone is typing in a form, and the spacer
 * below makes room for it so it never covers the end of the footer.
 */
export function MobileCta() {
  const pathname = usePathname();
  const enabled = showsMobileCta(pathname);
  const [joinInView, setJoinInView] = useState(true);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    // Checked on scroll rather than with an IntersectionObserver, because
    // parts of a page stream in after this runs and would be missed.
    let frame = 0;
    const update = () => {
      frame = 0;
      setJoinInView(pageJoinLinkOnScreen());
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [enabled, pathname]);

  useEffect(() => {
    if (!enabled) return;
    const update = () => setTyping(isTextEntry(document.activeElement));
    document.addEventListener("focusin", update);
    document.addEventListener("focusout", update);
    update();
    return () => {
      document.removeEventListener("focusin", update);
      document.removeEventListener("focusout", update);
    };
  }, [enabled, pathname]);

  if (!enabled) return null;
  const shown = !joinInView && !typing;

  return (
    <>
      {/* Same height as the bar, so the last of the footer can scroll clear of it. */}
      <div aria-hidden="true" className="h-20 md:hidden" />
      <aside
        aria-label="Join SoCET"
        data-shown={shown}
        inert={!shown}
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/90 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md motion-safe:transition-[translate,visibility] motion-safe:duration-200 md:hidden ${
          shown ? "translate-y-0" : "invisible translate-y-full"
        }`}
      >
        <Link
          href="/join"
          className="btn-gold w-full justify-center py-3.5 text-sm"
        >
          Join SoCET
        </Link>
      </aside>
    </>
  );
}
