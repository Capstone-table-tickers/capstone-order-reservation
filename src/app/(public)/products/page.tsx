import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { getPublicProducts } from "@/features/products/queries/get-public-products";

export const metadata: Metadata = {
  title: "Products | Table Tickers",
  description:
    "Browse our seasonal selection of fresh farm produce available for pickup or delivery in Kokkola.",
};

const PLACEHOLDER =
  "https://images.unsplash.com/photo-1588165171080-c89acfa5ee83?auto=format&fit=crop&w=800&q=80";

function getStockBadge(stock: number) {
  if (stock === 0) return { label: "Out of stock", className: "bg-red-100 text-red-800" };
  if (stock <= 5) return { label: `${stock} left`, className: "bg-amber-100 text-amber-800" };
  return null;
}

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
          action={
            <Button href="/reservation" variant="secondary" size="sm">
              Make a reservation anyway
            </Button>
          }
        />
      ) : (
        <section>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => {
              const imageUrl = product.imageUrl ?? PLACEHOLDER;
              const stockBadge = getStockBadge(product.stockQuantity);
              const isAvailable = product.stockQuantity > 0;

              return (
                <Card key={product.id} className="overflow-hidden p-0 transition hover:shadow-md">
                  <Link href={`/products/${product.id}`} className="block">
                    <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                      <Image
                        src={imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover transition duration-300 hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      {stockBadge && (
                        <div className="absolute top-3 left-3">
                          <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${stockBadge.className}`}>
                            {stockBadge.label}
                          </span>
                        </div>
                      )}
                    </div>
                  </Link>

                  <div className="p-4">
                    <Link href={`/products/${product.id}`}>
                      <h3 className="text-base font-semibold text-gray-900 transition hover:text-[var(--color-brand-700)]">
                        {product.name}
                      </h3>
                    </Link>
                    {product.description && (
                      <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                        {product.description}
                      </p>
                    )}
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                      <span className="text-lg font-bold text-[var(--color-brand-700)]">
                        €{parseFloat(product.price).toFixed(2)}
                      </span>
                      <div className="flex gap-2">
                        <Button href={`/products/${product.id}`} variant="secondary" size="sm">
                          View
                        </Button>
                        {isAvailable && (
                          <Button href={`/reservation?productId=${product.id}`} size="sm">
                            Reserve
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
}
