import { NextResponse } from "next/server"
import { getStaffById, updateStaff, deleteStaff } from "@/lib/db"
import { isAdmin } from "@/lib/auth"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  const { id } = await params
  const member = await getStaffById(id)
  if (!member) {
    return NextResponse.json({ error: "Staff member not found" }, { status: 404 })
  }
  return NextResponse.json(member)
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  const { id } = await params
  const body = await request.json()
  const member = await updateStaff(id, body)

  if (!member) {
    return NextResponse.json({ error: "Staff member not found" }, { status: 404 })
  }

  return NextResponse.json(member)
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  const { id } = await params
  const deleted = await deleteStaff(id)

  if (!deleted) {
    return NextResponse.json({ error: "Staff member not found" }, { status: 404 })
  }

  return NextResponse.json({ success: true })
}
