import { NextResponse } from "next/server"
import { getReservationById, updateReservation } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const reservation = await getReservationById(id)
  if (!reservation) {
    return NextResponse.json({ error: "Reservation not found" }, { status: 404 })
  }
  return NextResponse.json(reservation)
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: "You have to be logged ind" }, { status: 401 })
  }

  const { id } = await params
  const body = await request.json()

  // Only admins can update status
  if (body.status && user.role !== "ADMIN") {
    return NextResponse.json(
      { error: "Only admins can update reservation status" },
      { status: 403 }
    )
  }

  const reservation = await updateReservation(id, body)
  if (!reservation) {
    return NextResponse.json({ error: "Reservation not found" }, { status: 404 })
  }

  return NextResponse.json(reservation)
}
