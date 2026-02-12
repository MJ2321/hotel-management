import React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import { Toaster as SonnerToaster } from "@/components/ui/sonner"
import { Toaster as CustomToaster } from "@/components/ui/toaster"

import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Grand Haven Hotel - Hotel Management System",
  description:
    "Luxury hotel management system. Browse rooms, make reservations, and manage your hotel with ease.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        {children}
        <SonnerToaster />
        <CustomToaster />
      </body>
    </html>
  )
}
