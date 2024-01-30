import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { Barbershop } from "@prisma/client";
import { StarIcon } from "lucide-react";
import Image from "next/image";

interface BarbershopItemProps {
  barbershop: Barbershop
}

export function BarbershopItem({ barbershop }: BarbershopItemProps) {
  return (
    <Card className="min-w-[200px] max-w-[200px] rounded-2xl">
      <CardContent className="p-0">
        <div className="p-1 pb-0 relative">
          <Badge variant="secondary" className="opacity-90 absolute top-3 left-2 z-50 gap-1 flex items-center">
            <StarIcon size={12} className="fill-primary text-primary" />
            <span className="text-xs">5,0</span>
          </Badge>
          <Image
            src={barbershop.imageUrl}
            alt={barbershop.name}
            height={0}
            width={0}
            sizes="100vw"
            className="h-[159px] w-full rounded-2xl object-cover"
          />
        </div>

        <div className="px-3 pb-3">
          <h2 className="font-bold mt-2 text-ellipsis text-nowrap">{barbershop.name}</h2>
          <p
            className="text-sm text-gray-400 overflow-hidden text-ellipsis text-nowrap">
            {barbershop.address}
          </p>
          <Button className="w-full mt-3" variant="secondary">Reservar</Button>
        </div>

      </CardContent>
    </Card>
  )
}