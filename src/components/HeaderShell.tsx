"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

type Tone = "light" | "dark";

/**
 * Server-rendered guess at the tone under the header. Every page opens on the
 * dark PageHeader or hero except an event detail page, which opens on a light
 * band. The layout effect below corrects this on the client either way.
 */
function initialTone(pathname: string): Tone {
  return pathname.startsWith("/events/") ? "light" : "dark";
}

/**
 * The fixed, transparent header. It looks at whichever section is under its
 * vertical middle and switches to light text over dark sections (marked with
 * `data-tone="dark"`) and dark text everywhere else. Once the page scrolls it
 * gains a soft, blurred backdrop so links stay readable over content.
 */
export function HeaderShell({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const pathname = usePathname();
  // Server-rendered guess from the route, so the first paint is already right.
  const [tone, setTone] = useState<Tone>(() => initialTone(pathname));
  const [scrolled, setScrolled] = useState(false);

  // Layout effect so the right tone is set before paint (no flash on light pages).
  useLayoutEffect(() => {
    const header = ref.current;
    if (!header) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const y = header.offsetHeight / 2;
      const under = document
        .elementsFromPoint(window.innerWidth / 2, y)
        .find((el) => !header.contains(el));
      const section = under?.closest("[data-tone]");
      setTone(section?.getAttribute("data-tone") === "dark" ? "dark" : "light");
      setScrolled(window.scrollY > 8);
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
  }, [pathname]);

  const toneClass =
    tone === "dark"
      ? `tone-dark text-paper ${scrolled ? "bg-ink/70" : "bg-transparent"}`
      : `text-ink ${scrolled ? "bg-paper/80" : "bg-transparent"}`;

  return (
    <header
      ref={ref}
      data-header-tone={tone}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 motion-reduce:transition-none ${
        scrolled ? "backdrop-blur-md" : ""
      } ${toneClass}`}
    >
      {children}
    </header>
  );
}
