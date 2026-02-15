import { getRooms, getReservations, getStaff } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import type { Reservation } from "@/lib/types";
import { BedDouble, CalendarDays, Users, DollarSign } from "lucide-react";

export default async function AdminOverview() {
  const rooms = await getRooms();
  const reservations = await getReservations();
  const staff = await getStaff();

  const isRevenueEligible = (r: Reservation): r is Reservation =>
    r.status !== "CANCELLED";

  const availableRooms = rooms.filter((r) => r.available).length;
  const pendingReservations = reservations.filter(
    (r) => r.status === "PENDING",
  ).length;
  const confirmedReservations = reservations.filter(
    (r) => r.status === "CONFIRMED",
  ).length;
  const totalRevenue = reservations
    .filter(isRevenueEligible)
    .reduce((sum, r) => sum + r.totalPrice, 0);
  const activeStaff = staff.filter((s) => s.active).length;

  const stats = [
    {
      label: "Total Rooms",
      value: rooms.length,
      subtitle: `${availableRooms} available`,
      icon: BedDouble,
    },
    {
      label: "Reservations",
      value: reservations.length,
      subtitle: `${pendingReservations} pending`,
      icon: CalendarDays,
    },
    {
      label: "Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      subtitle: `${confirmedReservations} confirmed`,
      icon: DollarSign,
    },
    {
      label: "Staff Members",
      value: staff.length,
      subtitle: `${activeStaff} active`,
      icon: Users,
    },
  ];

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-border/60 bg-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="mt-1 text-2xl font-bold text-card-foreground">
                    {stat.value}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {stat.subtitle}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8 border-border/60 bg-card">
        <CardHeader>
          <CardTitle className="text-card-foreground">
            Recent Reservations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            {reservations.slice(0, 5).map((res) => {
              const room = res.room;
              return (
                <div
                  key={res.id}
                  className="flex items-center justify-between rounded-lg border border-border/60 p-4"
                >
                  <div>
                    <p className="font-medium text-card-foreground">
                      {res.guestName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {room?.name} &middot; {formatDate(new Date(res.checkIn))}{" "}
                      to {formatDate(new Date(res.checkOut))}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-card-foreground">
                      ${res.totalPrice}
                    </span>
                    <Badge
                      variant={
                        res.status === "CONFIRMED"
                          ? "default"
                          : res.status === "PENDING"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {res.status}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
