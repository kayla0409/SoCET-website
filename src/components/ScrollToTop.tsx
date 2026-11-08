"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Next.js keeps the scroll position on navigation while the new page is still
 * in view, so clicking a nav link from partway down a page could land below
 * the new page's header. This jumps to the top whenever the path changes,
 * unless the link points at a section (#hash), which the browser handles.
 */
export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.location.hash) return;
    // "instant" skips the site-wide smooth scrolling for this jump.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
