"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { servicesService } from "@/src/services/api/services.service"
import { Container } from "@/src/components/ui/container"
import { SectionTitle } from "@/src/components/shared/section-title"
import { ServiceCard } from "@/src/components/ui/service-card"
import { Button } from "@/components/ui/button"
import { PageLoader } from "@/src/components/shared/loading-spinner"
import { ROUTES } from "@/src/utils/constants"

export function ServicesContent() {
  const { data, isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: () => servicesService.getAll(),
  })

  if (isLoading) return <PageLoader />

  const services = data?.data || []

  return (
    <>
      <section className="py-20">
        <Container>
          <SectionTitle title="My Services" subtitle="Professional services tailored to your needs" />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-main/10">
        <Container size="md">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Ready to Start Your Project?</h2>
            <p className="mt-4 text-muted-foreground">Let&apos;s discuss how I can help you achieve your goals.</p>
            <div className="mt-8">
              <Link href={ROUTES.CONTACT}>
                <Button size="lg" className="bg-main text-foreground hover:bg-main-dark">
                  Get a Quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
