import { Card } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";

export default function DeliveryPickupPolicyPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionTitle
        eyebrow="Delivery & pickup"
        title="How pickup and delivery work"
        description="This policy explains the service area, pickup instructions, and what happens if a delivery or collection cannot be completed."
      />

      <div className="mt-12 space-y-10">
        <Card className="space-y-6">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900">Service area</h3>
          </div>
          <p className="text-sm leading-7 text-gray-700">
            Delivery service is available within Kokkola and nearby municipalities where local farm logistics support it.
            We confirm the exact delivery range during reservation and may offer pickup for addresses outside the main service area.
          </p>
        </Card>

        <section className="grid gap-6 lg:grid-cols-2">
          <Card className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">Delivery timing</h3>
            <p className="text-sm leading-7 text-gray-700">
              Delivery windows are assigned when you make a reservation. We aim to arrive within the confirmed window, but
              customers should allow a short buffer for local traffic and farm preparation.
            </p>
          </Card>

          <Card className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">Customer address responsibility</h3>
            <p className="text-sm leading-7 text-gray-700">
              Please provide an accurate delivery address and any specific instructions needed for the driver to locate the property.
              Errors in the address may result in a delayed delivery or a missed first attempt.
            </p>
          </Card>
        </section>

        <Card className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900">Pickup instructions</h3>
          <p className="text-sm leading-7 text-gray-700">
            Pickup orders are collected at the farm address: Farm Road 12, 67100 Kokkola.
            Please bring your reservation reference and arrive during the confirmed pickup hours.
          </p>
          <p className="text-sm leading-7 text-gray-700">
            If you need to change your pickup time, contact us ahead of time so we can update the reservation as needed.
          </p>
        </Card>

        <Card className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900">Missed delivery or pickup</h3>
          <p className="text-sm leading-7 text-gray-700">
            If a delivery attempt cannot be completed or a pickup is missed, we will contact you with next steps.
            A second delivery attempt may be possible depending on schedule and product availability.
          </p>
          <p className="text-sm leading-7 text-gray-700">
            For missed pickups, please get in touch quickly so we can arrange a new collection time.
          </p>
        </Card>

        <Card className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900">Future updates</h3>
          <p className="text-sm leading-7 text-gray-700">
            We may introduce distance-based delivery fees or expanded service zones as the platform evolves.
            Any such changes will be communicated clearly before they affect new reservations.
          </p>
        </Card>
      </div>
    </div>
  );
}
