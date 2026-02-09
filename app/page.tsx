import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getRooms } from "@/lib/db"
import Link from "next/link"
import Image from "next/image"
import { BedDouble, Users, Star, Shield, Lock } from "lucide-react"
import { LoginForm } from "@/components/login-form"

function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/hero.jpg"
          alt="Grand Haven Hotel lobby"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-foreground/60" />
      </div>
      <div className="relative mx-auto flex min-h-[520px] max-w-7xl flex-col items-center justify-center px-4 py-24 text-center lg:px-8">
        <Badge variant="secondary" className="mb-6 bg-card/20 text-card backdrop-blur-sm border-card/30">
          Welcome to luxury
        </Badge>
        <h1 className="font-serif text-4xl font-bold tracking-tight text-card sm:text-5xl lg:text-6xl text-balance">
          Your Perfect Stay Awaits
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-card/80 leading-relaxed">
          Experience world-class hospitality at Grand Haven Hotel. From elegant
          singles to luxurious suites, every room is designed for your comfort
          and relaxation.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button size="lg" asChild className="text-base">
            <Link href="/rooms">Browse Rooms</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="border-card/30 bg-card/10 text-card backdrop-blur-sm hover:bg-card/20 hover:text-card text-base"
          >
            <Link href="/my-reservations">My Reservations</Link>
          </Button>
        </div>
      </div>
    </section>
  )
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
  ]

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
      <div className="text-center">
        <h2 className="font-serif text-3xl font-bold text-foreground text-balance">
          Why Choose Grand Haven
        </h2>
        <p className="mt-3 text-muted-foreground">
          Everything you need for a memorable stay
        </p>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
    </section>
  )
}

function LoginSection() {
  return (
    <section className="bg-secondary/40 py-16">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-2 lg:px-8">
        <div className="flex flex-col justify-center space-y-4">
          <Badge variant="secondary" className="w-fit bg-primary/10 text-primary border-primary/20">
            Secure access
          </Badge>
          <h2 className="font-serif text-3xl font-bold text-foreground text-balance">
            Sign in to manage your stay
          </h2>
          <p className="text-muted-foreground">
            Log in with your hotel account. Administrators will automatically see a shortcut to the admin panel once signed in.
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Lock className="h-4 w-4" />
            Credentials are verified against the database.
          </div>
        </div>
        <LoginForm />
      </div>
    </section>
  )
}

async function FeaturedRoomsSection() {
  const rooms = (await getRooms()).slice(0, 3)

  return (
    <section className="bg-secondary/50 py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-serif text-3xl font-bold text-foreground text-balance">
              Featured Rooms
            </h2>
            <p className="mt-3 text-muted-foreground">
              Explore our most popular accommodations
            </p>
          </div>
          <Button variant="outline" asChild className="hidden bg-card text-card-foreground sm:inline-flex">
            <Link href="/rooms">View All</Link>
          </Button>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room) => (
            <Link key={room.id} href={`/rooms/${room.id}`}>
              <Card className="group overflow-hidden border-border/60 bg-card transition-shadow hover:shadow-lg">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={room.imageUrl || "/placeholder.svg"}
                    alt={room.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <Badge className="absolute right-3 top-3">{room.type}</Badge>
                </div>
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-card-foreground">
                        {room.name}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Room {room.number} &middot; Up to {room.capacity}{" "}
                        {room.capacity === 1 ? "guest" : "guests"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-primary">
                        ${room.pricePerNight}
                      </p>
                      <p className="text-xs text-muted-foreground">per night</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center sm:hidden">
          <Button variant="outline" asChild className="bg-card text-card-foreground">
            <Link href="/rooms">View All Rooms</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <LoginSection />
        <FeaturesSection />
        <FeaturedRoomsSection />
      </main>
      <footer className="border-t bg-card py-10">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-muted-foreground lg:px-8">
          <p>Grand Haven Hotel Management System</p>
          <p className="mt-1">Authentication is now validated against the database.</p>
        </div>
      </footer>
    </div>
  )
}
