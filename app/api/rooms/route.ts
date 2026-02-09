import { NextResponse } from "next/server"
import { getRooms, getAvailableRooms, createRoom } from "@/lib/db"
import { isAdmin } from "@/lib/auth"
import type { RoomType } from "@/lib/types"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const checkIn = searchParams.get("checkIn") || undefined
  const checkOut = searchParams.get("checkOut") || undefined
  const capacity = searchParams.get("capacity")
    ? Number(searchParams.get("capacity"))
    : undefined
  const maxPrice = searchParams.get("maxPrice")
    ? Number(searchParams.get("maxPrice"))
    : undefined
  const all = searchParams.get("all") === "true"

  if (all) {
    return NextResponse.json(getRooms())
  }

  const rooms = getAvailableRooms(checkIn, checkOut, capacity, maxPrice)
  return NextResponse.json(rooms)
}

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  const body = await request.json()
  const { number, name, type, description, capacity, pricePerNight, amenities } = body

  if (!number || !name || !type || !description || !capacity || !pricePerNight) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  const room = createRoom({
    number,
    name,
    type: type as RoomType,
    description,
    capacity: Number(capacity),
    pricePerNight: Number(pricePerNight),
    imageUrl: "/rooms/default.jpg",
    amenities: amenities || [],
    available: true,
  })

  return NextResponse.json(room, { status: 201 })
}
