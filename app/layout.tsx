import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/ui/sidebar"
import { MainSidebar } from "@/components/main-sidebar"
import { MobileHeader } from "@/components/mobile-header"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Authentic Ga - Immersive Language Learning",
  description: "Learn Ga language through immersive content with an authentic approach",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <SidebarProvider>
            <div className="flex min-h-screen">
              <MainSidebar />
              <div className="flex flex-col flex-1">
                <MobileHeader />
                <main className="flex-1">{children}</main>
              </div>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'