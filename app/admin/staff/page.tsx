import { getStaff } from "@/lib/db"
import { AdminStaffClient } from "@/components/admin-staff-client"

export default function AdminStaffPage() {
  const staff = getStaff()
  return <AdminStaffClient initialStaff={staff} />
}
