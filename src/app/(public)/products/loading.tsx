import { Card } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";

export default function ProductsLoading() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="mb-10">
        <SectionTitle
          eyebrow="Products"
          title="Fresh farm products available in Kokkola"
          description="Browse our seasonal selection of fruits, vegetables, and farm products. All items are grown locally and available for pickup or delivery."
        />
      </section>

      <section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="aspect-square animate-pulse bg-gray-200" />
              <div className="p-6">
                <div className="h-5 animate-pulse rounded bg-gray-200" />
                <div className="mt-2 h-4 animate-pulse rounded bg-gray-200" />
                <div className="mt-2 h-4 w-3/4 animate-pulse rounded bg-gray-200" />
                <div className="mt-4 h-6 w-16 animate-pulse rounded bg-gray-200" />
              </div>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}