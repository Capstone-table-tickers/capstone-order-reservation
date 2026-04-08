import type { Metadata } from "next";
import { getAdminReservations } from "@/features/admin/queries/get-admin-reservations";
import { AdminReservationsList } from "@/features/admin/components/AdminReservationsList";

export const metadata: Metadata = {
  title: "Reservations | Admin — Table Tickers",
};

export default async function AdminReservationsPage() {
  const reservations = await getAdminReservations();

  return <AdminReservationsList initialReservations={reservations} />;
}
