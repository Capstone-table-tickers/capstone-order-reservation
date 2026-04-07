import { Card } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";

export default function BookingPolicyPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionTitle
        eyebrow="Booking policy"
        title="Reservation terms for farm orders"
        description="This policy outlines how reservations work, what customers are responsible for, and how changes and cancellations are handled."
      />

      <div className="mt-12 space-y-10">
        <Card className="space-y-6">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900">Reservations and bookings</h3>
          </div>
          <p className="text-sm leading-7 text-gray-700">
            Reservations are confirmed once a customer completes the reservation flow and receives an order reference.
            Availability is subject to the farm’s current inventory and pickup or delivery schedule.
          </p>
        </Card>

        <section className="grid gap-6 lg:grid-cols-2">
          <Card className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">Customer responsibilities</h3>
            <ul className="space-y-3 text-sm leading-7 text-gray-700">
              <li>Provide accurate contact details and delivery or pickup information.</li>
              <li>Arrive on time for the scheduled pickup window or ensure the delivery address is correct.</li>
              <li>Review reservation details carefully before confirming the order.</li>
            </ul>
          </Card>

          <Card className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">Availability</h3>
            <p className="text-sm leading-7 text-gray-700">
              Product availability is updated regularly but may change based on harvest timing and demand.
              We recommend making reservations early for popular pickups and deliveries.
            </p>
          </Card>
        </section>

        <section className="space-y-6">
          <Card className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">Cancellations and changes</h3>
            <p className="text-sm leading-7 text-gray-700">
              If you need to cancel or modify a reservation, contact us as soon as possible.
              We review changes on a case-by-case basis and will confirm whether your request can be accommodated.
            </p>
            <p className="text-sm leading-7 text-gray-700">
              Reservations may be cancelled if required information is missing or if the requested pickup/delivery window cannot be met.
            </p>
          </Card>

          <Card className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">Pickup and delivery expectations</h3>
            <ul className="space-y-3 text-sm leading-7 text-gray-700">
              <li>Pickup is available at the farm location in Kokkola during the specified hours.</li>
              <li>Delivery is offered within local service areas and depends on the selected delivery window.</li>
              <li>Customers should review the pickup instructions and arrive within the scheduled time.</li>
            </ul>
          </Card>
        </section>

        <Card className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900">Policy updates</h3>
          <p className="text-sm leading-7 text-gray-700">
            We may update our booking policy from time to time to reflect changing farm operations, schedule adjustments,
            or improved service procedures. Updated terms will be published on this page.
          </p>
          <p className="text-sm leading-7 text-gray-700">
            Customers are responsible for reviewing the latest policy before making a reservation.
          </p>
        </Card>
      </div>
    </div>
  );
}
