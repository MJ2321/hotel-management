"use client"

import { useEffect, useState, useCallback } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { User as UserType } from "@/lib/types"

export function UserSwitcher() {
  const [currentUser, setCurrentUser] = useState<UserType | null>(null)
  const router = useRouter()

  const fetchUser = useCallback(() => {
    fetch("/api/auth")
      .then((res) => res.json())
      .then((data) => setCurrentUser(data.user ?? null))
      .catch(() => setCurrentUser(null))
  }, [])

  useEffect(() => {
    fetchUser()
    const handler = () => fetchUser()
    window.addEventListener("auth-changed", handler)
    return () => window.removeEventListener("auth-changed", handler)
  }, [fetchUser])

  async function logout() {
    await fetch("/api/auth", { method: "DELETE" })
    setCurrentUser(null)
    window.dispatchEvent(new Event("auth-changed"))
    router.refresh()
  }

  const roleBadgeVariant = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "default"
      case "STAFF":
        return "secondary"
      default:
        return "outline"
    }
  }

  if (!currentUser)
    return (
      <Button asChild variant="outline" className="bg-card text-card-foreground">
        <Link href="/auth">Login</Link>
      </Button>
    )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2 bg-card text-card-foreground">
          <User className="h-4 w-4" />
          <span className="hidden sm:inline">{currentUser.name}</span>
          <Badge variant={roleBadgeVariant(currentUser.role)} className="text-xs">
            {currentUser.role}
          </Badge>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel className="flex items-center gap-2">
          Signed in as <span className="font-medium">{currentUser.email}</span>
        </DropdownMenuLabel>
        <DropdownMenuItem onClick={logout} className="gap-2 text-red-600">
          <LogOut className="h-4 w-4" /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
