"use client"

import { useEffect, useState, useCallback } from "react"
import { Badge } from "@/components/ui/badge"
import { Lock } from "lucide-react"
import type { User } from "@/lib/types"
import { LoginForm } from "@/components/login-form"
import { RegisterForm } from "@/components/register-form"

export function AuthSection() {
  const [user, setUser] = useState<User | null>(null)

  const fetchUser = useCallback(() => {
    fetch("/api/auth")
      .then((res) => res.json())
      .then((data) => setUser(data.user ?? null))
      .catch(() => setUser(null))
  }, [])

  useEffect(() => {
    fetchUser()
    const handler = () => fetchUser()
    window.addEventListener("auth-changed", handler)
    return () => window.removeEventListener("auth-changed", handler)
  }, [fetchUser])

  const isLoggedIn = Boolean(user)

  return (
    <section className="bg-secondary/40 py-16">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-2 lg:px-8">
        <div className="flex flex-col justify-center space-y-4">
          <Badge variant="secondary" className="w-fit bg-primary/10 text-primary border-primary/20">
            Secure access
          </Badge>
          <h2 className="font-serif text-3xl font-bold text-foreground text-balance">
            {isLoggedIn ? "You are signed in" : "Sign in or create an account"}
          </h2>
          <p className="text-muted-foreground">
            {isLoggedIn
              ? "Your session is active. Use the navigation bar to access your reservations or admin panel if you have permissions."
              : "Log in with your hotel account or register a new one. Administrators will automatically see a shortcut to the admin panel once signed in."}
          </p>
          {!isLoggedIn && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Lock className="h-4 w-4" />
              Credentials are verified against the database.
            </div>
          )}
        </div>

        {isLoggedIn ? (
          <div className="rounded-lg border border-border/60 bg-card p-6 shadow-sm">
            <p className="text-sm text-muted-foreground">
              Logged in as <span className="font-medium text-card-foreground">{user?.email}</span>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Role: <span className="font-medium text-card-foreground">{user?.role}</span>
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              Use the menu in the top right to log out or navigate to the admin area if applicable.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            <LoginForm />
            <RegisterForm />
          </div>
        )}
      </div>
    </section>
  )
}
