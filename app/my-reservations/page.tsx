import { Navigation } from "@/components/navigation"
import { getReservationsByUserId } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CalendarDays, MapPin, Users, DollarSign } from "lucide-react"
import type { ReservationStatus } from "@/lib/types"
import { formatDate } from "@/lib/utils"


function StatusBadge({ status }: { status: ReservationStatus }) {
  const variants: Record<ReservationStatus, "default" | "secondary" | "destructive"> = {
    PENDING: "secondary",
    CONFIRMED: "default",
    CANCELLED: "destructive",
  }
  return <Badge variant={variants[status]}>{status}</Badge>
}

export default async function MyReservationsPage() {
  const user = await getCurrentUser()
  const reservations = user ? await getReservationsByUserId(user.id) : []

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold text-foreground">
              My Reservations
            </h1>
            <p className="mt-2 text-muted-foreground">
              View and manage your hotel bookings
            </p>
          </div>
          <Button asChild>
            <Link href="/rooms">Book a Room</Link>
          </Button>
        </div>

        {!user ? (
          <Card className="border-dashed border-border bg-card">
            <CardContent className="flex flex-col items-center py-16">
              <CalendarDays className="h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-4 text-lg font-semibold text-card-foreground">
                Please sign in
              </h3>
              <p className="mt-2 text-muted-foreground">
                Log in to view and manage your reservations.
              </p>
              <Button asChild className="mt-6">
                <Link href="/#login">Go to login</Link>
              </Button>
            </CardContent>
          </Card>
        ) : reservations.length === 0 ? (
          <Card className="border-dashed border-border bg-card">
            <CardContent className="flex flex-col items-center py-16">
              <CalendarDays className="h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-4 text-lg font-semibold text-card-foreground">
                No Reservations Yet
              </h3>
              <p className="mt-2 text-muted-foreground">
                You haven&apos;t made any reservations. Start by browsing our
                rooms.
              </p>
              <Button asChild className="mt-6">
                <Link href="/rooms">Browse Rooms</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="flex flex-col gap-4">
            {reservations.map((reservation) => {
              const room = reservation.room
              const nights = Math.ceil(
                (new Date(reservation.checkOut).getTime() -
                  new Date(reservation.checkIn).getTime()) /
                  (1000 * 60 * 60 * 24)
              )

              return (
                <Card
                  key={reservation.id}
                  className="border-border/60 bg-card"
                >
                  <CardContent className="pt-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold text-card-foreground">
                            {room?.name || "Room"}
                          </h3>
                          <StatusBadge status={reservation.status} />
                        </div>

                        <div className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            Room {room?.number || "N/A"}
                          </span>
                          <span className="flex items-center gap-2">
                            <CalendarDays className="h-4 w-4" />
                            {formatDate(new Date(reservation.checkIn))} to {formatDate(new Date(reservation.checkOut))} (
                            {nights} {nights === 1 ? "night" : "nights"})
                          </span>
                          <span className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            {reservation.guests}{" "}
                            {reservation.guests === 1 ? "guest" : "guests"}
                          </span>
                          <span className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4" />
                            Total: ${reservation.totalPrice}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 sm:items-end">
                        <p className="text-sm text-muted-foreground">
                          Booked:{" "}
                          {new Date(reservation.createdAt).toLocaleDateString()}
                        </p>
                        {room && (
                          <Button variant="outline" size="sm" asChild className="bg-card text-card-foreground">
                            <Link href={`/rooms/${room.id}`}>View Room</Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
