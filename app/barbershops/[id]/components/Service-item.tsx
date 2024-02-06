"use client"
import { Button } from "@/app/components/ui/button"
import { Calendar } from "@/app/components/ui/calendar"
import { Card, CardContent } from "@/app/components/ui/card"
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/app/components/ui/sheet"
import { Barbershop, Service } from "@prisma/client"
import { ptBR } from "date-fns/locale"
import { signIn } from "next-auth/react"
import Image from "next/image"
import { useMemo, useState } from "react"
import { generateDayTimeList } from "../helpers/hours"
import { format } from "date-fns"

interface ServiceItemProps {
  barbershop: Barbershop
  service: Service
  isAuthenticated: boolean
}

export function ServiceItem({ service, isAuthenticated, barbershop }: ServiceItemProps) {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [hour, setHour] = useState<String | undefined>()

  function handleDateClick(date: Date | undefined) {
    setDate(date)
    setHour(undefined)
  }

  function handleHourClick(time: string) {
    setHour(time)
  }

  function handleBookingClick() {

    if (!isAuthenticated) {
      return signIn("google")
    }

    //TODO: Abrir modal de agendamentos
  }

  const timeList = useMemo(() => {
    return date ? generateDayTimeList(date) : []
  }, [date])

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
              <p className="text-lg text-primary leading-5 font-bold">
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL"
                }).format(Number(service.price))}</p>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="secondary" className="hover:bg-primary" onClick={handleBookingClick}>Reservar</Button>
                </SheetTrigger>
                <SheetContent className="p-0">
                  <SheetHeader>
                    <SheetTitle className="text-left px-5 py-6 border-b border-solid border-secondary">
                      Fazer reserva
                    </SheetTitle>
                  </SheetHeader>
                  <div className="py-6">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={handleDateClick}
                      locale={ptBR}
                      fromDate={new Date()}
                      styles={{
                        head_cell: {
                          width: '100%',
                          textTransform: "capitalize"
                        },
                        cell: {
                          width: '100%'
                        },
                        button: {
                          width: '100%'
                        },
                        nav_button_previous: {
                          width: '2rem'
                        },
                        nav_button_next: {
                          width: '2rem'
                        },
                        caption: {
                          textTransform: "capitalize"
                        }
                      }}
                    />
                  </div>

                  {/* Mostrar lista de horários apenas se alguma data estiver selecionada */}
                  {date && (
                    <div className="flex flex-wrap gap-2 justify-center py-6 px-3 border-t border-solid border-secondary">
                      {timeList.map(time => (
                        <Button onClick={() => handleHourClick(time)} variant={hour === time ? 'default' : 'outline'} className="min-w-[4rem] max-w-[4rem] rounded-full" key={time}>{time}</Button>
                      ))}
                    </div>
                  )}

                  <div className="py-6 px-5 border-t border-solid border-secondary">
                    <Card>
                      <CardContent className="p-3 flex flex-col gap-3">
                        <div className="flex justify-between">
                          <h2 className="font-bold">{service.name}</h2>
                          <h3 className="font-bold text-sm">{Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL"
                          }).format(Number(service.price))}</h3>
                        </div>
                        {date && (
                          <div className="flex justify-between">
                            <h3 className="text-gray-400 text-sm">Data</h3>
                            <h4 className="text-sm">{format(date, "dd 'de' MMMM", {
                              locale: ptBR,
                            })}</h4>
                          </div>
                        )}

                        {hour && (
                          <div className="flex justify-between">
                            <h3 className="text-gray-400 text-sm">Horário</h3>
                            <h4 className="text-sm">{hour}</h4>
                          </div>
                        )}

                        <div className="flex justify-between">
                          <h3 className="text-gray-400 text-sm">Barbearia</h3>
                          <h4 className="text-sm">{barbershop.name}</h4>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <SheetFooter className="px-5">
                    <Button disabled={
                      hour && date ? false : true
                    } >Confirmar reserva</Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>

          </div>
        </div>
      </CardContent>
    </Card>

  )
}