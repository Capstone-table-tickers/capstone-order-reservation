import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-start">
        <div>
          <Badge className="mb-4">About Table Tickers</Badge>
          <SectionTitle
            title="Local farm reservations built for Kokkola"
            description="We make it easy to reserve fresh farm products, pickups, and deliveries from a local farm operation near the Gulf of Bothnia. Our platform keeps the experience simple, reliable, and grounded in the region."
          />
          <div className="mt-8 space-y-6 text-base leading-7 text-gray-600 sm:text-lg">
            <p>
              Table Tickers is a reservation-first service for customers who want farm-fresh
              products without the guesswork. We serve households, chalets, and local businesses
              around Kokkola with a clear product catalog, reservation flow, and dependable
              farm pickup or delivery options.
            </p>
            <p>
              Our platform is designed for people who value quality, transparency, and a simple
              way to secure farm goods ahead of time. Whether you are planning a weekend family
              pickup or arranging deliveries for a small event, Table Tickers helps keep the
              process smooth.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/products" variant="primary">
              Browse products
            </Button>
            <Button href="/reservation" variant="secondary">
              Start reservation
            </Button>
          </div>
        </div>

        <Card className="space-y-6 bg-green-50">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">
              Our focus
            </p>
            <h3 className="mt-3 text-2xl font-semibold text-gray-900">
              Farm-first, reservation-first, Kokkola-ready
            </h3>
          </div>
          <div className="space-y-4 text-sm leading-6 text-gray-700">
            <p>
              We support local farm operations with a digital platform designed around
              product availability and reservation clarity, not shopping cart complexity.
            </p>
            <p>
              The service is intended for customers who want a convenient way to reserve items,
              choose pickup or delivery, and stay informed about the status of their order.
            </p>
          </div>
        </Card>
      </section>

      <section className="mt-16 space-y-10">
        <div className="grid gap-6 lg:grid-cols-3">
          <Card>
            <h3 className="text-xl font-semibold text-gray-900">Who we are</h3>
            <p className="mt-4 text-sm leading-6 text-gray-600">
              A small farm service that connects product availability with reservation
              management for customers in Kokkola and nearby coastal communities.
            </p>
          </Card>
          <Card>
            <h3 className="text-xl font-semibold text-gray-900">What we offer</h3>
            <p className="mt-4 text-sm leading-6 text-gray-600">
              Fresh produce, selected pantry items, and farm specialties that can be
              reserved for pickup or local delivery.
            </p>
          </Card>
          <Card>
            <h3 className="text-xl font-semibold text-gray-900">Why it works</h3>
            <p className="mt-4 text-sm leading-6 text-gray-600">
              Customers get a reliable reservation process, clear logistics, and fewer last-minute
              surprises when orders are ready.
            </p>
          </Card>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-5">
            <SectionTitle
              eyebrow="What we offer"
              title="A polished reservation experience for farm goods"
              description="The platform is centred on clear availability, reservation details, and local delivery or pickup options."
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="border-green-200 bg-white">
                <h3 className="text-lg font-semibold text-gray-900">Fresh seasonal inventory</h3>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Products are presented with availability details so customers can reserve what is ready.
                </p>
              </Card>
              <Card className="border-green-200 bg-white">
                <h3 className="text-lg font-semibold text-gray-900">Pickup & delivery options</h3>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Choose whether to collect from the farm or request local delivery within the service area.
                </p>
              </Card>
              <Card className="border-green-200 bg-white">
                <h3 className="text-lg font-semibold text-gray-900">Simple reservation management</h3>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Reserve your items in advance and receive clear guidance on collection or delivery timing.
                </p>
              </Card>
              <Card className="border-green-200 bg-white">
                <h3 className="text-lg font-semibold text-gray-900">Local farm transparency</h3>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  We keep the service focused on local product offerings and practical communication.
                </p>
              </Card>
            </div>
          </div>

          <div className="space-y-6 rounded-3xl border border-gray-200 bg-gray-50 p-8">
            <h3 className="text-2xl font-semibold text-gray-900">Why customers choose Table Tickers</h3>
            <ul className="space-y-4 text-sm leading-6 text-gray-700">
              <li>
                <strong className="font-semibold text-gray-900">Clear reservations.</strong> Customers can reserve a specific pickup or delivery window with greater confidence.
              </li>
              <li>
                <strong className="font-semibold text-gray-900">Local results.</strong> The service is tailored to the Kokkola region, with practical logistics and realistic product availability.
              </li>
              <li>
                <strong className="font-semibold text-gray-900">Minimal complexity.</strong> No cart-heavy checkout flow — just reserve the items you want and confirm the details.
              </li>
              <li>
                <strong className="font-semibold text-gray-900">Reliable farming support.</strong> We support small-scale farm operations by helping them manage customer orders through a streamlined digital experience.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-16 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">
              Ready to reserve
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-gray-900 sm:text-4xl">
              Start with the available farm products or reserve a pickup today.
            </h2>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button href="/products" variant="primary">
              Browse products
            </Button>
            <Button href="/reservation" variant="secondary">
              Make reservation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
