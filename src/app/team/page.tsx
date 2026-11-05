import type { Metadata } from "next";
import Link from "next/link";
import { TopoLines } from "@/components/decor/Decor";
import { TeamGrid } from "@/components/team/TeamGrid";
import { getTeam } from "@/server/content";

export const metadata: Metadata = {
  title: "Team",
  description: "Meet the student officers who run SoCET at UCLA.",
};

// Copy needs Niteesh's sign-off (PD-5). Officers come only from getTeam().
export default async function TeamPage() {
  const members = await getTeam();

  return (
    <>
      {/* Team opens near-black with contour lines and an oversized "team". */}
      <section
        aria-labelledby="team-heading"
        data-tone="dark"
        className="tone-dark relative isolate overflow-hidden bg-ink"
      >
        <TopoLines className="top-[-6rem] left-[-12rem] -z-10 w-[min(52rem,120vw)] opacity-60" />
        <div className="container-x flex flex-col items-end pt-40 pb-20 text-right sm:pt-52 sm:pb-28">
          <h1 id="team-heading" className="rise">
            <span className="display-md block text-paper">Meet the</span>{" "}
            <span className="display-xl block text-[clamp(5rem,17vw,13rem)] text-lime">
              team
            </span>
          </h1>
          <p className="lede rise mt-8 text-muted [--rise-delay:120ms]">
            SoCET is run by UCLA students who plan our events, site visits and
            speaker series.
          </p>
        </div>
      </section>

      <section
        aria-labelledby="officers-heading"
        className="section-y bg-background"
      >
        <div className="container-x">
          <h2 id="officers-heading" className="display-lg reveal">
            Officers
          </h2>
          <div className="mt-14">
            <TeamGrid members={members} />
          </div>
          <p className="mt-14 text-lg text-muted">
            Want to get involved?{" "}
            <Link href="/join" className="link-u">
              Join SoCET
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
