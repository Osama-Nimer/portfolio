import Link from "next/link"
import { ArrowRight, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/src/components/ui/container"
import { ROUTES } from "@/src/utils/constants"

export function ContactCta() {
  return (
    <section className="py-20 bg-main/10">
      <Container size="md">
        <div className="text-center">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-main text-foreground">
            <Mail className="h-8 w-8" />
          </div>

          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Let&apos;s Work Together</h2>

          <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
            Have a project in mind? I&apos;d love to hear about it. Let&apos;s discuss how we can bring your ideas to
            life.
          </p>

          <div className="mt-8">
            <Link href={ROUTES.CONTACT}>
              <Button size="lg" className="bg-main text-foreground hover:bg-main-dark">
                Get In Touch
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}
