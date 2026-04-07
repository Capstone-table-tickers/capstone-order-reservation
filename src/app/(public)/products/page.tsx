import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { getPublicProducts } from "@/features/products/queries/get-public-products";

export default async function ProductsPage() {
  const products = await getPublicProducts();

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="mb-10">
        <SectionTitle
          eyebrow="Products"
          title="Fresh farm products available in Kokkola"
          description="Browse our seasonal selection of fruits, vegetables, and farm products. All items are grown locally and available for pickup or delivery."
        />
      </section>

      {products.length === 0 ? (
        <EmptyState
          title="No products available"
          description="We're currently updating our product selection. Check back soon for fresh farm products from Kokkola."
        />
      ) : (
        <section>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <div className="aspect-square overflow-hidden rounded-t-2xl bg-gray-100">
                  <Image
                    src="https://images.unsplash.com/photo-1588165171080-c89acfa5ee83?auto=format&fit=crop&w=1400&q=80"
                    alt={product.name}
                    width={400}
                    height={400}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                  {product.description && (
                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                      {product.description}
                    </p>
                  )}
                  <p className="mt-4 text-lg font-semibold text-green-700">
                    €{product.price}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}