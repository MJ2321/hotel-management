import { cookies } from "next/headers"
import { getUserById, getUsers } from "./db"

const CURRENT_USER_COOKIE = "hotel-current-user"

export async function getCurrentUser() {
  const cookieStore = await cookies()
  const userId = cookieStore.get(CURRENT_USER_COOKIE)?.value
  if (!userId) {
    // Default to first user for demo purposes
    const users = await getUsers()
    return users[0] ?? null
  }
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

export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser()
  return user?.role === "ADMIN"
}
