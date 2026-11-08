import type { ReactNode } from "react";
import { CircuitLines } from "@/components/decor/Decor";

interface PageHeaderProps {
  /** id for the h1, referenced by the section's aria-labelledby. */
  id: string;
  /** The page title. Wrap a word in <span className="text-gold"> to accent it. */
  title: ReactNode;
  /** One or two sentences shown beside the title, behind a gold rule. */
  lede: ReactNode;
}

/**
 * The shared top of every inner page: near-black with circuit traces in the
 * lower-left corner, the title on the left and a short lede on the right.
 * On wide screens the title column sizes to the title so even the longest
 * one ("Learn, connect, get involved") stays on one line. A faint bottom
 * rule separates it from a following dark section (as on Join). A minimum
 * height (matching About, whose lede is longest) keeps every header the same
 * size, with the content sitting at the bottom.
 */
export function PageHeader({ id, title, lede }: PageHeaderProps) {
  return (
    <section
      aria-labelledby={id}
      data-tone="dark"
      className="tone-dark relative isolate flex min-h-[23.75rem] flex-col justify-end overflow-hidden border-b border-paper/10 bg-ink md:min-h-[22.75rem] lg:min-h-[20rem]"
    >
      <CircuitLines className="bottom-[-5rem] left-[-6rem] -z-10 w-[min(38rem,90vw)] opacity-35" />
      <div className="container-x grid w-full gap-10 pt-32 pb-12 sm:pt-36 sm:pb-16 md:grid-cols-[3fr_2fr] md:items-end lg:grid-cols-[auto_minmax(18rem,1fr)]">
        <h1
          id={id}
          className="display-xl rise text-[clamp(2.25rem,4vw,3rem)] text-paper lg:whitespace-nowrap"
        >
          {title}
        </h1>
        <p className="lede rise border-l-2 border-gold pl-6 text-muted [--rise-delay:120ms] lg:justify-self-end">
          {lede}
        </p>
      </div>
    </section>
  );
}
