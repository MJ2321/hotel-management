import { getRooms } from "@/lib/db"
import { AdminRoomsClient } from "@/components/admin-rooms-client"

export default async function AdminRoomsPage() {
  const rooms = await getRooms()
  return <AdminRoomsClient initialRooms={rooms} />
}
