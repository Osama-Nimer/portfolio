import type { ReactNode } from "react"
import { Container } from "@/src/components/ui/container"
import { FadeIn } from "@/src/components/shared/motion-wrapper"

/** The top of an inner page: a path-style label, a two-tone h1 and a lead, lit from above. */
export function PageHeader({
  path,
  title,
  muted,
  lead,
  children,
}: {
  path: string
  title: string
  muted?: string
  lead?: ReactNode
  children?: ReactNode
}) {
  return (
    <section className="relative isolate pb-14 pt-20 sm:pb-16 sm:pt-28">
      <div aria-hidden="true" className="fx-glow pointer-events-none absolute inset-x-0 -top-24 -z-10 h-[560px]" />
      <Container>
        <FadeIn>
          <p className="font-mono text-[13px] text-subtle">
            <span className="text-foreground/60">~</span>/{path}
          </p>
          <h1 className="mt-5 max-w-3xl text-balance text-[2.5rem] font-semibold leading-[1.04] tracking-[-0.04em] text-foreground sm:text-[3.5rem] lg:text-[4rem]">
            {title}
            {muted && <span className="text-foreground/40"> {muted}</span>}
          </h1>
          {lead && (
            <p className="mt-6 max-w-[56ch] text-pretty text-[17px] leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              {lead}
            </p>
          )}
          {children}
        </FadeIn>
      </Container>
    </section>
  )
}
