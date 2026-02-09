import "dotenv/config"

// Use generated Prisma Client (output in lib/generated/prisma)
import { PrismaClient } from '@/lib/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import bcrypt from "bcryptjs"

// PrismaClient instance with custom model typings
const connectionString = process.env.DATABASE_URL
if (!connectionString) {
  throw new Error('DATABASE_URL is required for seeding')
}

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log("🌱 Seeding database...")

  // Clean existing data
  await prisma.reservation.deleteMany()
  await prisma.staff.deleteMany()
  await prisma.room.deleteMany()
  await prisma.user.deleteMany()

  // === Users ===
  const [user1, user2, user3, user4] = await Promise.all([
    prisma.user.create({
      data: {
        name: "Jan Kowalski",
        email: "jan@example.com",
        password: await bcrypt.hash("password123", 10),
        role: "USER",
        phone: "+48 500 100 200",
        createdAt: new Date("2025-01-15T10:00:00Z"),
      },
    }),
    prisma.user.create({
      data: {
        name: "Anna Nowak",
        email: "anna@example.com",
        password: await bcrypt.hash("admin123", 10),
        role: "ADMIN",
        phone: "+48 500 300 400",
        createdAt: new Date("2025-01-10T08:00:00Z"),
      },
    }),
    prisma.user.create({
      data: {
        name: "Piotr Wisniewski",
        email: "piotr@example.com",
        password: await bcrypt.hash("staff123", 10),
        role: "STAFF",
        phone: "+48 500 500 600",
        createdAt: new Date("2025-02-01T09:00:00Z"),
      },
    }),
    prisma.user.create({
      data: {
        name: "Maria Zielinska",
        email: "maria@example.com",
        password: await bcrypt.hash("password123", 10),
        role: "USER",
        phone: "+48 500 700 800",
        createdAt: new Date("2025-03-05T11:00:00Z"),
      },
    }),
  ])

  console.log("✅ Users created")

  // === Rooms ===
  const room1 = await prisma.room.create({
    data: {
      number: "101",
      name: "Classic Single",
      type: "SINGLE",
      description:
        "A cozy single room with a comfortable bed, work desk, and modern bathroom. Perfect for solo travelers on business or leisure trips.",
      capacity: 1,
      pricePerNight: 250,
      imageUrl: "/rooms/single.jpg",
      amenities: ["Wi-Fi", "TV", "Air Conditioning", "Mini Bar", "Safe"],
      available: true,
    },
  })

  const room2 = await prisma.room.create({
    data: {
      number: "205",
      name: "Premium Double",
      type: "DOUBLE",
      description:
        "Spacious double room with a king-size bed, seating area, and panoramic city views. Ideal for couples seeking comfort and style.",
      capacity: 2,
      pricePerNight: 420,
      imageUrl: "/rooms/double.jpg",
      amenities: [
        "Wi-Fi",
        "TV",
        "Air Conditioning",
        "Mini Bar",
        "Safe",
        "Balcony",
        "Room Service",
      ],
      available: true,
    },
  })

  const room3 = await prisma.room.create({
    data: {
      number: "310",
      name: "Executive Suite",
      type: "SUITE",
      description:
        "Luxurious suite with a separate living area, premium furnishings, and exclusive amenities. The perfect retreat for distinguished guests.",
      capacity: 3,
      pricePerNight: 780,
      imageUrl: "/rooms/suite.jpg",
      amenities: [
        "Wi-Fi",
        "TV",
        "Air Conditioning",
        "Mini Bar",
        "Safe",
        "Balcony",
        "Room Service",
        "Jacuzzi",
        "Kitchen",
      ],
      available: true,
    },
  })

  await prisma.room.create({
    data: {
      number: "401",
      name: "Royal Deluxe",
      type: "DELUXE",
      description:
        "Our finest room featuring a master bedroom, luxury bathroom with marble finishes, and a private terrace. An unparalleled experience.",
      capacity: 4,
      pricePerNight: 1200,
      imageUrl: "/rooms/deluxe.jpg",
      amenities: [
        "Wi-Fi",
        "TV",
        "Air Conditioning",
        "Mini Bar",
        "Safe",
        "Balcony",
        "Room Service",
        "Jacuzzi",
        "Kitchen",
        "Private Terrace",
        "Butler Service",
      ],
      available: true,
    },
  })

  await prisma.room.create({
    data: {
      number: "102",
      name: "Comfort Single",
      type: "SINGLE",
      description:
        "A well-appointed single room with modern amenities and a garden view. Great value for comfortable stays.",
      capacity: 1,
      pricePerNight: 220,
      imageUrl: "/rooms/single2.jpg",
      amenities: ["Wi-Fi", "TV", "Air Conditioning", "Safe"],
      available: true,
    },
  })

  await prisma.room.create({
    data: {
      number: "208",
      name: "Garden Double",
      type: "DOUBLE",
      description:
        "Charming double room overlooking our landscaped gardens. Features a queen-size bed and a relaxing atmosphere.",
      capacity: 2,
      pricePerNight: 380,
      imageUrl: "/rooms/double2.jpg",
      amenities: [
        "Wi-Fi",
        "TV",
        "Air Conditioning",
        "Mini Bar",
        "Safe",
        "Garden View",
      ],
      available: false,
    },
  })

  console.log("✅ Rooms created")

  // === Reservations ===
  await prisma.reservation.create({
    data: {
      userId: user1.id,
      roomId: room2.id,
      checkIn: new Date("2026-03-01"),
      checkOut: new Date("2026-03-05"),
      guests: 2,
      status: "CONFIRMED",
      guestName: "Jan Kowalski",
      guestEmail: "jan@example.com",
      guestPhone: "+48 500 100 200",
      totalPrice: 1680,
      createdAt: new Date("2026-02-01T14:30:00Z"),
    },
  })

  await prisma.reservation.create({
    data: {
      userId: user4.id,
      roomId: room3.id,
      checkIn: new Date("2026-03-10"),
      checkOut: new Date("2026-03-14"),
      guests: 2,
      status: "PENDING",
      guestName: "Maria Zielinska",
      guestEmail: "maria@example.com",
      guestPhone: "+48 500 700 800",
      totalPrice: 3120,
      createdAt: new Date("2026-02-05T10:00:00Z"),
    },
  })

  await prisma.reservation.create({
    data: {
      userId: user1.id,
      roomId: room1.id,
      checkIn: new Date("2026-02-15"),
      checkOut: new Date("2026-02-18"),
      guests: 1,
      status: "CANCELLED",
      guestName: "Jan Kowalski",
      guestEmail: "jan@example.com",
      guestPhone: "+48 500 100 200",
      totalPrice: 750,
      createdAt: new Date("2026-01-20T09:00:00Z"),
    },
  })

  console.log("✅ Reservations created")

  // === Staff ===
  await prisma.staff.create({
    data: {
      userId: user3.id,
      name: "Piotr Wisniewski",
      email: "piotr@example.com",
      phone: "+48 500 500 600",
      position: "Receptionist",
      department: "Front Desk",
      hireDate: new Date("2024-06-15"),
      active: true,
    },
  })

  await prisma.staff.create({
    data: {
      userId: user2.id,
      name: "Anna Nowak",
      email: "anna@example.com",
      phone: "+48 500 300 400",
      position: "Hotel Manager",
      department: "Management",
      hireDate: new Date("2023-01-10"),
      active: true,
    },
  })

  await prisma.staff.create({
    data: {
      name: "Katarzyna Dabrowska",
      email: "kasia@example.com",
      phone: "+48 500 900 100",
      position: "Housekeeper",
      department: "Housekeeping",
      hireDate: new Date("2024-09-01"),
      active: true,
    },
  })

  await prisma.staff.create({
    data: {
      name: "Tomasz Lewandowski",
      email: "tomasz@example.com",
      phone: "+48 500 200 300",
      position: "Concierge",
      department: "Guest Services",
      hireDate: new Date("2025-02-20"),
      active: false,
    },
  })

  console.log("✅ Staff created")
  console.log("🎉 Seeding completed!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
