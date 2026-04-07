import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/Badge";

const featuredProducts = [
  {
    title: "Fresh Farm Produce",
    description:
      "Seasonal fruits and vegetables prepared for easy browsing and ordering.",
    image:
      "https://images.unsplash.com/photo-1569613562636-7492d9f77aed?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Ready Reservations",
    description:
      "Reserve farm items and pickups through a simple, customer-friendly flow.",
    image:
      "https://images.unsplash.com/photo-1591271300850-22d6784e0a7f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Reliable Service",
    description:
      "Clear communication for pickup and delivery arrangements without confusion.",
    image:
      "https://images.unsplash.com/photo-1594282241894-4da286138f44?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-20 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <section className="grid items-center gap-10 lg:grid-cols-2">
        <div className="max-w-2xl">
          <Badge className="mb-4">Fresh farm experience</Badge>

          <SectionTitle
            title="Fresh farm products and easy reservations in one place"
            description="Browse available products, make reservations, and connect with the farm through a clean and reliable digital experience built for convenience."
          />

          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/products" variant="primary">
              View Products
            </Button>
            <Button href="/reservation" variant="secondary">
              Make Reservation
            </Button>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-gray-100 shadow-sm">
          <Image
            src="https://images.unsplash.com/photo-1566804770468-867f6158bda5?auto=format&fit=crop&w=1400&q=80"
            alt="Farm landscape"
            width={1400}
            height={900}
            className="h-[320px] w-full object-cover sm:h-[420px]"
            priority
          />
        </div>
      </section>

      <section className="grid items-center gap-10 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-gray-100 shadow-sm">
            <Image
              src="https://images.unsplash.com/photo-1588165171080-c89acfa5ee83?auto=format&fit=crop&w=1400&q=80"
              alt="Farm produce and natural setting"
              width={1400}
              height={900}
              className="h-[320px] w-full object-cover sm:h-[400px]"
            />
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <SectionTitle
            eyebrow="About the farm"
            title="Simple, fresh, and customer-focused"
            description="Table Tickers brings farm freshness closer to customers through a straightforward digital experience. Our goal is to make product browsing, reservations, and communication easier for both customers and farm staff."
          />
        </div>
      </section>

      <section className="flex flex-col gap-8">
        <SectionTitle
          eyebrow="Featured products"
          title="A preview of what customers can expect"
          description="This section highlights the type of farm products that will be visible in the public catalog."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredProducts.map((product) => (
            <Card key={product.title} className="overflow-hidden p-0">
              <div className="relative">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={1200}
                  height={800}
                  className="h-56 w-full object-cover"
                />
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  {product.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {product.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card className="flex h-full flex-col justify-between">
          <div>
            <SectionTitle
              eyebrow="Reservations"
              title="Reserve quickly without unnecessary steps"
              description="Customers can choose a convenient reservation option, provide their details, and indicate whether they prefer pickup or delivery."
            />
          </div>

          <div className="mt-6">
            <Button href="/reservation" variant="primary">
              Go to Reservation
            </Button>
          </div>
        </Card>

        <Card className="flex h-full flex-col justify-between">
          <div>
            <SectionTitle
              eyebrow="Contact"
              title="Need help or more information?"
              description="Reach out for product questions, reservation support, or general farm inquiries through the contact page."
            />
          </div>

          <div className="mt-6">
            <Button href="/contact" variant="secondary">
              Contact Us
            </Button>
          </div>
        </Card>
      </section>
    </div>
  );
}
 
