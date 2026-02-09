import { NextResponse } from "next/server"
import { getStaff, createStaff } from "@/lib/db"
import { isAdmin } from "@/lib/auth"

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }
  return NextResponse.json(getStaff())
}

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  const body = await request.json()
  const { name, email, phone, position, department } = body

  if (!name || !email || !position || !department) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  const member = createStaff({
    userId: "",
    name,
    email,
    phone: phone || "",
    position,
    department,
    hireDate: new Date().toISOString().split("T")[0],
    active: true,
  })

  return NextResponse.json(member, { status: 201 })
}
