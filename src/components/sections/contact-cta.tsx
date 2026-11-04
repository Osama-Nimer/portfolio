import Link from "next/link"
import { ArrowRight, Mail } from "lucide-react"
import { Container } from "@/src/components/ui/container"
import { ROUTES } from "@/src/utils/constants"
import { FadeIn } from "@/src/components/shared/motion-wrapper"
import { RingNode, pillClass } from "@/src/components/shared/motif"

/** The closing call to action: a framed panel lit from above, with the motif's path across it. */
export function ContactCta({
  title = "Have a project in mind?",
  muted = "Let's build it together",
  lead = "Tell me what you're working on. I'll get back to you within a day with next steps.",
}: {
  title?: string
  muted?: string
  lead?: string
}) {
  return (
    <section aria-labelledby="cta-heading" className="py-24 sm:py-28">
      <Container>
        <FadeIn>
          <div className="relative isolate overflow-hidden rounded-3xl border border-line bg-card px-6 py-16 text-center sm:px-12 sm:py-20">
            <div aria-hidden="true" className="fx-dots absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
            <div aria-hidden="true" className="fx-glow absolute inset-0 -z-10" />

            <div aria-hidden="true" className="mx-auto mb-10 flex max-w-xs items-center gap-3 text-line-bold">
              <RingNode className="size-2" />
              <div className="relative h-px flex-1 overflow-hidden bg-line-strong">
                <span className="fx-travel absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-foreground/80 to-transparent" />
              </div>
              <RingNode live className="size-2 text-foreground" />
            </div>

            <h2
              id="cta-heading"
              className="mx-auto max-w-2xl text-balance text-[2rem] font-semibold leading-[1.08] tracking-[-0.035em] text-foreground sm:text-[2.75rem]"
            >
              <span className="block">{title}</span>
              <span className="block text-foreground/40">{muted}</span>
            </h2>
            <p className="mx-auto mt-6 max-w-md text-pretty text-base leading-7 text-muted-foreground">{lead}</p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link href={ROUTES.CONTACT} className={pillClass({ size: "lg", className: "group" })}>
                Get in touch
                <ArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
              <a href="mailto:osamanimer6@gmail.com" className={pillClass({ variant: "secondary", size: "lg" })}>
                <Mail />
                Email me
              </a>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}
