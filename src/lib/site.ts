/** Club facts and links shared across pages. Source: docs/plan/decision-log.md. */
export const site = {
  name: "SoCET at UCLA",
  fullName: "Society of Clean Energy and Technology at UCLA",
  description:
    "The Society of Clean Energy and Technology at UCLA: open to all majors, building the LA cleantech workforce through education, cross-disciplinary teamwork and real-world site visits.",
  email: "socet.ucla@gmail.com",
  /** The club's Google Form; it signs people up to the club and the mailing list. */
  joinFormUrl: "https://forms.gle/PmJXRE5nah4yH7kh6",
  discordUrl: "https://discord.gg/bT4jEe4xfg",
  instagramUrl: "https://www.instagram.com/socetucla/",
  linkedinUrl:
    "https://www.linkedin.com/company/society-of-clean-energy-and-technology-at-ucla",
} as const;

export const navLinks = [
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/team", label: "Team" },
  { href: "/join", label: "Join" },
  { href: "/contact", label: "Contact" },
] as const;

export const socialLinks = [
  { href: site.discordUrl, label: "Discord" },
  { href: site.instagramUrl, label: "Instagram" },
  { href: site.linkedinUrl, label: "LinkedIn" },
] as const;
