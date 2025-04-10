"use client"

import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

export function MobileHeader() {
  const isMobile = useIsMobile()

  if (!isMobile) return null

  return (
    <header className="flex items-center justify-between p-4 border-b border-border">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <span className="font-bold">Authentic Ga</span>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder.svg" alt="User" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
