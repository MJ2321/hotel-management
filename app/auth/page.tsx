"use client"

import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LoginForm } from "@/components/login-form"
import { RegisterForm } from "@/components/register-form"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Lock } from "lucide-react"

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-secondary/30">
      <Navigation />
      <main className="mx-auto flex max-w-4xl flex-col gap-8 px-4 py-12 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Lock className="h-4 w-4" /> Secure authentication
            </p>
            <h1 className="mt-2 font-serif text-3xl font-bold text-foreground">
              Sign in or create an account
            </h1>
            <p className="mt-2 text-muted-foreground text-sm">
              Use your hotel account to manage reservations. New users register as USER by default.
            </p>
          </div>
          <Button variant="outline" asChild className="hidden sm:inline-flex bg-card text-card-foreground">
            <Link href="/rooms">Browse rooms</Link>
          </Button>
        </div>

        <Card className="border-border/60 bg-card shadow-sm">
          <CardHeader className="pb-0">
            <CardTitle className="text-lg">Account access</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              <TabsContent value="login" className="pt-4">
                <LoginForm />
              </TabsContent>
              <TabsContent value="register" className="pt-4">
                <RegisterForm />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
