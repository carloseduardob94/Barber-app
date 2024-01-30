import { ptBR } from "date-fns/locale";
import { Header } from "../components/Header";
import { format } from 'date-fns'
import { Search } from "./components/Search";
import { BookingItem } from "../components/Booking-item";

export default function Home() {
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
    </div>
  );
}
