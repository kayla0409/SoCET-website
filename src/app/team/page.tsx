import type { Metadata } from "next";
import Link from "next/link";
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
      <section
        aria-labelledby="team-heading"
        className="bg-ucla-blue-darkest py-16 text-white sm:py-20"
      >
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h1
            id="team-heading"
            className="text-4xl font-bold tracking-tight text-balance text-ucla-gold sm:text-5xl"
          >
            Meet the team
          </h1>
          <p className="mt-6 text-lg text-pretty text-white">
            SoCET is run by UCLA students who plan our events, site visits and
            speaker series.
          </p>
        </div>
      </section>

      <section
        aria-labelledby="officers-heading"
        className="bg-background py-16 sm:py-20"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2
            id="officers-heading"
            className="text-center text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Officers
          </h2>
          <div className="mt-10">
            <TeamGrid members={members} />
          </div>
          <p className="mt-12 text-center text-lg">
            Want to get involved?{" "}
            <Link
              href="/join"
              className="font-semibold text-accent underline decoration-2 underline-offset-4 hover:decoration-ucla-gold"
            >
              Join SoCET
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
