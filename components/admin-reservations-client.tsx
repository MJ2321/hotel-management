"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import type { Reservation, Room, ReservationStatus } from "@/lib/types";
import { toast } from "sonner";
import { Check, X } from "lucide-react";
import { formatDate } from "@/lib/utils";

function StatusBadge({ status }: { status: ReservationStatus }) {
  const variants: Record<
    ReservationStatus,
    "default" | "secondary" | "destructive"
  > = {
    PENDING: "secondary",
    CONFIRMED: "default",
    CANCELLED: "destructive",
  };
  return <Badge variant={variants[status]}>{status}</Badge>;
}

export function AdminReservationsClient({
  initialReservations,
  rooms,
}: {
  initialReservations: Reservation[];
  rooms: Room[];
}) {
  // API serializes dates as strings; parse them into Date objects for client use
  function parseDates(r: Reservation) {
    return {
      ...r,
      // support either Date or string
      checkIn:
        r.checkIn instanceof Date ? r.checkIn : new Date(r.checkIn as any),
      checkOut:
        r.checkOut instanceof Date ? r.checkOut : new Date(r.checkOut as any),
    };
  }

  const [reservations, setReservations] = useState<Reservation[]>(
    initialReservations.map(parseDates),
  );

  function getRoomName(roomId: string) {
    const room = rooms.find((r) => r.id === roomId);
    return room ? `${room.name} (#${room.number})` : "Unknown";
  }

  async function updateStatus(id: string, status: ReservationStatus) {
    try {
      const res = await fetch(`/api/reservations/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update reservation");
      const updated = await res.json();
      const parsed = parseDates(updated);
      setReservations((prev) =>
        prev.map((r) => (r.id === parsed.id ? parsed : r)),
      );
      toast.success(`Reservation ${status.toLowerCase()}`);
    } catch {
      toast.error("Failed to update reservation");
    }
  }

  const pending = reservations.filter((r) => r.status === "PENDING").length;
  const confirmed = reservations.filter((r) => r.status === "CONFIRMED").length;
  const cancelled = reservations.filter((r) => r.status === "CANCELLED").length;

  const chartData: {
    status: ReservationStatus;
    label: string;
    value: number;
    fill: string;
  }[] = [
    {
      status: "CONFIRMED",
      label: "Zaakceptowane",
      value: confirmed,
      fill: "var(--color-CONFIRMED)",
    },
    {
      status: "PENDING",
      label: "W toku",
      value: pending,
      fill: "var(--color-PENDING)",
    },
    {
      status: "CANCELLED",
      label: "Odrzucone",
      value: cancelled,
      fill: "var(--color-CANCELLED)",
    },
  ];

  const chartConfig: ChartConfig = {
    CONFIRMED: {
      label: "Zaakceptowane",
      color: "hsl(var(--chart-1))",
    },
    PENDING: {
      label: "W toku",
      color: "hsl(var(--chart-2))",
    },
    CANCELLED: {
      label: "Odrzucone",
      color: "hsl(var(--chart-3))",
    },
  };

  return (
    <div className="space-y-6">
      <div className="mb-2 flex flex-wrap items-center gap-4">
        <p className="text-sm text-muted-foreground">
          {reservations.length} reservations total
        </p>
        <div className="flex gap-2">
          <Badge variant="secondary">{pending} Pending</Badge>
          <Badge variant="default">{confirmed} Confirmed</Badge>
          <Badge variant="destructive">{cancelled} Cancelled</Badge>
        </div>
      </div>

      <Card className="border-border/60 bg-card shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Status rezerwacji</CardTitle>
          <p className="text-sm text-muted-foreground">
            Podsumowanie zaakceptowanych, odrzuconych i w toku rezerwacji
          </p>
        </CardHeader>
        <CardContent className="pt-0">
          <ChartContainer config={chartConfig} className="h-[260px]">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis
                allowDecimals={false}
                tickLine={false}
                axisLine={false}
                width={24}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={48} />
              <ChartLegend content={<ChartLegendContent />} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="rounded-lg border border-border/60 bg-card overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-muted-foreground">Guest</TableHead>
              <TableHead className="text-muted-foreground">Room</TableHead>
              <TableHead className="text-muted-foreground">Dates</TableHead>
              <TableHead className="text-muted-foreground">Guests</TableHead>
              <TableHead className="text-muted-foreground">Total</TableHead>
              <TableHead className="text-muted-foreground">Status</TableHead>
              <TableHead className="text-right text-muted-foreground">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reservations.map((res) => (
              <TableRow key={res.id}>
                <TableCell>
                  <div>
                    <p className="font-medium text-card-foreground">
                      {res.guestName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {res.guestEmail}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="text-card-foreground">
                  {getRoomName(res.roomId)}
                </TableCell>
                <TableCell>
                  <div className="text-sm text-card-foreground">
                    <p>{formatDate(res.checkIn)}</p>
                    <p className="text-muted-foreground">
                      to {formatDate(res.checkOut)}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="text-card-foreground">
                  {res.guests}
                </TableCell>
                <TableCell className="font-medium text-card-foreground">
                  ${res.totalPrice}
                </TableCell>
                <TableCell>
                  <StatusBadge status={res.status} />
                </TableCell>
                <TableCell className="text-right">
                  {res.status === "PENDING" && (
                    <div className="flex justify-end gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1 bg-card text-card-foreground"
                        onClick={() => updateStatus(res.id, "CONFIRMED")}
                      >
                        <Check className="h-3 w-3" />
                        Confirm
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1 text-destructive hover:text-destructive bg-card"
                        onClick={() => updateStatus(res.id, "CANCELLED")}
                      >
                        <X className="h-3 w-3" />
                        Cancel
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
