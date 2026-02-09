import React from "react"
import { Navigation } from "@/components/navigation"
import { AdminNav } from "@/components/admin-nav"
import { getCurrentUser } from "@/lib/auth"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ShieldAlert } from "lucide-react"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()
  const isUserAdmin = user?.role === "ADMIN"

  return (
    <div className="min-h-screen">
      <Navigation />
      {isUserAdmin ? (
        <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
          <div className="mb-8">
            <h1 className="font-serif text-3xl font-bold text-foreground">
              Admin Panel
            </h1>
            <p className="mt-2 text-muted-foreground">
              Manage rooms, reservations, and hotel staff
            </p>
          </div>
          <AdminNav />
          <div className="mt-6">{children}</div>
        </div>
      ) : (
        <div className="mx-auto max-w-md px-4 py-20 text-center">
          <Card className="border-destructive/20 bg-card">
            <CardContent className="pt-6">
              <ShieldAlert className="mx-auto h-12 w-12 text-destructive" />
              <h2 className="mt-4 text-xl font-semibold text-card-foreground">
                Access Denied
              </h2>
              <p className="mt-2 text-muted-foreground">
                You need administrator privileges to access this page. Please
                log in with an admin account.
              </p>
              <Button asChild className="mt-6">
                <Link href="/">Go Home</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
