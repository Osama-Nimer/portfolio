import Link from "next/link"
import { ArrowUpRight, Github, Instagram, Linkedin, Mail } from "lucide-react"
import { Container } from "@/src/components/ui/container"
import { ROUTES } from "@/src/utils/constants"
import { BrandWordmark } from "@/src/components/shared/brand"
import { META } from "@/src/components/shared/motif"

const footerLinks = [
  { href: ROUTES.ABOUT, label: "About" },
  { href: ROUTES.SKILLS, label: "Skills" },
  { href: ROUTES.PROJECTS, label: "Projects" },
  { href: ROUTES.SERVICES, label: "Services" },
  { href: ROUTES.CONTACT, label: "Contact" },
]

const socialLinks = [
  { href: "https://github.com/Osama-Nimer", icon: Github, label: "GitHub" },
  { href: "https://www.linkedin.com/in/osama-nimer/", icon: Linkedin, label: "LinkedIn" },
  { href: "https://www.instagram.com/osama_niimer/", icon: Instagram, label: "Instagram" },
  { href: "mailto:osamanimer6@gmail.com", icon: Mail, label: "Email" },
]

const LINK =
  "rounded-sm text-sm text-muted-foreground transition-colors hover:text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-24 border-t border-line">
      <Container>
        <div className="grid gap-12 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link href={ROUTES.HOME} aria-label="Osama Nimer, home" className="inline-block">
              <BrandWordmark />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-6 text-muted-foreground">
              Full-stack developer building fast, reliable products for the web. Open to new projects.
            </p>
          </div>

          <div>
            <h2 className={META}>Pages</h2>
            <ul className="mt-5 space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={LINK}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className={META}>Elsewhere</h2>
            <ul className="mt-5 space-y-3">
              {socialLinks.map((link) => {
                const external = !link.href.startsWith("mailto:")
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className={`${LINK} group inline-flex items-center gap-2.5`}
                    >
                      <link.icon className="size-4" />
                      {link.label}
                      <ArrowUpRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-line py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-subtle">&copy; {year} Osama Nimer</p>
          <p className="font-mono text-xs text-subtle">Amman, Jordan</p>
        </div>
      </Container>
    </footer>
  )
}
