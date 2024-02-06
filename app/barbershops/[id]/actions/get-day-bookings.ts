"use server"
import { db } from "@/app/lib/prisma";
import { endOfDay, startOfDay } from "date-fns";

export async function getDayBookings(date: Date) {
  const bookings = await db.booking.findMany({
    where: {
      date: {
        lte: endOfDay(date),
        gte: startOfDay(date)
      }
    }
  })

  return bookings
}