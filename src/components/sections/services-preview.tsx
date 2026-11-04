"use client"

import { useQuery } from "@tanstack/react-query"
import { servicesService } from "@/src/services/api/services.service"
import { Container } from "@/src/components/ui/container"
import { SectionHeader } from "@/src/components/shared/section-header"
import { ServiceCard } from "@/src/components/ui/service-card"
import { ROUTES } from "@/src/utils/constants"
import { StaggerContainer, StaggerItem } from "@/src/components/shared/motion-wrapper"

export function ServicesPreview() {
  const { data } = useQuery({
    queryKey: ["services"],
    queryFn: () => servicesService.getAll(),
  })

  const services = data?.data?.slice(0, 4) || []

  return (
    <section className="py-24 sm:py-28">
      <Container>
        <SectionHeader
          title="How I can help"
          muted="from idea to launch"
          subtitle="Focused services for teams and founders who need it built properly."
          href={ROUTES.SERVICES}
          linkLabel="All services"
        />

        <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <StaggerItem key={service.id} className="h-full">
              <ServiceCard service={service} index={i} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  )
}
