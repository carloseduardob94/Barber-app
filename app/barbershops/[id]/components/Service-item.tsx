"use client"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent } from "@/app/components/ui/card"
import { Service } from "@prisma/client"
import { signIn } from "next-auth/react"
import Image from "next/image"

interface ServiceItemProps {
  service: Service
  isAuthenticated: boolean
}

export function ServiceItem({ service, isAuthenticated }: ServiceItemProps) {

  function handleBookingClick() {

    if (!isAuthenticated) {
      return signIn("google")
    }

    //TODO: Abrir modal de agendamentos
  }

  return (

    <Card>
      <CardContent className="p-3">
        <div className="flex gap-4 items-center">
          <div className="h-[110px] w-[110px]">
            <Image
              className="rounded-lg object-cover"
              width={110}
              height={110}
              src={service.imageUrl}
              alt={service.name}
            />
          </div>
          <div className="flex-1 h-[110px]">
            <div className="flex flex-col justify-start">
              <h2 className="font-bold text-sm">{service.name}</h2>
              <p className="text-sm text-gray-400 h-[40px]">{service.description}</p>
            </div>

            <div className="flex items-center justify-between mt-2">
              <p className="text-lg text-primary leading-5 font-bold">{Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
              }).format(Number(service.price))}</p>
              <Button variant="secondary" className="hover:bg-primary" onClick={handleBookingClick}>Reservar</Button>
            </div>

          </div>
        </div>
      </CardContent>
    </Card>

  )
}