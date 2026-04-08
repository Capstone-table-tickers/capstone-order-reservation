import { getAdminReservations } from "@/features/admin/queries/get-admin-reservations";
import { AdminReservationsList } from "@/features/admin/components/AdminReservationsList";

export default async function AdminReservationsPage() {
  const reservations = await getAdminReservations();

  return <AdminReservationsList initialReservations={reservations} />;
}
