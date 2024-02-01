
import { db } from "@/app/lib/prisma"
import { BarbershopInfo } from "./components/Barbershop-info"
import { ServiceItem } from "./components/Service-item"
import { Button } from "@/app/components/ui/button"

interface BarbershopDetailsPageProps {
  params: {
    id?: string
  }
}

export default async function BarbershopDetailsPage({ params }: BarbershopDetailsPageProps) {
  if (!params.id) {
    return null
  }

  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id
    },
    include: {
      services: true
    }
  })

  if (!barbershop) {
    return null
  }

  return (
    <div>
      <BarbershopInfo barbershop={barbershop} />

      <Button className="mt-5 ml-5" variant="default">Serviços</Button>

      <div className="flex flex-col gap-4 px-5 py-6">
        {barbershop.services.map(service => (
          <ServiceItem key={service.id} service={service} />
        ))}
      </div>
    </div>
  )
}