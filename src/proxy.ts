import { type NextRequest, NextResponse } from "next/server";
import { getEvents } from "@/server/content";

/**
 * Sends a real HTTP 404 for unknown event slugs.
 *
 * /events/[slug] is partially prerendered, so by the time the page calls
 * notFound() the response has already started streaming with a 200. Checking
 * here, before the page renders, is the fix the Next.js docs recommend
 * (`dynamicParams = false` isn't available with Cache Components).
 *
 * When BE-3 moves events to the database, keep this check cheap: look up the
 * slug only, never load the full event.
 */
export async function proxy(request: NextRequest) {
  const slug = safeDecode(request.nextUrl.pathname.slice("/events/".length));
  const events = await getEvents();
  if (slug && events.some((event) => event.id === slug)) {
    return NextResponse.next();
  }

  // No route matches this path (folders starting with _ are private), so Next
  // renders the site's not-found page with a 404 status.
  return NextResponse.rewrite(new URL("/_event-not-found", request.url));
}

/** Malformed escapes like "%E0" can't be an event id, so treat them as unknown. */
function safeDecode(segment: string): string | undefined {
  try {
    return decodeURIComponent(segment);
  } catch {
    return undefined;
  }
}

export const config = {
  matcher: "/events/:slug",
};
