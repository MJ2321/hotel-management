"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { User, ChevronDown } from "lucide-react"
import type { User as UserType } from "@/lib/types"
import { useRouter } from "next/navigation"

export function UserSwitcher() {
  const [currentUser, setCurrentUser] = useState<UserType | null>(null)
  const [allUsers, setAllUsers] = useState<UserType[]>([])
  const router = useRouter()

  useEffect(() => {
    fetch("/api/auth")
      .then((res) => res.json())
      .then((data) => {
        setCurrentUser(data.user)
        setAllUsers(data.allUsers)
      })
  }, [])

  async function switchUser(userId: string) {
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    })
    const data = await res.json()
    setCurrentUser(data.user)
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

  if (!currentUser) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2 bg-card text-card-foreground">
          <User className="h-4 w-4" />
          <span className="hidden sm:inline">{currentUser.name}</span>
          <Badge variant={roleBadgeVariant(currentUser.role)} className="text-xs">
            {currentUser.role}
          </Badge>
          <ChevronDown className="h-3 w-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Switch User</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {allUsers.map((user) => (
          <DropdownMenuItem
            key={user.id}
            onClick={() => switchUser(user.id)}
            className={currentUser.id === user.id ? "bg-accent" : ""}
          >
            <span className="flex items-center gap-2">
              {user.name}
              <Badge variant={roleBadgeVariant(user.role)} className="text-xs">
                {user.role}
              </Badge>
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
