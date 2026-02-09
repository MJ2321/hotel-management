import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Room } from "@/lib/types"
import Image from "next/image"
import Link from "next/link"
import { Users, Wifi, Tv, Wind } from "lucide-react"

const amenityIcons: Record<string, typeof Wifi> = {
  "Wi-Fi": Wifi,
  TV: Tv,
  "Air Conditioning": Wind,
}

export function RoomCard({ room }: { room: Room }) {
  return (
    <Card className="group overflow-hidden border-border/60 bg-card transition-shadow hover:shadow-lg">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={room.imageUrl || "/placeholder.svg"}
          alt={room.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          <Badge>{room.type}</Badge>
          {!room.available && (
            <Badge variant="destructive">Unavailable</Badge>
          )}
        </div>
      </div>
      <CardContent className="pt-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">{room.name}</h3>
            <p className="text-sm text-muted-foreground">Room {room.number}</p>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-primary">${room.pricePerNight}</p>
            <p className="text-xs text-muted-foreground">per night</p>
          </div>
        </div>

        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {room.description}
        </p>

        <div className="mt-4 flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            {room.capacity} {room.capacity === 1 ? "guest" : "guests"}
          </span>
          <div className="flex gap-1.5">
            {room.amenities.slice(0, 3).map((amenity) => {
              const Icon = amenityIcons[amenity]
              return Icon ? (
                <span
                  key={amenity}
                  title={amenity}
                  className="flex h-7 w-7 items-center justify-center rounded-md bg-accent"
                >
                  <Icon className="h-3.5 w-3.5 text-accent-foreground" />
                </span>
              ) : null
            })}
            {room.amenities.length > 3 && (
              <span className="flex h-7 items-center rounded-md bg-accent px-2 text-xs text-accent-foreground">
                +{room.amenities.length - 3}
              </span>
            )}
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <Button asChild className="flex-1">
            <Link href={`/rooms/${room.id}`}>View Details</Link>
          </Button>
          {room.available && (
            <Button variant="outline" asChild className="bg-card text-card-foreground">
              <Link href={`/rooms/${room.id}?book=true`}>Book Now</Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
