"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Next.js only scrolls on navigation when the new page's top is out of view,
 * so clicking a nav link from partway down a page could land below the new
 * page's header. This jumps to the top when a link changes the path.
 *
 * It skips the first load (the browser restores or honours the URL itself),
 * back/forward navigation (so scroll restoration keeps working) and links that
 * point at a section (#hash), which the browser handles.
 */
export function ScrollToTop() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);
  const isHistoryNav = useRef(false);

  useEffect(() => {
    const onPopState = () => {
      isHistoryNav.current = true;
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (isHistoryNav.current) {
      isHistoryNav.current = false;
      return;
    }
    if (window.location.hash) return;
    // "instant" skips the site-wide smooth scrolling for this jump.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
