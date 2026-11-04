import Image from "next/image";
import type { TeamMember } from "@/content/team";
import { site } from "@/lib/site";

/** "Jane Q. Doe" -> "JD". Used as the no-photo placeholder. */
export function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "";
  const first = parts[0][0];
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <li className="flex flex-col items-center rounded-2xl border border-border border-t-4 border-t-ucla-gold bg-surface p-6 text-center shadow-sm">
      {member.photo ? (
        <Image
          src={member.photo}
          alt={member.photoAlt ?? ""}
          width={160}
          height={160}
          sizes="160px"
          className="size-32 rounded-full object-cover"
        />
      ) : (
        // The name is right below, so the initials are decorative.
        <div
          aria-hidden="true"
          className="flex size-32 items-center justify-center rounded-full bg-accent-soft text-3xl font-bold text-accent"
        >
          {initials(member.name)}
        </div>
      )}
      <h3 className="mt-5 text-xl font-semibold">{member.name}</h3>
      <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-accent">
        {member.role}
      </p>
      {member.bio && <p className="mt-3 text-muted">{member.bio}</p>}
    </li>
  );
}

export function TeamGrid({ members }: { members: TeamMember[] }) {
  if (members.length === 0) {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-dashed border-border bg-surface p-8 text-center">
        <p className="text-lg font-semibold">
          Officer profiles are coming soon.
        </p>
        <p className="mt-3 text-muted">
          In the meantime, reach the officers at{" "}
          <a
            href={`mailto:${site.email}`}
            className="font-semibold text-accent underline decoration-2 underline-offset-4 hover:decoration-ucla-gold"
          >
            {site.email}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {members.map((member) => (
        <TeamMemberCard key={member.id} member={member} />
      ))}
    </ul>
  );
}
