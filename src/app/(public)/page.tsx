import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function HomePage() {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 py-16 sm:px-6 lg:px-8">
      <SectionTitle
        eyebrow="Welcome to Table Tickers"
        title="Fresh farm products and easy reservations in one place"
        description="Browse available products, make reservations, and connect with the farm through a clean and reliable digital experience."
      />

      <div className="mt-8 flex flex-wrap gap-4">
        <Button href="/products" variant="primary">
          View Products
        </Button>
        <Button href="/reservation" variant="secondary">
          Make Reservation
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <h2 className="text-lg font-semibold text-gray-900">
            Farm Fresh Products
          </h2>
          <p className="mt-2 text-sm leading-6 text-gray-600">
            Explore available products through a clean public catalog.
          </p>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold text-gray-900">
            Simple Reservation Flow
          </h2>
          <p className="mt-2 text-sm leading-6 text-gray-600">
            Reserve quickly without unnecessary steps or confusion.
          </p>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold text-gray-900">
            Clear Communication
          </h2>
          <p className="mt-2 text-sm leading-6 text-gray-600">
            Contact details, policies, and product information are easy to find.
          </p>
        </Card>
      </div>
    </section>
  );
}