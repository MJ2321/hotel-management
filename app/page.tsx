import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getRooms } from "@/lib/db";
import Link from "next/link";
import Image from "next/image";
import { BedDouble, Users, Star, Shield, ArrowRight } from "lucide-react";

function HeroSection() {
  return (
    <section className="relative overflow-hidden w-full h-[600px] flex items-center">
      <div className="absolute inset-0">
        <Image
          src="/hero.jpg"
          alt="Grand Haven Hotel lobby"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center text-white">
        <Badge
          variant="secondary"
          className="mb-6 bg-white/20 text-white backdrop-blur-sm border-white/30"
        >
          Welcome to luxury
        </Badge>

        <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-balance">
          Your Perfect Stay Awaits
        </h1>

        <p className="mt-6 mx-auto max-w-2xl text-lg text-gray-200 leading-relaxed">
          Experience world-class hospitality at Grand Haven Hotel. From elegant
          singles to luxurious suites, every room is designed for your comfort
          and relaxation.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            asChild
            className="text-base bg-primary hover:bg-primary/90"
          >
            <Link href="/rooms">Browse Rooms</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="border-white bg-white/10 text-white backdrop-blur-sm hover:bg-white hover:text-black text-base"
          >
            <Link href="/my-reservations">My Reservations</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: BedDouble,
      title: "Premium Rooms",
      description:
        "Choose from a variety of room types, each meticulously designed with premium furnishings and modern amenities.",
    },
    {
      icon: Users,
      title: "Exceptional Service",
      description:
        "Our dedicated staff ensures every guest receives personalized attention and world-class hospitality.",
    },
    {
      icon: Star,
      title: "Best Value",
      description:
        "Enjoy luxury at competitive prices. Transparent pricing with no hidden fees.",
    },
    {
      icon: Shield,
      title: "Secure Booking",
      description:
        "Simple and secure reservation process. Manage your bookings anytime with real-time availability.",
    },
  ];

  return (
    <section className="w-full py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl font-bold text-foreground text-balance">
            Why Choose Grand Haven
          </h2>
          <p className="mt-3 text-muted-foreground">
            Everything you need for a memorable stay
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title} className="border-border/60 bg-card">
              <CardContent className="pt-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 font-semibold text-card-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

async function FeaturedRoomsSection() {
  const rooms = (await getRooms()).slice(0, 3);

  return (
    <section className="bg-secondary/50 py-20 w-full">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-serif text-3xl font-bold text-foreground">
              Featured Rooms
            </h2>
            <p className="mt-3 text-muted-foreground">
              Explore our most popular accommodations
            </p>
          </div>
          <Button
            variant="outline"
            asChild
            className="hidden bg-card text-card-foreground sm:inline-flex"
          >
            <Link href="/rooms">View All</Link>
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room) => (
            <Link
              key={room.id}
              href={`/rooms/${room.id}`}
              className="block h-full"
            >
              <div className="@container h-full">
                <Card className="group overflow-hidden border-border/60 bg-card transition-shadow hover:shadow-lg h-full flex flex-col @xs:flex-row">
                  <div className="relative aspect-[4/3] w-full @xs:w-2/5 @xs:aspect-auto overflow-hidden shrink-0">
                    <Image
                      src={room.imageUrl || "/placeholder.svg"}
                      alt={room.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <Badge className="absolute right-3 top-3 z-10">
                      {room.type}
                    </Badge>
                  </div>

                  <CardContent className="pt-4 p-4 @xs:p-5 w-full flex flex-col justify-between">
                    <div className="flex flex-col @xs:gap-2">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <h3 className="font-semibold text-card-foreground text-lg line-clamp-1">
                            {room.name}
                          </h3>
                          <p className="mt-1 text-sm text-muted-foreground">
                            Room {room.number}
                          </p>
                        </div>
                        <div className="text-right shrink-0 @xs:hidden">
                          <p className="font-bold text-primary">
                            ${room.pricePerNight}
                          </p>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mt-2">
                        Up to {room.capacity}{" "}
                        {room.capacity === 1 ? "guest" : "guests"}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="hidden @xs:block">
                        <p className="text-lg font-bold text-primary">
                          ${room.pricePerNight}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          per night
                        </p>
                      </div>

                      <div className="text-primary text-sm font-medium flex items-center gap-1 group-hover:underline decoration-primary/50 underline-offset-4">
                        Details <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Button
            variant="outline"
            asChild
            className="bg-card text-card-foreground"
          >
            <Link href="/rooms">View All Rooms</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <FeaturesSection />
        <FeaturedRoomsSection />
      </main>
      <footer className="border-t bg-card py-10">
        <div className="mx-auto container px-4 text-center text-sm text-muted-foreground lg:px-8">
          <p>Grand Haven Hotel Management System</p>
          <p className="mt-1">
            Authentication is now validated against the database.
          </p>
        </div>
      </footer>
    </div>
  );
}
