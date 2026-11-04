"use client"

import { useQuery } from "@tanstack/react-query"
import { servicesService } from "@/src/services/api/services.service"
import { Container } from "@/src/components/ui/container"
import { PageHeader } from "@/src/components/shared/page-header"
import { ServiceCard } from "@/src/components/ui/service-card"
import { PageLoader } from "@/src/components/shared/loading-spinner"
import { StaggerContainer, StaggerItem } from "@/src/components/shared/motion-wrapper"
import { ContactCta } from "@/src/components/sections/contact-cta"
import { EmptyState } from "@/src/components/shared/empty-state"

const steps = [
  { title: "Discover", text: "We pin down the problem, the users and what success looks like." },
  { title: "Build", text: "Short cycles, working software early, and you see progress every week." },
  { title: "Ship", text: "Tested, documented and deployed, with a clean handover or ongoing support." },
]

export function ServicesContent() {
  const { data, isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: () => servicesService.getAll(),
  })

  const services = data?.data || []

  return (
    <>
      <PageHeader
        path="services"
        title="How I can help"
        muted="from idea to launch"
        lead="Focused, hands-on services for teams and founders who need software built properly."
      />

      <section className="pb-8">
        <Container>
          {isLoading ? (
            <PageLoader />
          ) : services.length > 0 ? (
            <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service, i) => (
                <StaggerItem key={service.id} className="h-full">
                  <ServiceCard service={service} index={i} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            <EmptyState>No services listed yet.</EmptyState>
          )}
        </Container>
      </section>

      {/* How a project runs: three ring nodes on one path. */}
      <section aria-labelledby="process-heading" className="pt-24 sm:pt-28">
        <Container>
          <h2 id="process-heading" className="text-2xl font-semibold tracking-[-0.03em] text-foreground sm:text-3xl">
            How we&apos;ll work <span className="text-foreground/40">together</span>
          </h2>
          <ol className="relative mt-10 grid gap-10 md:grid-cols-3 md:gap-6">
            <span aria-hidden="true" className="absolute left-[4px] top-1 bottom-1 w-px bg-line-strong md:inset-x-0 md:top-[4px] md:bottom-auto md:h-px md:w-auto" />
            {steps.map((step, i) => (
              <li key={step.title} className="relative pl-8 md:pl-0 md:pt-10">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1 size-[9px] rounded-full border-[1.5px] border-foreground bg-background md:top-0"
                />
                <span className="font-mono text-xs text-subtle">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 text-lg font-semibold tracking-[-0.02em] text-foreground">{step.title}</h3>
                <p className="mt-2 max-w-xs text-sm leading-6 text-muted-foreground">{step.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <ContactCta title="Ready to start?" muted="Let's talk scope" lead="Share a few lines about your project and I'll reply with a plan and a quote." />
    </>
  )
}
