import { getRooms } from "@/lib/db"
import { AdminRoomsClient } from "@/components/admin-rooms-client"

export default function AdminRoomsPage() {
  const rooms = getRooms()
  return <AdminRoomsClient initialRooms={rooms} />
}
