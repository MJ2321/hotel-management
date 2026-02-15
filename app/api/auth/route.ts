import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getCurrentUser, setCurrentUser, clearCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await getCurrentUser();
  return NextResponse.json({ user });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json(
      { error: "Missing email or password" },
      { status: 400 },
    );
  }

  const user = (await prisma.user.findUnique({ where: { email } })) as any;
  if (!user || !user.password) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  await setCurrentUser(user.id);
  const { password: _pw, ...safeUser } = user;
  return NextResponse.json({ user: safeUser });
}

export async function DELETE() {
  await clearCurrentUser();
  return NextResponse.json({ success: true });
}
