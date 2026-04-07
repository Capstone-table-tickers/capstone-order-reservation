import { Card } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionTitle
        eyebrow="Privacy policy"
        title="How we handle your information"
        description="This policy explains the data we collect, how we use it, and how we protect your privacy while using Table Tickers."
      />

      <div className="mt-12 space-y-10">
        <Card className="space-y-6">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900">Introduction</h3>
          </div>
          <p className="text-sm leading-7 text-gray-700">
            Table Tickers is committed to protecting the personal information of our customers in Kokkola and surrounding areas.
            This policy describes the data we collect through the reservation service and how we keep it safe.
          </p>
        </Card>

        <section className="grid gap-6 lg:grid-cols-2">
          <Card className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">Information we collect</h3>
            <ul className="space-y-3 text-sm leading-7 text-gray-700">
              <li>Contact details such as name, email address, and phone number.</li>
              <li>Delivery or pickup address when required for order fulfilment.</li>
              <li>Reservation preferences, order details, and communication history.</li>
              <li>Technical data needed to support the service and improve the platform.</li>
            </ul>
          </Card>

          <Card className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">How we use information</h3>
            <ul className="space-y-3 text-sm leading-7 text-gray-700">
              <li>To process reservations and coordinate pickup or delivery arrangements.</li>
              <li>To answer customer inquiries and provide support.</li>
              <li>To send confirmation messages and important updates about orders.</li>
              <li>To maintain the platform and keep farm operations informed about order needs.</li>
            </ul>
          </Card>
        </section>

        <section className="space-y-6">
          <Card className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">Data storage and protection</h3>
            <p className="text-sm leading-7 text-gray-700">
              We store customer information securely in line with standard industry practices.
              Access is limited to authorized personnel and systems that need the information to manage
              reservations and deliver orders.
            </p>
            <p className="text-sm leading-7 text-gray-700">
              Personal data is retained only for as long as necessary to fulfil reservations, support
              customer service, or comply with legal requirements.
            </p>
          </Card>

          <Card className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">Sharing of information</h3>
            <p className="text-sm leading-7 text-gray-700">
              We do not sell personal information. We may share relevant order details with local delivery
              providers or farm staff when needed to complete a reservation.
            </p>
            <p className="text-sm leading-7 text-gray-700">
              Information may also be shared if required by law or to protect the safety of customers and
              the platform.
            </p>
          </Card>
        </section>

        <section className="space-y-6">
          <Card className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">Your rights</h3>
            <ul className="space-y-3 text-sm leading-7 text-gray-700">
              <li>You can request access to the personal information we hold about you.</li>
              <li>You may ask for corrections to inaccurate data or request deletion when it is no longer needed.</li>
              <li>You can object to direct communications that are not required to manage your reservation.</li>
            </ul>
          </Card>

          <Card className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">Contact information</h3>
            <p className="text-sm leading-7 text-gray-700">
              For privacy questions, please contact us at hello@tabletickers.com or by phone at +358 40 123 4567.
            </p>
            <p className="text-sm leading-7 text-gray-700">
              We aim to respond to privacy inquiries promptly and provide any support you need.
            </p>
          </Card>
        </section>
      </div>
    </div>
  );
}
