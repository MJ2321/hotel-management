"use client";

import { useState, useMemo } from "react";
import { RoomFilters } from "@/components/room-filters";
import { RoomCard } from "@/components/room-card";
import type { Room } from "@/lib/types";

export function RoomsList({ rooms }: { rooms: Room[] }) {
  const [filters, setFilters] = useState({
    capacity: "any",
    maxPrice: "",
    type: "all",
  });

  const isFiniteNumber = (value: number): value is number =>
    Number.isFinite(value);

  const filteredRooms = useMemo(() => {
    let result = [...rooms];

    if (filters.capacity && filters.capacity !== "any") {
      const capacity = Number(filters.capacity);
      if (isFiniteNumber(capacity)) {
        result = result.filter((r) => r.capacity >= capacity);
      }
    }

    if (filters.maxPrice) {
      const maxPrice = Number(filters.maxPrice);
      if (isFiniteNumber(maxPrice)) {
        result = result.filter((r) => r.pricePerNight <= maxPrice);
      }
    }

    if (filters.type && filters.type !== "all") {
      result = result.filter((r) => r.type === filters.type);
    }

    return result;
  }, [rooms, filters]);

  function handleFilterChange(key: string, value: string) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  function handleReset() {
    setFilters({ capacity: "any", maxPrice: "", type: "all" });
  }

  return (
    <div>
      <RoomFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleReset}
      />

      <div className="mt-8">
        {filteredRooms.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border bg-card p-12 text-center">
            <p className="text-muted-foreground">
              No rooms match your filters. Try adjusting your search criteria.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        )}
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        Showing {filteredRooms.length} of {rooms.length} rooms
      </p>
    </div>
  );
}
