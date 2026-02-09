import { getReservations, getRooms } from "@/lib/db"
import { AdminReservationsClient } from "@/components/admin-reservations-client"

export default function AdminReservationsPage() {
  const reservations = getReservations()
  const rooms = getRooms()
  return (
    <AdminReservationsClient
      initialReservations={reservations}
      rooms={rooms}
    />
  )
}
