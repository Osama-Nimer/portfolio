"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { servicesService } from "@/src/services/api/services.service"
import { Container } from "@/src/components/ui/container"
import { SectionTitle } from "@/src/components/shared/section-title"
import { ServiceCard } from "@/src/components/ui/service-card"
import { Button } from "@/components/ui/button"
import { ROUTES } from "@/src/utils/constants"
import { StaggerContainer, StaggerItem, FadeIn } from "@/src/components/shared/motion-wrapper"

export function ServicesPreview() {
  const { data } = useQuery({
    queryKey: ["services"],
    queryFn: () => servicesService.getAll(),
  })

  const services = data?.data?.slice(0, 4) || []

  return (
    <section className="py-20">
      <Container>
        <SectionTitle title="My Services" subtitle="What I can do for you" />

        <StaggerContainer staggerDelay={0.12} className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <StaggerItem key={service.id}>
              <ServiceCard service={service} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn delay={0.3}>
          <div className="mt-12 text-center">
            <Link href={ROUTES.SERVICES}>
              <Button variant="outline" size="lg">
                View All Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}
