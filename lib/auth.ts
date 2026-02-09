import { cookies } from "next/headers"
import { getUserById } from "./db"

const CURRENT_USER_COOKIE = "hotel-current-user"

export async function getCurrentUser() {
  const cookieStore = await cookies()
  const userId = cookieStore.get(CURRENT_USER_COOKIE)?.value
  if (!userId) return null
  return getUserById(userId)
}

export async function setCurrentUser(userId: string) {
  const user = await getUserById(userId)
  if (!user) return null
  const cookieStore = await cookies()
  cookieStore.set(CURRENT_USER_COOKIE, userId, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  })
  return user
}

export async function clearCurrentUser() {
  const cookieStore = await cookies()
  cookieStore.set(CURRENT_USER_COOKIE, "", { path: "/", maxAge: 0 })
}

export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser()
  return user?.role === "ADMIN"
}
