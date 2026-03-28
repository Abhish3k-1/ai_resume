import Link from "next/link";

const productLinks = [
  { href: "#features", label: "Features" },
  { href: "#templates", label: "Templates" },
  { href: "/builder", label: "Resume Builder" },
  { href: "/dashboard", label: "Dashboard" },
];

const resourceLinks = [
  { href: "#", label: "Help Center" },
  { href: "#", label: "Privacy Policy" },
  { href: "#", label: "Terms of Service" },
];

const socialLinks = [
  { href: "#", label: "Twitter / X", icon: "𝕏" },
  { href: "#", label: "LinkedIn", icon: "in" },
  { href: "#", label: "GitHub", icon: "GH" },
];

export function MainFooter() {
  return (
    <footer className="border-t border-border/70 bg-surface/45 px-4 py-12 sm:px-6 sm:py-16 lg:px-10">
      <div className="mx-auto grid max-w-full gap-8 sm:gap-10 md:grid-cols-[1.3fr_1fr_1fr_1fr] px-2 sm:px-4">
        {/* Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 text-xs font-semibold text-primary">
              RF
            </span>
            <p className="font-display text-lg font-semibold tracking-tight text-foreground">
              ResumeForge AI
            </p>
          </div>
          <p className="max-w-xs text-sm leading-6 text-foreground/65">
            Design-forward AI resume builder that helps ambitious professionals
            craft clearer stories and land better opportunities.
          </p>
          <div className="flex gap-3 pt-2">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                aria-label={link.label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-surface-muted/50 text-xs font-semibold text-foreground/60 transition hover:border-primary/40 hover:text-primary"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Product */}
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-foreground/55">
            Product
          </p>
          <ul className="space-y-3">
            {productLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-foreground/72 transition hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-foreground/55">
            Resources
          </p>
          <ul className="space-y-3">
            {resourceLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-foreground/72 transition hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-foreground/55">
            Stay updated
          </p>
          <p className="text-sm text-foreground/60 mb-3">
            Get tips on resume building and career growth.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="your@email.com"
              className="h-9 flex-1 rounded-lg border border-border/70 bg-surface/50 px-3 text-xs text-foreground placeholder:text-foreground/40 outline-none focus:border-primary"
            />
            <button className="h-9 rounded-lg bg-primary px-3 text-xs font-semibold text-white transition hover:bg-primary/90">
              Join
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-full flex-col gap-3 border-t border-border/65 pt-6 px-2 sm:px-4 text-xs text-foreground/52 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} ResumeForge AI. All rights reserved.</p>
        <p>Crafted for people who care about both detail and momentum.</p>
      </div>
    </footer>
  );
}
