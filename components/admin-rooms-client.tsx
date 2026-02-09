"use client"

import React from "react"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import type { Room, RoomType } from "@/lib/types"
import { toast } from "sonner"
import { Plus, Pencil, Trash2 } from "lucide-react"

export function AdminRoomsClient({ initialRooms }: { initialRooms: Room[] }) {
  const [rooms, setRooms] = useState(initialRooms)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Room | null>(null)
  const [form, setForm] = useState({
    number: "",
    name: "",
    type: "SINGLE" as RoomType,
    description: "",
    capacity: "1",
    pricePerNight: "",
    amenities: "",
    available: true,
  })

  function resetForm() {
    setForm({
      number: "",
      name: "",
      type: "SINGLE",
      description: "",
      capacity: "1",
      pricePerNight: "",
      amenities: "",
      available: true,
    })
    setEditing(null)
  }

  function openCreate() {
    resetForm()
    setDialogOpen(true)
  }

  function openEdit(room: Room) {
    setEditing(room)
    setForm({
      number: room.number,
      name: room.name,
      type: room.type,
      description: room.description,
      capacity: String(room.capacity),
      pricePerNight: String(room.pricePerNight),
      amenities: room.amenities.join(", "),
      available: room.available,
    })
    setDialogOpen(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const payload = {
      number: form.number,
      name: form.name,
      type: form.type,
      description: form.description,
      capacity: Number(form.capacity),
      pricePerNight: Number(form.pricePerNight),
      amenities: form.amenities
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean),
      available: form.available,
    }

    try {
      if (editing) {
        const res = await fetch(`/api/rooms/${editing.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error("Failed to update room")
        const updated = await res.json()
        setRooms((prev) =>
          prev.map((r) => (r.id === updated.id ? updated : r))
        )
        toast.success("Room updated successfully")
      } else {
        const res = await fetch("/api/rooms", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error("Failed to create room")
        const created = await res.json()
        setRooms((prev) => [...prev, created])
        toast.success("Room created successfully")
      }
      setDialogOpen(false)
      resetForm()
    } catch {
      toast.error("Something went wrong")
    }
  }

  async function handleDelete(id: string) {
    try {
      const res = await fetch(`/api/rooms/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to delete room")
      setRooms((prev) => prev.filter((r) => r.id !== id))
      toast.success("Room deleted")
    } catch {
      toast.error("Failed to delete room")
    }
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {rooms.length} rooms total
        </p>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreate} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Room
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-foreground">
                {editing ? "Edit Room" : "Add New Room"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-foreground">Room Number</Label>
                  <Input
                    required
                    value={form.number}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, number: e.target.value }))
                    }
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label className="text-foreground">Room Name</Label>
                  <Input
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, name: e.target.value }))
                    }
                    className="mt-1.5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-foreground">Type</Label>
                  <Select
                    value={form.type}
                    onValueChange={(v) =>
                      setForm((p) => ({ ...p, type: v as RoomType }))
                    }
                  >
                    <SelectTrigger className="mt-1.5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SINGLE">Single</SelectItem>
                      <SelectItem value="DOUBLE">Double</SelectItem>
                      <SelectItem value="SUITE">Suite</SelectItem>
                      <SelectItem value="DELUXE">Deluxe</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-foreground">Capacity</Label>
                  <Input
                    type="number"
                    min="1"
                    required
                    value={form.capacity}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, capacity: e.target.value }))
                    }
                    className="mt-1.5"
                  />
                </div>
              </div>

              <div>
                <Label className="text-foreground">Price per Night ($)</Label>
                <Input
                  type="number"
                  min="1"
                  required
                  value={form.pricePerNight}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, pricePerNight: e.target.value }))
                  }
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label className="text-foreground">Description</Label>
                <Textarea
                  required
                  value={form.description}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, description: e.target.value }))
                  }
                  className="mt-1.5"
                  rows={3}
                />
              </div>

              <div>
                <Label className="text-foreground">
                  Amenities (comma-separated)
                </Label>
                <Input
                  value={form.amenities}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, amenities: e.target.value }))
                  }
                  placeholder="Wi-Fi, TV, Air Conditioning"
                  className="mt-1.5"
                />
              </div>

              <div className="flex items-center gap-3">
                <Switch
                  checked={form.available}
                  onCheckedChange={(v) =>
                    setForm((p) => ({ ...p, available: v }))
                  }
                />
                <Label className="text-foreground">Available for booking</Label>
              </div>

              <Button type="submit" className="w-full">
                {editing ? "Save Changes" : "Create Room"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-lg border border-border/60 bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-muted-foreground">Room</TableHead>
              <TableHead className="text-muted-foreground">Type</TableHead>
              <TableHead className="text-muted-foreground">Capacity</TableHead>
              <TableHead className="text-muted-foreground">Price</TableHead>
              <TableHead className="text-muted-foreground">Status</TableHead>
              <TableHead className="text-right text-muted-foreground">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rooms.map((room) => (
              <TableRow key={room.id}>
                <TableCell>
                  <div>
                    <p className="font-medium text-card-foreground">{room.name}</p>
                    <p className="text-sm text-muted-foreground">
                      #{room.number}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{room.type}</Badge>
                </TableCell>
                <TableCell className="text-card-foreground">{room.capacity}</TableCell>
                <TableCell className="font-medium text-card-foreground">
                  ${room.pricePerNight}
                </TableCell>
                <TableCell>
                  <Badge variant={room.available ? "default" : "destructive"}>
                    {room.available ? "Available" : "Unavailable"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openEdit(room)}
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit room</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(room.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete room</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
