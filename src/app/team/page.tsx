import type { Metadata } from "next";
import Link from "next/link";
import { TeamGrid } from "@/components/team/TeamGrid";
import { getTeam } from "@/server/content";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Team",
  description: "Meet the student officers who run SoCET at UCLA.",
};

// Copy needs Niteesh's sign-off (PD-5). Officers come only from getTeam().
export default async function TeamPage() {
  const members = await getTeam();

  return (
    <>
      <PageHeader
        id="team-heading"
        title={
          <>
            Meet the <span className="text-gold">team</span>
          </>
        }
        lede="SoCET is run by UCLA students who plan our events, site visits and speaker series."
      />

      <section
        aria-labelledby="officers-heading"
        className="section-y bg-background"
      >
        <div className="container-x">
          <h2 id="officers-heading" className="display-lg reveal">
            Officers
          </h2>
          <div className="mt-9">
            <TeamGrid members={members} />
          </div>
          <p className="mt-9 text-lg text-muted">
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
