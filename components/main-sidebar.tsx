"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Home, Headphones, BookOpen, FileText, Download, Settings, LogOut, CreditCard, BarChart } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function MainSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-border">
        <div className="flex items-center gap-2 px-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary">
            <span className="text-lg font-bold text-primary-foreground">AG</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold">Authentic Ga</span>
            <span className="text-xs text-muted-foreground">African Language Learning</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/"}>
                  <Link href="/">
                    <Home className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/stats"}>
                  <Link href="/stats">
                    <BarChart className="h-4 w-4" />
                    <span>Progress Stats</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Learning</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/listening"}>
                  <Link href="/listening">
                    <Headphones className="h-4 w-4" />
                    <span>Listening</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/reading"}>
                  <Link href="/reading">
                    <BookOpen className="h-4 w-4" />
                    <span>Reading</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/flashcards"}>
                  <Link href="/flashcards">
                    <FileText className="h-4 w-4" />
                    <span>Flashcards</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/resources"}>
                  <Link href="/resources">
                    <Download className="h-4 w-4" />
                    <span>Resources</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/subscription"}>
                  <Link href="/subscription">
                    <CreditCard className="h-4 w-4" />
                    <span>Subscription</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/settings"}>
                  <Link href="/settings">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-border p-4">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src="/placeholder.svg" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">John Doe</span>
            <span className="text-xs text-muted-foreground">Free Plan</span>
          </div>
          <Button variant="ghost" size="icon" className="ml-auto">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
