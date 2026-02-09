import { Navigation } from "@/components/navigation"
import { RoomsList } from "@/components/rooms-list"
import { getRooms } from "@/lib/db"

export default function RoomsPage() {
  const rooms = getRooms()

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-bold text-foreground">
            Our Rooms
          </h1>
          <p className="mt-2 text-muted-foreground">
            Find the perfect room for your stay. Filter by capacity, price, or
            room type.
          </p>
        </div>
        <RoomsList rooms={rooms} />
      </main>
    </div>
  )
}
