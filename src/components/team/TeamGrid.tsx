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
    <li className="reveal tone-dark card-dark flex flex-col p-6 transition-transform duration-200 hover:-translate-y-1.5 sm:p-7">
      {member.photo ? (
        <Image
          src={member.photo}
          alt={member.photoAlt}
          width={160}
          height={160}
          sizes="160px"
          className="size-28 rounded-md object-cover grayscale transition duration-200 hover:grayscale-0"
        />
      ) : (
        // The name is right below, so the initials are decorative.
        <div
          aria-hidden="true"
          className="flex size-28 items-center justify-center rounded-md border border-lime/50 font-display text-4xl font-black tracking-tight text-lime"
        >
          {initials(member.name)}
        </div>
      )}
      <h3 className="mt-10 font-display text-2xl font-extrabold tracking-tight">
        {member.name}
      </h3>
      <p className="tag mt-3 self-start text-lime">{member.role}</p>
      {member.bio && (
        <p className="mt-4 leading-relaxed text-muted">{member.bio}</p>
      )}
    </li>
  );
}

export function TeamGrid({ members }: { members: TeamMember[] }) {
  if (members.length === 0) {
    return (
      <div className="tone-dark card-dark max-w-xl border border-olive p-8">
        <p className="font-display text-2xl font-extrabold tracking-tight">
          Officer profiles are coming soon.
        </p>
        <p className="mt-3 text-muted">
          In the meantime, reach the officers at{" "}
          <a href={`mailto:${site.email}`} className="link-u break-all">
            {site.email}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {members.map((member) => (
        <TeamMemberCard key={member.id} member={member} />
      ))}
    </ul>
  );
}
