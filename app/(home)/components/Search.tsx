"use client";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { SearchIcon } from "lucide-react";

export function Search() {
  return (
    <div className="flex items-center gap-2">
      <Input placeholder="Busce por uma barbearia..." />

      <Button variant="default">
        <SearchIcon size={20} />
      </Button>
    </div>
  )
}