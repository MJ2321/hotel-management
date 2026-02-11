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
import { Switch } from "@/components/ui/switch"
import type { Staff } from "@/lib/types"
import { toast } from "sonner"
import { Plus, Pencil, Trash2 } from "lucide-react"

export function AdminStaffClient({
  initialStaff,
}: {
  initialStaff: Staff[]
}) {
  // Ensure hireDate fields are real Date objects (API may serialize them as strings)
  function parseStaff(s: Staff) {
    return {
      ...s,
      hireDate: s.hireDate instanceof Date ? s.hireDate : new Date(s.hireDate as any),
    }
  }

  const [staff, setStaff] = useState(initialStaff.map(parseStaff))
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Staff | null>(null)
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    department: "",
    active: true,
  })

  function resetForm() {
    setForm({
      name: "",
      email: "",
      phone: "",
      position: "",
      department: "",
      active: true,
    })
    setEditing(null)
  }

  function openCreate() {
    resetForm()
    setDialogOpen(true)
  }

  function openEdit(member: Staff) {
    setEditing(member)
    setForm({
      name: member.name,
      email: member.email,
      phone: member.phone,
      position: member.position,
      department: member.department,
      active: member.active,
    })
    setDialogOpen(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    try {
      if (editing) {
        const res = await fetch(`/api/staff/${editing.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        })
        if (!res.ok) throw new Error("Failed to update staff")
        const updated = await res.json()
        const parsed = parseStaff(updated)
        setStaff((prev) => prev.map((s) => (s.id === parsed.id ? parsed : s)))
        toast.success("Staff member updated")
      } else {
        const res = await fetch("/api/staff", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        })
        if (!res.ok) throw new Error("Failed to create staff")
        const created = await res.json()
        setStaff((prev) => [...prev, parseStaff(created)])
        toast.success("Staff member added")
      }
      setDialogOpen(false)
      resetForm()
    } catch {
      toast.error("Something went wrong")
    }
  }

  async function handleDelete(id: string) {
    try {
      const res = await fetch(`/api/staff/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to delete")
      setStaff((prev) => prev.filter((s) => s.id !== id))
      toast.success("Staff member removed")
    } catch {
      toast.error("Failed to delete staff member")
    }
  }

  const activeCount = staff.filter((s) => s.active).length

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {staff.length} staff members ({activeCount} active)
        </p>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreate} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Staff
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-foreground">
                {editing ? "Edit Staff Member" : "Add Staff Member"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <Label className="text-foreground">Full Name</Label>
                <Input
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  className="mt-1.5"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-foreground">Email</Label>
                  <Input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, email: e.target.value }))
                    }
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label className="text-foreground">Phone</Label>
                  <Input
                    value={form.phone}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, phone: e.target.value }))
                    }
                    className="mt-1.5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-foreground">Position</Label>
                  <Input
                    required
                    value={form.position}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, position: e.target.value }))
                    }
                    placeholder="e.g. Receptionist"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label className="text-foreground">Department</Label>
                  <Input
                    required
                    value={form.department}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, department: e.target.value }))
                    }
                    placeholder="e.g. Front Desk"
                    className="mt-1.5"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Switch
                  checked={form.active}
                  onCheckedChange={(v) =>
                    setForm((p) => ({ ...p, active: v }))
                  }
                />
                <Label className="text-foreground">Active</Label>
              </div>

              <Button type="submit" className="w-full">
                {editing ? "Save Changes" : "Add Staff Member"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-lg border border-border/60 bg-card overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-muted-foreground">Name</TableHead>
              <TableHead className="text-muted-foreground">Position</TableHead>
              <TableHead className="text-muted-foreground">Department</TableHead>
              <TableHead className="text-muted-foreground">Contact</TableHead>
              <TableHead className="text-muted-foreground">Hired</TableHead>
              <TableHead className="text-muted-foreground">Status</TableHead>
              <TableHead className="text-right text-muted-foreground">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staff.map((member) => (
              <TableRow key={member.id}>
                <TableCell className="font-medium text-card-foreground">
                  {member.name}
                </TableCell>
                <TableCell className="text-card-foreground">{member.position}</TableCell>
                <TableCell className="text-card-foreground">{member.department}</TableCell>
                <TableCell>
                  <div className="text-sm">
                    <p className="text-card-foreground">{member.email}</p>
                    <p className="text-muted-foreground">{member.phone}</p>
                  </div>
                </TableCell>
                <TableCell className="text-card-foreground">{member.hireDate.toDateString()}</TableCell>
                <TableCell>
                  <Badge variant={member.active ? "default" : "secondary"}>
                    {member.active ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openEdit(member)}
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit staff member</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(member.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete staff member</span>
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
