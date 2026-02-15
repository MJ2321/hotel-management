import { NextResponse } from "next/server";
import {
  getReservations,
  getReservationsByUserId,
  createReservation,
  getRoomById,
} from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json(
      { error: "You have to be logged in" },
      { status: 401 },
    );
  }

  const { searchParams } = new URL(request.url);
  const all = searchParams.get("all") === "true";

  if (all && user.role === "ADMIN") {
    return NextResponse.json(await getReservations());
  }

  return NextResponse.json(await getReservationsByUserId(user.id));
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json(
      { error: "You have to be logged in" },
      { status: 401 },
    );
  }

  const body = await request.json();
  const {
    roomId,
    checkIn,
    checkOut,
    guests,
    guestName,
    guestEmail,
    guestPhone,
  } = body;

  if (
    !roomId ||
    !checkIn ||
    !checkOut ||
    !guests ||
    !guestName ||
    !guestEmail
  ) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }

  const room = await getRoomById(roomId);
  if (!room) {
    return NextResponse.json({ error: "Room not found" }, { status: 404 });
  }

  const nights = Math.ceil(
    (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
      (1000 * 60 * 60 * 24),
  );

  if (nights <= 0) {
    return NextResponse.json({ error: "Invalid dates" }, { status: 400 });
  }

  const totalPrice = nights * room.pricePerNight;

  const reservation = await createReservation({
    userId: user.id,
    roomId,
    checkIn,
    checkOut,
    guests: Number(guests),
    status: "PENDING",
    guestName,
    guestEmail,
    guestPhone: guestPhone || "",
    totalPrice,
  });

  return NextResponse.json(reservation, { status: 201 });
}
