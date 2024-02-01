"use client"
import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon, MenuIcon, UserIcon } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Avatar, AvatarImage } from "./ui/avatar";

import userLogout from '../../public/user-logout.svg'
import Link from "next/link";

export function Header() {
  const { data, status } = useSession()

  async function handleLoginClick() {
    await signIn("google")
  }

  function handleLogoutClick() {
    signOut()
  }

  return (
    <Card>
      <CardContent className="px-5 py-5 justify-between flex flex-row items-center">
        <Image src="/logo.png" alt="FSW Barber" height={22} width={120} />

        <Sheet>
          <SheetTrigger asChild>
            <Button variant={"outline"} size="icon">
              <MenuIcon size={18} />
            </Button>
          </SheetTrigger>
          <SheetContent className="p-0">
            <SheetHeader className="text-left border-b border-solid border-secondary p-5">
              <SheetTitle>
                Menu
              </SheetTitle>
            </SheetHeader>

            {data?.user ? (
              <div className="flex justify-between items-center px-5 py-6">
                <div className="flex items-center gap-3 ">
                  <Avatar>
                    <AvatarImage src={data.user?.image ?? ""} />
                  </Avatar>

                  <h2 className="font-bold">{data.user.name}</h2>
                </div>

                <Button onClick={handleLogoutClick} variant="secondary" size="icon">
                  <LogOutIcon />
                </Button>
              </div>
            ) : (
              <div className="px-5 py-6">
                <div className="flex items-center gap-2">
                  <Image src={userLogout} alt="" width={35} height={35} />
                  <h2 className="font-bold">Olá faça seu login</h2>
                </div>
                <Button onClick={handleLoginClick} variant="secondary" className="w-full mt-3 hover:bg-primary justify-start">
                  <LogInIcon className="mr-2" size={18} />
                  Fazer Login
                </Button>
              </div>
            )}

            <div className="flex flex-col gap-3 px-5">
              <Button variant="outline" className="justify-start" asChild>
                <Link href="/">
                  <HomeIcon size={18} className="mr-2" />
                  Início
                </Link>
              </Button>

              {data?.user && (
                <Button variant="outline" className="justify-start" asChild>
                  <Link href="/">
                    <CalendarIcon size={18} className="mr-2" />
                    Agendamentos
                  </Link>
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>

      </CardContent>
    </Card>
  )
}