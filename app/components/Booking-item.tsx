import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

export function BookingItem() {
  return (
    <Card>
      <CardContent className="flex p-0">
        <div className="flex m-5 flex-col gap-3 flex-1">
          <Badge className="bg-[#221C3D] text-primary hover:bg-[#221C3D] w-fit">Confirmado</Badge>
          <h2 className="font-bold">Corte de Cabelo</h2>

          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src="https://utfs.io/f/8a457cda-f768-411d-a737-cdb23ca6b9b5-b3pegf.png" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <h3 className="text-sm">Vintage Barber</h3>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center w-28 border-l border-solid border-secondary">
          <p className="text-sm">Fevereiro</p>
          <span className="text-2xl">06</span>
          <p className="text-sm">09:45</p>
        </div>
      </CardContent>
    </Card>
  )
}