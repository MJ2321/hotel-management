import { getReservations, getRooms } from "@/lib/db"
import { AdminReservationsClient } from "@/components/admin-reservations-client"

export default async function AdminReservationsPage() {
  const reservations = await getReservations()
  const rooms = await getRooms()
  return (
    <AdminReservationsClient
      initialReservations={reservations}
      rooms={rooms}
    />
  )
}
