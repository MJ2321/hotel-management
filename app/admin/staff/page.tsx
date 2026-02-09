import { getStaff } from "@/lib/db"
import { AdminStaffClient } from "@/components/admin-staff-client"

export default async function AdminStaffPage() {
  const staff = await getStaff()
  return <AdminStaffClient initialStaff={staff} />
}
