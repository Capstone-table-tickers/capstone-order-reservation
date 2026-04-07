import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";

const contactItems = [
  {
    title: "Phone",
    value: "+358 40 123 4567",
    description: "Call us for reservation help, product questions, or order updates.",
  },
  {
    title: "Email",
    value: "hello@tabletickers.com",
    description: "Send inquiries and reservation details to our support team.",
  },
  {
    title: "Location",
    value: "Farm Road 12, 67100 Kokkola, Finland",
    description: "Pickup is available at the farm gate in Kokkola. Delivery service is local to nearby neighbourhoods.",
  },
  {
    title: "Business hours",
    value: "Mon–Sat, 08:00–18:00",
    description: "Reservations and customer support are available during these hours.",
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-start">
        <div>
          <SectionTitle
            eyebrow="Get in touch"
            title="Contact Table Tickers for reservations and support"
            description="We’re happy to help with product questions, reservation details, and pickup or delivery coordination around Kokkola."
          />
          <p className="mt-6 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
            For the fastest response, use the phone or email listed below. If you have an existing reservation,
            include your order reference when you contact us.
          </p>
        </div>

        <Card className="space-y-4 bg-green-50">
          <p className="font-semibold text-green-800">Need quick support?</p>
          <p className="text-sm leading-6 text-gray-700">
            Our team is available most weekdays and Saturdays to answer questions about the available product
            selection, reservation timing, and delivery or pickup instructions.
          </p>
        </Card>
      </div>

      <section className="mt-14 grid gap-6 sm:grid-cols-2">
        {contactItems.map((item) => (
          <Card key={item.title} className="space-y-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">
                {item.title}
              </p>
              <p className="mt-3 text-2xl font-semibold text-gray-900">{item.value}</p>
            </div>
            <p className="text-sm leading-6 text-gray-600">{item.description}</p>
          </Card>
        ))}
      </section>

      <section className="mt-16 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm sm:p-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">
              Ready when you are
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
              Secure your next farm reservation with confidence.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-gray-600">
              If you want to reserve a pickup or local delivery slot, our team is ready to help.
              We can also answer questions about product availability and the pickup process.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button href="/reservation" variant="primary">
              Make a reservation
            </Button>
            <Button href="/products" variant="secondary">
              Browse products
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
