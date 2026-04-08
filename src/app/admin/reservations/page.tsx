import { Card } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";

export default function AdminReservationsPage() {
  return (
    <div className="space-y-8">
      <SectionTitle
        eyebrow="Reservations"
        title="Manage farm reservations"
        description="View, filter, and manage customer reservations for pickups and deliveries."
      />

      <Card className="rounded-2xl border border-gray-200 p-8">
        <div className="space-y-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
            Coming soon
          </p>
          <h2 className="text-2xl font-semibold text-gray-900">Reservations list</h2>
          <p className="mx-auto max-w-md text-base leading-6 text-gray-600">
            The reservation management interface will display upcoming orders, customer details, and pickup/delivery status.
          </p>
        </div>
      </Card>
    </div>
  );
}
