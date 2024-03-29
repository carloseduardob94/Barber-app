"use server"

import { db } from "@/app/lib/prisma"

interface SaveBookingParams {
  barbershopId: string
  serviceId: string
  userId: string
  date: Date
}

export async function saveBooking(params: SaveBookingParams) {
  await db.booking.create({
    data: {
      barbershopId: params.barbershopId,
      serviceId: params.serviceId,
      userId: params.userId,
      date: params.date
    }
  })
}