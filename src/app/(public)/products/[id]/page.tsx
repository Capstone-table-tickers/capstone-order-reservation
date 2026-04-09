import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getPublicProductById } from "@/features/products/queries/get-public-product-by-id";
import { ProductImageGallery } from "@/features/products/components/ProductImageGallery";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getPublicProductById(id);

  if (!product) {
    return { title: "Product not found | Table Tickers" };
  }

  return {
    title: `${product.name} | Table Tickers`,
    description: product.description ?? `Reserve ${product.name} from Table Tickers — fresh local farm produce in Kokkola.`,
  };
}

function getStockStatus(stock: number) {
  if (stock === 0) return { label: "Out of stock", className: "bg-red-100 text-red-800" };
  if (stock <= 5) return { label: `Only ${stock} left`, className: "bg-amber-100 text-amber-800" };
  return { label: "In stock", className: "bg-green-100 text-green-800" };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getPublicProductById(id);

  if (!product) {
    notFound();
  }

  const stockStatus = getStockStatus(product.stockQuantity);
  const isAvailable = product.stockQuantity > 0;

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-7 flex items-center gap-1.5 text-sm text-gray-400" aria-label="Breadcrumb">
        <Link href="/products" className="transition hover:text-[var(--color-brand-700)]">Products</Link>
        <span aria-hidden="true">/</span>
        <span className="text-gray-700 font-medium truncate max-w-[200px]">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Gallery */}
        <ProductImageGallery images={product.images} productName={product.name} />

        {/* Product info */}
        <div className="space-y-5">
          <div>
            <Badge className={stockStatus.className}>{stockStatus.label}</Badge>
            <h1 className="mt-3 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {product.name}
            </h1>
            {product.description && (
              <p className="mt-3 text-base leading-7 text-gray-500">{product.description}</p>
            )}
          </div>

          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 space-y-3">
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-gray-500">Price per unit</span>
              <span className="text-2xl font-bold text-[var(--color-brand-700)]">
                €{parseFloat(product.price).toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Available quantity</span>
              <span className="font-semibold text-gray-800">{product.stockQuantity} units</span>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            {isAvailable ? (
              <Button href={`/reservation?productId=${product.id}`} size="lg" className="w-full">
                Reserve this product
              </Button>
            ) : (
              <button
                disabled
                className="inline-flex w-full cursor-not-allowed items-center justify-center rounded-full bg-gray-100 px-8 py-3.5 text-sm font-semibold text-gray-400"
              >
                Out of stock
              </button>
            )}
            <Button href="/products" variant="secondary" size="lg" className="w-full">
              ← Back to products
            </Button>
          </div>

          <div className="rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-muted)] p-4 text-sm text-gray-500 space-y-1.5">
            <p className="font-semibold text-gray-700">How reservations work</p>
            <ul className="space-y-1">
              <li>• Choose pickup from our farm or request delivery.</li>
              <li>• We confirm your reservation within one business day.</li>
              <li>• No payment required at reservation — pay on collection.</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
