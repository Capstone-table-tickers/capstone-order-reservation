import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { getPublicProducts } from "@/features/products/queries/get-public-products";

export const metadata: Metadata = {
  title: "Table Tickers | Fresh Local Produce, Farm Direct",
  description:
    "Browse and reserve fresh farm produce from Kokkola. Pickup or delivery — simple, local, and convenient.",
};

const PLACEHOLDER =
  "https://images.unsplash.com/photo-1588165171080-c89acfa5ee83?auto=format&fit=crop&w=600&q=80";

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Browse products",
    description: "Explore our seasonal selection of fresh farm produce — fruits, vegetables, and more.",
  },
  {
    step: "02",
    title: "Make a reservation",
    description: "Choose your products, preferred date, and whether you want pickup or delivery.",
  },
  {
    step: "03",
    title: "We confirm",
    description: "Our team reviews and contacts you to confirm your reservation within one business day.",
  },
];

export default async function HomePage() {
  const allProducts = await getPublicProducts();
  const featuredProducts = allProducts.slice(0, 3);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">

      {/* ── Hero ── */}
      <section className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-600)]">
            Local farm · Kokkola, Finland
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Farm-fresh produce,<br className="hidden sm:inline" /> direct reservations
          </h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-gray-500 sm:text-lg">
            Browse locally grown fruits and vegetables, reserve what you need, and choose pickup from our farm or delivery to your door.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button href="/products" size="lg">Browse products</Button>
            <Button href="/reservation" variant="secondary" size="lg">Make a reservation</Button>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-gray-100 shadow-sm">
          <Image
            src="https://images.unsplash.com/photo-1566804770468-867f6158bda5?auto=format&fit=crop&w=1400&q=80"
            alt="Fresh farm produce at Table Tickers"
            width={1400}
            height={900}
            className="h-[260px] w-full object-cover sm:h-[380px] lg:h-[420px]"
            priority
          />
        </div>
      </section>

      {/* ── How it works ── */}
      <section>
        <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-600)]">
          How it works
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {HOW_IT_WORKS.map((item) => (
            <div
              key={item.step}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5"
            >
              <p className="text-2xl font-extrabold text-[var(--color-brand-100)]">{item.step}</p>
              <h3 className="mt-2 text-sm font-semibold text-gray-900">{item.title}</h3>
              <p className="mt-1 text-sm leading-6 text-gray-500">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured products ── */}
      <section className="flex flex-col gap-7">
        <div className="flex items-end justify-between gap-4">
          <SectionTitle
            eyebrow="Products"
            title={featuredProducts.length > 0 ? "What's available now" : "Fresh products coming soon"}
            description={
              featuredProducts.length > 0
                ? "A selection of our current farm offerings, available for pickup or delivery."
                : "We're stocking up our product catalog. Check back soon."
            }
          />
          {featuredProducts.length > 0 && (
            <Link
              href="/products"
              className="hidden shrink-0 text-sm font-semibold text-[var(--color-brand-700)] hover:underline sm:block"
            >
              View all →
            </Link>
          )}
        </div>

        {featuredProducts.length > 0 && (
          <>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProducts.map((product) => {
                const imageUrl = product.imageUrl ?? PLACEHOLDER;
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
                      </div>
                    </Link>
                    <div className="p-4">
                      <Link href={`/products/${product.id}`}>
                        <h3 className="font-semibold text-gray-900 transition hover:text-[var(--color-brand-700)]">
                          {product.name}
                        </h3>
                      </Link>
                      {product.description && (
                        <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                          {product.description}
                        </p>
                      )}
                      <div className="mt-4 flex items-center justify-between">
                        <span className="font-semibold text-[var(--color-brand-700)]">
                          €{parseFloat(product.price).toFixed(2)}
                        </span>
                        {product.stockQuantity > 0 && (
                          <Button href={`/reservation?productId=${product.id}`} size="sm">
                            Reserve
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            <div className="flex justify-center">
              <Button href="/products" variant="secondary" size="lg">
                View all products
              </Button>
            </div>
          </>
        )}
      </section>

      {/* ── About ── */}
      <section className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="order-2 lg:order-1 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-gray-100 shadow-sm">
          <Image
            src="https://images.unsplash.com/photo-1588165171080-c89acfa5ee83?auto=format&fit=crop&w=1400&q=80"
            alt="Fresh produce from Table Tickers farm"
            width={1400}
            height={900}
            className="h-[260px] w-full object-cover sm:h-[360px]"
          />
        </div>

        <div className="order-1 lg:order-2">
          <SectionTitle
            eyebrow="About us"
            title="Farm fresh, community focused"
            description="Table Tickers connects Kokkola residents directly with local farm produce. We believe in short supply chains, fresh products, and building relationships between farms and the people who eat their food."
          />
          <div className="mt-6">
            <Button href="/about" variant="secondary">Learn more about us</Button>
          </div>
        </div>
      </section>

      {/* ── CTA cards ── */}
      <section className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col justify-between rounded-2xl bg-[var(--color-brand-700)] p-7 text-white">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-200)]">
              Ready to reserve?
            </p>
            <h3 className="mt-3 text-xl font-bold leading-snug">
              Reserve farm products for your household
            </h3>
            <p className="mt-2 text-sm leading-6 text-[var(--color-brand-100)]">
              Pick a date, select products, and we&apos;ll handle the rest. Pickup or delivery in Kokkola.
            </p>
          </div>
          <div className="mt-7">
            <Link
              href="/reservation"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-[var(--color-brand-800)] transition hover:bg-[var(--color-brand-50)]"
            >
              Make a reservation
            </Link>
          </div>
        </div>

        <Card className="flex flex-col justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-600)]">
              Questions?
            </p>
            <h3 className="mt-3 text-xl font-bold text-gray-900">Get in touch with us</h3>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              Ask about product availability, delivery areas, or reservation details. We&apos;re happy to help.
            </p>
          </div>
          <div className="mt-7">
            <Button href="/contact" variant="secondary">Contact us</Button>
          </div>
        </Card>
      </section>
    </div>
  );
}
