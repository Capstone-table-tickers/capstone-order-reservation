import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/Badge";
import { getAdminReservations } from "@/features/admin/queries/get-admin-reservations";
import type { AdminReservation } from "@/features/admin/types";

function formatDate(date: Date) {
  return date.toLocaleDateString("fi-FI", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getStatusLabel(status: AdminReservation["status"]) {
  return status.charAt(0) + status.slice(1).toLowerCase();
}

function getTypeLabel(type: AdminReservation["reservationType"]) {
  return type === "PICKUP" ? "Pickup" : "Delivery";
}

function getStatusClasses(status: AdminReservation["status"]) {
  switch (status) {
    case "CONFIRMED":
      return "bg-green-100 text-green-800";
    case "COMPLETED":
      return "bg-slate-100 text-slate-900";
    case "CANCELLED":
      return "bg-red-100 text-red-800";
    default:
      return "bg-yellow-100 text-yellow-800";
  }
}

export default async function AdminReservationsPage() {
  const reservations = await getAdminReservations();

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionTitle
          eyebrow="Reservations"
          title="Reservation list"
          description="Browse customer reservations and key details for upcoming pickups and deliveries."
        />
      </div>

      {reservations.length === 0 ? (
        <EmptyState
          title="No reservations yet"
          description="There are currently no reservations in the system. New reservations will appear here once customers place them."
        />
      ) : (
        <div className="grid gap-4">
          {reservations.map((reservation) => (
            <Card key={reservation.id} className="rounded-3xl border border-gray-200 p-6">
              <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
                <div className="space-y-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">Customer</p>
                      <p className="mt-2 text-xl font-semibold text-gray-900">{reservation.customerName}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline" className="rounded-full px-3 py-1 text-xs uppercase tracking-[0.2em]">
                        {getTypeLabel(reservation.reservationType)}
                      </Badge>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${getStatusClasses(
                          reservation.status
                        )}`}
                      >
                        {getStatusLabel(reservation.status)}
                      </span>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Detail label="Date" value={formatDate(reservation.reservationDate)} />
                    <Detail label="Time" value={reservation.reservationTime} />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Detail label="Email" value={reservation.customerEmail} />
                    <Detail label="Phone" value={reservation.customerPhone} />
                  </div>
                </div>

                <div className="space-y-4 rounded-3xl border border-gray-200 bg-gray-50 p-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">Delivery address</p>
                    <p className="mt-2 text-sm leading-6 text-gray-700">
                      {reservation.deliveryAddress || "Pickup location"}
                    </p>
                  </div>

                  {reservation.notes ? (
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">Notes</p>
                      <p className="mt-2 text-sm leading-6 text-gray-700">{reservation.notes}</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">Notes</p>
                      <p className="mt-2 text-sm leading-6 text-gray-500">No additional notes</p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function Detail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-3xl bg-white px-4 py-4 shadow-sm ring-1 ring-inset ring-gray-200">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">{label}</p>
      <p className="mt-2 text-sm leading-6 text-gray-700">{value}</p>
    </div>
  );
}
