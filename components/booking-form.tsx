"use client";

import React from "react";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { Room } from "@/lib/types";
import { toast } from "sonner";
import { CalendarDays, Loader2, ArrowRight, ArrowLeft } from "lucide-react";

const dateString = z
  .string()
  .min(1, "Date is required")
  .refine((val) => !Number.isNaN(new Date(val).getTime()), "Invalid date");

const bookingSchema = (capacity: number) =>
  z
    .object({
      checkIn: dateString,
      checkOut: dateString,
      guests: z.coerce
        .number()
        .min(1, "At least 1 guest")
        .max(capacity, `Max ${capacity} guests`),
      guestName: z.string().min(2, "Enter full name"),
      guestEmail: z.string().email("Enter a valid email"),
      guestPhone: z.string().optional(),
    })
    .refine(
      (values) =>
        new Date(values.checkOut).getTime() >
        new Date(values.checkIn).getTime(),
      { message: "Check-out must be after check-in", path: ["checkOut"] },
    );

type BookingValues = z.infer<ReturnType<typeof bookingSchema>>;

export function BookingForm({ room }: { room: Room }) {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const checkInRef = useRef<HTMLInputElement>(null);
  const guestNameRef = useRef<HTMLInputElement>(null);

  const form = useForm<BookingValues>({
    resolver: zodResolver(bookingSchema(room.capacity)),
    defaultValues: {
      checkIn: "",
      checkOut: "",
      guests: 1,
      guestName: "",
      guestEmail: "",
      guestPhone: "",
    },
  });

  const values = form.watch();

  useEffect(() => {
    if (step === 1) {
      checkInRef.current?.focus();
    } else {
      guestNameRef.current?.focus();
    }
  }, [step]);

  const nights = useMemo(() => {
    if (!values.checkIn || !values.checkOut) return 0;
    const diff =
      new Date(values.checkOut).getTime() - new Date(values.checkIn).getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }, [values.checkIn, values.checkOut]);

  const totalPrice = nights * room.pricePerNight;

  const goNext = async () => {
    const valid = await form.trigger(["checkIn", "checkOut", "guests"], {
      shouldFocus: true,
    });
    if (valid) setStep(2);
  };

  const onSubmit = async (values: BookingValues) => {
    if (nights <= 0) {
      toast.error("Please select valid check-in and check-out dates.");
      setStep(1);
      return;
    }

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomId: room.id,
          ...values,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to create reservation");
      }

      toast.success("Reservation created successfully!");
      router.push("/my-reservations");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <Card className="border-border/60 bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-card-foreground">
          <CalendarDays className="h-5 w-5 text-primary" />
          Book This Room
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {step === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="checkIn"
                    render={({ field }) => {
                      const { ref: fieldRef, ...fieldProps } = field;
                      return (
                        <FormItem>
                          <FormLabel>Check-in</FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              min={new Date().toISOString().split("T")[0]}
                              className="bg-card text-card-foreground"
                              ref={(el) => {
                                fieldRef(el);
                                checkInRef.current = el;
                              }}
                              {...fieldProps}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />

                  <FormField
                    control={form.control}
                    name="checkOut"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Check-out</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            min={
                              values.checkIn ||
                              new Date().toISOString().split("T")[0]
                            }
                            className="bg-card text-card-foreground"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="guests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Guests</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          max={room.capacity}
                          className="bg-card text-card-foreground"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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

                <div className="flex justify-end">
                  <Button type="button" onClick={goNext} className="gap-2">
                    Next
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="guestName"
                  render={({ field }) => {
                    const { ref: fieldRef, ...fieldProps } = field;
                    return (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="John Doe"
                            className="bg-card text-card-foreground"
                            ref={(el) => {
                              fieldRef(el);
                              guestNameRef.current = el;
                            }}
                            {...fieldProps}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name="guestEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          className="bg-card text-card-foreground"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="guestPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone (optional)</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="+48 500 000 000"
                          className="bg-card text-card-foreground"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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

                <div className="flex items-center justify-between gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="gap-2"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting && (
                      <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                    )}
                    {form.formState.isSubmitting ? "Booking..." : "Reserve Now"}
                  </Button>
                </div>
              </div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
