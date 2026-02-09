"use client"

import React from "react"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import type { Room } from "@/lib/types"
import { toast } from "sonner"
import { CalendarDays, Loader2 } from "lucide-react"

export function BookingForm({ room }: { room: Room }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    checkIn: "",
    checkOut: "",
    guests: "1",
    guestName: "",
    guestEmail: "",
    guestPhone: "",
  })

  const nights = useMemo(() => {
    if (!form.checkIn || !form.checkOut) return 0
    const diff =
      new Date(form.checkOut).getTime() - new Date(form.checkIn).getTime()
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
  }, [form.checkIn, form.checkOut])

  const totalPrice = nights * room.pricePerNight

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (nights <= 0) {
      toast.error("Please select valid check-in and check-out dates.")
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomId: room.id,
          ...form,
          guests: Number(form.guests),
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Failed to create reservation")
      }

      toast.success("Reservation created successfully!")
      router.push("/my-reservations")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="border-border/60 bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-card-foreground">
          <CalendarDays className="h-5 w-5 text-primary" />
          Book This Room
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="checkIn" className="text-card-foreground">Check-in</Label>
              <Input
                id="checkIn"
                name="checkIn"
                type="date"
                required
                value={form.checkIn}
                onChange={handleChange}
                className="mt-1.5 bg-card text-card-foreground"
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
            <div>
              <Label htmlFor="checkOut" className="text-card-foreground">Check-out</Label>
              <Input
                id="checkOut"
                name="checkOut"
                type="date"
                required
                value={form.checkOut}
                onChange={handleChange}
                className="mt-1.5 bg-card text-card-foreground"
                min={form.checkIn || new Date().toISOString().split("T")[0]}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="guests" className="text-card-foreground">Number of Guests</Label>
            <Input
              id="guests"
              name="guests"
              type="number"
              min="1"
              max={room.capacity}
              required
              value={form.guests}
              onChange={handleChange}
              className="mt-1.5 bg-card text-card-foreground"
            />
          </div>

          <Separator />

          <div>
            <Label htmlFor="guestName" className="text-card-foreground">Full Name</Label>
            <Input
              id="guestName"
              name="guestName"
              required
              value={form.guestName}
              onChange={handleChange}
              placeholder="John Doe"
              className="mt-1.5 bg-card text-card-foreground"
            />
          </div>

          <div>
            <Label htmlFor="guestEmail" className="text-card-foreground">Email</Label>
            <Input
              id="guestEmail"
              name="guestEmail"
              type="email"
              required
              value={form.guestEmail}
              onChange={handleChange}
              placeholder="john@example.com"
              className="mt-1.5 bg-card text-card-foreground"
            />
          </div>

          <div>
            <Label htmlFor="guestPhone" className="text-card-foreground">Phone (optional)</Label>
            <Input
              id="guestPhone"
              name="guestPhone"
              type="tel"
              value={form.guestPhone}
              onChange={handleChange}
              placeholder="+48 500 000 000"
              className="mt-1.5 bg-card text-card-foreground"
            />
          </div>

          {nights > 0 && (
            <>
              <Separator />
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>
                    ${room.pricePerNight} x {nights}{" "}
                    {nights === 1 ? "night" : "nights"}
                  </span>
                  <span>${totalPrice}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-card-foreground">
                  <span>Total</span>
                  <span className="text-primary">${totalPrice}</span>
                </div>
              </div>
            </>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Booking..." : "Reserve Now"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
