import { prisma } from "./prisma"
import type { Prisma } from "@/lib/generated/prisma/client"

// === Users ===

export async function getUsers() {
  return prisma.user.findMany({ orderBy: { createdAt: "asc" } })
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({ where: { id } })
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } })
}

// === Rooms ===

export async function getRooms() {
  return prisma.room.findMany({ orderBy: { number: "asc" } })
}

export async function getRoomById(id: string) {
  return prisma.room.findUnique({ where: { id } })
}

export async function getAvailableRooms(
  checkIn?: string,
  checkOut?: string,
  capacity?: number,
  maxPrice?: number
) {
  const where: Prisma.RoomWhereInput = { available: true }

  if (capacity) {
    where.capacity = { gte: capacity }
  }

  if (maxPrice) {
    where.pricePerNight = { lte: maxPrice }
  }

  if (checkIn && checkOut) {
    where.reservations = {
      none: {
        status: { not: "CANCELLED" },
        checkIn: { lt: new Date(checkOut) },
        checkOut: { gt: new Date(checkIn) },
      },
    }
  }

  return prisma.room.findMany({ where, orderBy: { number: "asc" } })
}

export async function createRoom(data: Prisma.RoomCreateInput) {
  return prisma.room.create({ data })
}

export async function updateRoom(id: string, data: Prisma.RoomUpdateInput) {
  try {
    return await prisma.room.update({ where: { id }, data })
  } catch {
    return null
  }
}

export async function deleteRoom(id: string) {
  try {
    await prisma.room.delete({ where: { id } })
    return true
  } catch {
    return false
  }
}

// === Reservations ===

export async function getReservations() {
  return prisma.reservation.findMany({
    orderBy: { createdAt: "desc" },
    include: { room: true },
  })
}

export async function getReservationById(id: string) {
  return prisma.reservation.findUnique({
    where: { id },
    include: { room: true },
  })
}

export async function getReservationsByUserId(userId: string) {
  return prisma.reservation.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: { room: true },
  })
}

export async function createReservation(data: {
  userId: string
  roomId: string
  checkIn: string
  checkOut: string
  guests: number
  status: "PENDING" | "CONFIRMED" | "CANCELLED"
  guestName: string
  guestEmail: string
  guestPhone: string
  totalPrice: number
}) {
  return prisma.reservation.create({
    data: {
      userId: data.userId,
      roomId: data.roomId,
      checkIn: new Date(data.checkIn),
      checkOut: new Date(data.checkOut),
      guests: data.guests,
      status: data.status,
      guestName: data.guestName,
      guestEmail: data.guestEmail,
      guestPhone: data.guestPhone,
      totalPrice: data.totalPrice,
    },
  })
}

export async function updateReservation(
  id: string,
  data: Prisma.ReservationUpdateInput
) {
  try {
    return await prisma.reservation.update({ where: { id }, data })
  } catch {
    return null
  }
}

// === Staff ===

export async function getStaff() {
  return prisma.staff.findMany({ orderBy: { hireDate: "asc" } })
}

export async function getStaffById(id: string) {
  return prisma.staff.findUnique({ where: { id } })
}

export async function createStaff(data: {
  userId?: string | null
  name: string
  email: string
  phone: string
  position: string
  department: string
  hireDate: string
  active: boolean
}) {
  return prisma.staff.create({
    data: {
      userId: data.userId || null,
      name: data.name,
      email: data.email,
      phone: data.phone,
      position: data.position,
      department: data.department,
      hireDate: new Date(data.hireDate),
      active: data.active,
    },
  })
}

export async function updateStaff(id: string, data: Prisma.StaffUpdateInput) {
  try {
    return await prisma.staff.update({ where: { id }, data })
  } catch {
    return null
  }
}

export async function deleteStaff(id: string) {
  try {
    await prisma.staff.delete({ where: { id } })
    return true
  } catch {
    return false
  }
}
