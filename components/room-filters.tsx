"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Search, RotateCcw } from "lucide-react"

interface RoomFiltersProps {
  filters: {
    capacity: string
    maxPrice: string
    type: string
  }
  onFilterChange: (key: string, value: string) => void
  onReset: () => void
}

export function RoomFilters({ filters, onFilterChange, onReset }: RoomFiltersProps) {
  return (
    <Card className="border-border/60 bg-card">
      <CardContent className="pt-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
          <div className="flex-1">
            <Label htmlFor="capacity" className="text-sm font-medium text-card-foreground">
              Guests
            </Label>
            <Select
              value={filters.capacity}
              onValueChange={(v) => onFilterChange("capacity", v)}
            >
              <SelectTrigger id="capacity" className="mt-1.5 bg-card text-card-foreground">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="1">1 Guest</SelectItem>
                <SelectItem value="2">2 Guests</SelectItem>
                <SelectItem value="3">3 Guests</SelectItem>
                <SelectItem value="4">4+ Guests</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1">
            <Label htmlFor="maxPrice" className="text-sm font-medium text-card-foreground">
              Max Price / Night
            </Label>
            <Input
              id="maxPrice"
              type="number"
              placeholder="No limit"
              value={filters.maxPrice}
              onChange={(e) => onFilterChange("maxPrice", e.target.value)}
              className="mt-1.5 bg-card text-card-foreground"
            />
          </div>

          <div className="flex-1">
            <Label htmlFor="type" className="text-sm font-medium text-card-foreground">
              Room Type
            </Label>
            <Select
              value={filters.type}
              onValueChange={(v) => onFilterChange("type", v)}
            >
              <SelectTrigger id="type" className="mt-1.5 bg-card text-card-foreground">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="SINGLE">Single</SelectItem>
                <SelectItem value="DOUBLE">Double</SelectItem>
                <SelectItem value="SUITE">Suite</SelectItem>
                <SelectItem value="DELUXE">Deluxe</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Button className="gap-2">
              <Search className="h-4 w-4" />
              Search
            </Button>
            <Button variant="outline" onClick={onReset} className="gap-2 bg-card text-card-foreground">
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
