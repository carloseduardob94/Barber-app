import { ptBR } from "date-fns/locale";
import { Header } from "../components/Header";
import { format } from 'date-fns'
import { Search } from "./components/Search";
import { BookingItem } from "../components/Booking-item";
import { db } from "../lib/prisma";
import { BarbershopItem } from "./components/Barbershop-item";

export default async function Home() {
  const barbershop = await db.barbershop.findMany({})

  return (
    <div>
      <Header />

      <div className="px-5 pt-5">
        <h2 className="text-xl">Olá, <strong>Eduardo!</strong></h2>
        <p className="capitalize text-sm">{format(new Date(), "EEEE', 'dd 'de' MMMM", {
          locale: ptBR
        })}</p>
      </div>

      <div className="px-5 mt-6">
        <Search />
      </div>

      <div className="px-6 mt-6">
        <h2 className="text-sm uppercase text-gray-400 font-bold mb-3">Agendamentos</h2>
        <BookingItem />
      </div>

      <div className="mt-6">
        <h2 className="text-sm px-5 uppercase text-gray-400 font-bold mb-3">Recomendados</h2>

        <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {barbershop.map(barbershop => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  );
}
