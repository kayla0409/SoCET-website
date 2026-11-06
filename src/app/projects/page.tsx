import type { Metadata } from "next";
import Link from "next/link";
import type { Project } from "@/content/projects";
import { site } from "@/lib/site";
import { getProjects } from "@/server/content";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Projects by SoCET members at UCLA: hands-on clean energy and climate work across majors.",
};

// Copy needs officer sign-off (CP-4.1). Projects come only from getProjects().
export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      {/* Projects opens on solid lime with ink type and a big counter. */}
      <section
        aria-labelledby="projects-heading"
        className="relative overflow-hidden bg-lime text-ink"
      >
        <div className="container-x grid gap-10 pt-40 pb-20 sm:pt-52 sm:pb-24 md:grid-cols-[3fr_1fr] md:items-end">
          <div>
            <p className="eyebrow rise">01 — Projects</p>
            <h1
              id="projects-heading"
              className="display-xl rise mt-6 [--rise-delay:80ms]"
            >
              What we build
            </h1>
            <p className="lede rise mt-8 max-w-2xl [--rise-delay:160ms]">
              Members from every major team up on hands-on clean energy and
              climate work, on campus and around LA.
            </p>
          </div>
          <p
            aria-hidden="true"
            className="font-display text-[clamp(6rem,18vw,14rem)] leading-[0.8] font-black tracking-[-0.06em] md:text-right"
          >
            {String(projects.length).padStart(2, "0")}
          </p>
        </div>
      </section>

      <section
        aria-labelledby="project-list-heading"
        className="section-y bg-background"
      >
        <div className="container-x">
          <p className="eyebrow text-muted">02 — Our work</p>
          <h2 id="project-list-heading" className="display-lg reveal mt-4">
            Projects
          </h2>

          {projects.length === 0 ? (
            <p className="mt-14 max-w-2xl rounded-lg border border-dashed border-muted/50 p-6 text-muted">
              No projects are posted yet. Check back soon.
            </p>
          ) : (
            <ol className="mt-14 border-t border-border">
              {projects.map((project, index) => (
                <ProjectRow key={project.id} project={project} index={index} />
              ))}
            </ol>
          )}
        </div>
      </section>

      <section
        aria-labelledby="project-idea-heading"
        data-tone="dark"
        className="tone-dark section-y bg-ink"
      >
        <div className="container-x flex flex-col items-start">
          <h2 id="project-idea-heading" className="display-lg reveal">
            Have a project <span className="block text-lime">idea?</span>
          </h2>
          <p className="lede reveal mt-8 text-muted">
            Members can pitch projects to the officers. Tell us what you want to
            work on.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="btn-lime hover:-translate-y-0.5 hover:border-paper hover:bg-paper"
            >
              Pitch a project
            </Link>
            <a
              href={site.joinFormUrl}
              className="btn-outline text-paper hover:border-lime hover:bg-lime hover:text-ink"
            >
              Join SoCET
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const hasDetails = Boolean(project.status || project.tags?.length);
  return (
    <li className="reveal grid gap-4 border-b border-border py-10 sm:grid-cols-[minmax(7rem,12rem)_1fr] sm:gap-10 sm:py-12">
      <span
        aria-hidden="true"
        className="font-display text-[clamp(3.5rem,8vw,5.5rem)] leading-[0.85] font-black tracking-[-0.05em]"
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="max-w-2xl sm:pt-2">
        <h3 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
          {project.title}
        </h3>
        <p className="mt-3 text-lg leading-relaxed text-muted">
          {project.summary}
        </p>
        {hasDetails && (
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Details">
            {project.status && <li className="tag">{project.status}</li>}
            {project.tags?.map((tag) => (
              <li key={tag} className="tag">
                {tag}
              </li>
            ))}
          </ul>
        )}
        {project.link && (
          <a href={project.link.href} className="link-u mt-5 inline-block">
            {project.link.label}
          </a>
        )}
      </div>
    </li>
  );
}
