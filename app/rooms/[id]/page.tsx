import { Navigation } from "@/components/navigation";
import { getRoomById } from "@/lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookingForm } from "@/components/booking-form";
import { Users, Check } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function RoomDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const room = await getRoomById(id);

  if (!room) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          <Link href="/rooms" className="hover:text-foreground">
            Rooms
          </Link>
          <span>/</span>
          <span className="text-foreground">{room.name}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
              <Image
                src={room.imageUrl || "/placeholder.svg"}
                alt={room.name}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute left-4 top-4 flex gap-2">
                <Badge className="text-sm">{room.type}</Badge>
                {!room.available && (
                  <Badge variant="destructive">Unavailable</Badge>
                )}
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="font-serif text-3xl font-bold text-foreground">
                    {room.name}
                  </h1>
                  <p className="mt-1 text-muted-foreground">
                    Room {room.number}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-primary">
                    ${room.pricePerNight}
                  </p>
                  <p className="text-sm text-muted-foreground">per night</p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <span className="text-muted-foreground">
                  Up to {room.capacity}{" "}
                  {room.capacity === 1 ? "guest" : "guests"}
                </span>
              </div>

              <p className="mt-6 leading-relaxed text-muted-foreground">
                {room.description}
              </p>

              <Card className="mt-8 border-border/60 bg-card">
                <CardHeader>
                  <CardTitle className="text-lg text-card-foreground">
                    Amenities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {room.amenities.map((amenity) => (
                      <div
                        key={amenity}
                        className="flex items-center gap-2 text-sm text-card-foreground"
                      >
                        <Check className="h-4 w-4 text-primary" />
                        {amenity}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {room.available ? (
                <BookingForm room={room} />
              ) : (
                <Card className="border-border/60 bg-card">
                  <CardContent className="pt-6 text-center">
                    <p className="text-muted-foreground">
                      This room is currently unavailable.
                    </p>
                    <Button asChild className="mt-4 w-full">
                      <Link href="/rooms">Browse Other Rooms</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
