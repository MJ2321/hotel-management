// === Enums ===
export type UserRole = "USER" | "ADMIN" | "STAFF"
export type ReservationStatus = "PENDING" | "CONFIRMED" | "CANCELLED"
export type RoomType = "SINGLE" | "DOUBLE" | "SUITE" | "DELUXE"

// === Models ===
export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  phone?: string
  createdAt: string
}

export interface Room {
  id: string
  number: string
  name: string
  type: RoomType
  description: string
  capacity: number
  pricePerNight: number
  imageUrl: string
  amenities: string[]
  available: boolean
}

export interface Reservation {
  id: string
  userId: string
  roomId: string
  checkIn: string
  checkOut: string
  guests: number
  status: ReservationStatus
  guestName: string
  guestEmail: string
  guestPhone: string
  totalPrice: number
  createdAt: string
}

export interface Staff {
  id: string
  userId: string
  name: string
  email: string
  phone: string
  position: string
  department: string
  hireDate: string
  active: boolean
}
