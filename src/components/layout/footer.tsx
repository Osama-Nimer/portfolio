import Link from "next/link"
import { Github, Linkedin, Instagram , Mail } from "lucide-react"
import { Container } from "@/src/components/ui/container"
import { ROUTES } from "@/src/utils/constants"

const footerLinks = [
  { href: ROUTES.HOME, label: "Home" },
  { href: ROUTES.ABOUT, label: "About" },
  { href: ROUTES.PROJECTS, label: "Projects" },
  { href: ROUTES.CONTACT, label: "Contact" },
]

const socialLinks = [
  { href: "https://github.com/Osama-Nimer", icon: Github, label: "GitHub" },
  { href: "https://www.linkedin.com/in/osama-nimer/", icon: Linkedin, label: "LinkedIn" },
  { href: "https://www.instagram.com/osama_niimer/", icon: Instagram, label: "Instagram" },
  { href: "mailto:osamanimer6@gmail.com", icon: Mail, label: "Email" },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-card">
      <Container>
        <div className="py-12">
          <div className="grid gap-8 md:grid-cols-3">
            {/* Brand */}
            <div>
              <Link href={ROUTES.HOME} className="text-2xl font-bold text-main">
                Osama Nimer
              </Link>
              <p className="mt-4 text-sm text-muted-foreground max-w-xs">
                Building digital experiences with passion and precision. Let&apos;s create something amazing together.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-main transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Connect</h3>
              <div className="flex gap-4">
                {socialLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full p-2 text-muted-foreground hover:bg-main hover:text-foreground transition-colors"
                    aria-label={link.label}
                  >
                    <link.icon className="h-5 w-5" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">&copy;{currentYear} Osama Nimer. All rights reserved.</p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
