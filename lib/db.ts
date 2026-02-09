import type { User, Room, Reservation, Staff } from "./types"

// In-memory database simulating Prisma ORM
// In production, replace with actual Prisma client calls

const users: User[] = [
  {
    id: "user-1",
    name: "Jan Kowalski",
    email: "jan@example.com",
    role: "USER",
    phone: "+48 500 100 200",
    createdAt: "2025-01-15T10:00:00Z",
  },
  {
    id: "user-2",
    name: "Anna Nowak",
    email: "anna@example.com",
    role: "ADMIN",
    phone: "+48 500 300 400",
    createdAt: "2025-01-10T08:00:00Z",
  },
  {
    id: "user-3",
    name: "Piotr Wisniewski",
    email: "piotr@example.com",
    role: "STAFF",
    phone: "+48 500 500 600",
    createdAt: "2025-02-01T09:00:00Z",
  },
  {
    id: "user-4",
    name: "Maria Zielinska",
    email: "maria@example.com",
    role: "USER",
    phone: "+48 500 700 800",
    createdAt: "2025-03-05T11:00:00Z",
  },
]

const rooms: Room[] = [
  {
    id: "room-1",
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
  {
    id: "room-2",
    number: "205",
    name: "Premium Double",
    type: "DOUBLE",
    description:
      "Spacious double room with a king-size bed, seating area, and panoramic city views. Ideal for couples seeking comfort and style.",
    capacity: 2,
    pricePerNight: 420,
    imageUrl: "/rooms/double.jpg",
    amenities: ["Wi-Fi", "TV", "Air Conditioning", "Mini Bar", "Safe", "Balcony", "Room Service"],
    available: true,
  },
  {
    id: "room-3",
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
  {
    id: "room-4",
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
  {
    id: "room-5",
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
  {
    id: "room-6",
    number: "208",
    name: "Garden Double",
    type: "DOUBLE",
    description:
      "Charming double room overlooking our landscaped gardens. Features a queen-size bed and a relaxing atmosphere.",
    capacity: 2,
    pricePerNight: 380,
    imageUrl: "/rooms/double2.jpg",
    amenities: ["Wi-Fi", "TV", "Air Conditioning", "Mini Bar", "Safe", "Garden View"],
    available: false,
  },
]

const reservations: Reservation[] = [
  {
    id: "res-1",
    userId: "user-1",
    roomId: "room-2",
    checkIn: "2026-03-01",
    checkOut: "2026-03-05",
    guests: 2,
    status: "CONFIRMED",
    guestName: "Jan Kowalski",
    guestEmail: "jan@example.com",
    guestPhone: "+48 500 100 200",
    totalPrice: 1680,
    createdAt: "2026-02-01T14:30:00Z",
  },
  {
    id: "res-2",
    userId: "user-4",
    roomId: "room-3",
    checkIn: "2026-03-10",
    checkOut: "2026-03-14",
    guests: 2,
    status: "PENDING",
    guestName: "Maria Zielinska",
    guestEmail: "maria@example.com",
    guestPhone: "+48 500 700 800",
    totalPrice: 3120,
    createdAt: "2026-02-05T10:00:00Z",
  },
  {
    id: "res-3",
    userId: "user-1",
    roomId: "room-1",
    checkIn: "2026-02-15",
    checkOut: "2026-02-18",
    guests: 1,
    status: "CANCELLED",
    guestName: "Jan Kowalski",
    guestEmail: "jan@example.com",
    guestPhone: "+48 500 100 200",
    totalPrice: 750,
    createdAt: "2026-01-20T09:00:00Z",
  },
]

const staff: Staff[] = [
  {
    id: "staff-1",
    userId: "user-3",
    name: "Piotr Wisniewski",
    email: "piotr@example.com",
    phone: "+48 500 500 600",
    position: "Receptionist",
    department: "Front Desk",
    hireDate: "2024-06-15",
    active: true,
  },
  {
    id: "staff-2",
    userId: "user-2",
    name: "Anna Nowak",
    email: "anna@example.com",
    phone: "+48 500 300 400",
    position: "Hotel Manager",
    department: "Management",
    hireDate: "2023-01-10",
    active: true,
  },
  {
    id: "staff-3",
    userId: "",
    name: "Katarzyna Dabrowska",
    email: "kasia@example.com",
    phone: "+48 500 900 100",
    position: "Housekeeper",
    department: "Housekeeping",
    hireDate: "2024-09-01",
    active: true,
  },
  {
    id: "staff-4",
    userId: "",
    name: "Tomasz Lewandowski",
    email: "tomasz@example.com",
    phone: "+48 500 200 300",
    position: "Concierge",
    department: "Guest Services",
    hireDate: "2025-02-20",
    active: false,
  },
]

// === Database access functions ===

// Users
export function getUsers() {
  return [...users]
}

export function getUserById(id: string) {
  return users.find((u) => u.id === id) || null
}

export function getUserByEmail(email: string) {
  return users.find((u) => u.email === email) || null
}

// Rooms
export function getRooms() {
  return [...rooms]
}

export function getRoomById(id: string) {
  return rooms.find((r) => r.id === id) || null
}

export function getAvailableRooms(checkIn?: string, checkOut?: string, capacity?: number, maxPrice?: number) {
  let filtered = rooms.filter((r) => r.available)

  if (capacity) {
    filtered = filtered.filter((r) => r.capacity >= capacity)
  }

  if (maxPrice) {
    filtered = filtered.filter((r) => r.pricePerNight <= maxPrice)
  }

  // Check date conflicts with existing reservations
  if (checkIn && checkOut) {
    const conflictingRoomIds = reservations
      .filter(
        (res) =>
          res.status !== "CANCELLED" &&
          new Date(res.checkIn) < new Date(checkOut) &&
          new Date(res.checkOut) > new Date(checkIn)
      )
      .map((res) => res.roomId)

    filtered = filtered.filter((r) => !conflictingRoomIds.includes(r.id))
  }

  return filtered
}

export function createRoom(data: Omit<Room, "id">) {
  const newRoom: Room = { ...data, id: `room-${Date.now()}` }
  rooms.push(newRoom)
  return newRoom
}

export function updateRoom(id: string, data: Partial<Room>) {
  const index = rooms.findIndex((r) => r.id === id)
  if (index === -1) return null
  rooms[index] = { ...rooms[index], ...data }
  return rooms[index]
}

export function deleteRoom(id: string) {
  const index = rooms.findIndex((r) => r.id === id)
  if (index === -1) return false
  rooms.splice(index, 1)
  return true
}

// Reservations
export function getReservations() {
  return [...reservations]
}

export function getReservationById(id: string) {
  return reservations.find((r) => r.id === id) || null
}

export function getReservationsByUserId(userId: string) {
  return reservations.filter((r) => r.userId === userId)
}

export function createReservation(data: Omit<Reservation, "id" | "createdAt">) {
  const newReservation: Reservation = {
    ...data,
    id: `res-${Date.now()}`,
    createdAt: new Date().toISOString(),
  }
  reservations.push(newReservation)
  return newReservation
}

export function updateReservation(id: string, data: Partial<Reservation>) {
  const index = reservations.findIndex((r) => r.id === id)
  if (index === -1) return null
  reservations[index] = { ...reservations[index], ...data }
  return reservations[index]
}

// Staff
export function getStaff() {
  return [...staff]
}

export function getStaffById(id: string) {
  return staff.find((s) => s.id === id) || null
}

export function createStaff(data: Omit<Staff, "id">) {
  const newStaff: Staff = { ...data, id: `staff-${Date.now()}` }
  staff.push(newStaff)
  return newStaff
}

export function updateStaff(id: string, data: Partial<Staff>) {
  const index = staff.findIndex((s) => s.id === id)
  if (index === -1) return null
  staff[index] = { ...staff[index], ...data }
  return staff[index]
}

export function deleteStaff(id: string) {
  const index = staff.findIndex((s) => s.id === id)
  if (index === -1) return false
  staff.splice(index, 1)
  return true
}
