import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { setCurrentUser } from "@/lib/auth"

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const { name, email, password } = body || {}

  if (!name || !email || !password) {
    return NextResponse.json({ error: "Missing name, email or password" }, { status: 400 })
  }

  // Prevent duplicate accounts
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return NextResponse.json({ error: "Email already registered" }, { status: 409 })
  }

  // Create user with USER role by default
  const hashed = await bcrypt.hash(password, 10)
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashed,
      role: "USER",
    },
  })

  // Auto-sign in after registration
  await setCurrentUser(user.id)
  const { password: _pw, ...safeUser } = user
  return NextResponse.json({ user: safeUser }, { status: 201 })
}
