import { NextResponse } from "next/server"
import { getCurrentUser, setCurrentUser } from "@/lib/auth"
import { getUsers } from "@/lib/db"

// Get current user session
export async function GET() {
  const user = await getCurrentUser()
  return NextResponse.json({ user, allUsers: getUsers() })
}

// Switch user (mock login)
export async function POST(request: Request) {
  const body = await request.json()
  const { userId } = body

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 })
  }

  const user = await setCurrentUser(userId)
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  return NextResponse.json({ user })
}
