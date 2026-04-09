import type { Metadata } from "next";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { getAdminProducts } from "@/features/admin/queries/get-admin-products";
import { AdminProductActions } from "./admin-product-actions";

export const metadata: Metadata = {
  title: "Products | Admin — Table Tickers",
};

const PLACEHOLDER =
  "https://images.unsplash.com/photo-1588165171080-c89acfa5ee83?auto=format&fit=crop&w=400&q=80";

function formatDate(date: Date) {
  return date.toLocaleDateString("fi-FI", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatCurrency(price: string) {
  return `€${Number(price).toFixed(2)}`;
}

function getStockStyle(stock: number) {
  if (stock === 0) return "text-red-600 font-semibold";
  if (stock <= 5) return "text-amber-600 font-semibold";
  return "text-green-700 font-medium";
}

function truncate(text: string | null, limit = 90) {
  if (!text) return "No description";
  return text.length <= limit ? text : `${text.slice(0, limit)}…`;
}

export default async function AdminProductsPage() {
  const products = await getAdminProducts();

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <SectionTitle
          eyebrow="Products"
          title="Manage farm products"
          description="View and maintain the catalog of farm products available for pickup and delivery."
        />
        <Button href="/admin/products/new" size="sm">
          + Add Product
        </Button>
      </div>

      {products.length === 0 ? (
        <EmptyState
          title="No products yet"
          description="The product catalog is empty. Add your first product to get started."
          action={
            <Button href="/admin/products/new" size="sm">
              Add first product
            </Button>
          }
        />
      ) : (
        <div className="grid gap-4">
          {products.map((product) => {
            const imageUrl = product.images[0]?.url ?? PLACEHOLDER;

            return (
              <Card key={product.id} className="rounded-3xl border border-gray-200 p-5">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                  {/* Thumbnail */}
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl bg-gray-100">
                    <Image
                      src={imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-gray-900">{product.name}</h3>
                      <Badge className={product.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                        {product.isActive ? "Active" : "Inactive"}
                      </Badge>
                      {product.images.length > 0 && (
                        <Badge variant="outline" className="text-xs">
                          {product.images.length} image{product.images.length !== 1 ? "s" : ""}
                        </Badge>
                      )}
                    </div>

                    <p className="text-sm text-gray-500">{truncate(product.description)}</p>

                    <div className="flex flex-wrap gap-4 text-sm">
                      <span className="font-semibold text-green-700">{formatCurrency(product.price)}</span>
                      <span className={getStockStyle(product.stockQuantity)}>
                        {product.stockQuantity === 0
                          ? "Out of stock"
                          : product.stockQuantity <= 5
                          ? `Low stock: ${product.stockQuantity}`
                          : `${product.stockQuantity} in stock`}
                      </span>
                      <span className="text-gray-400">Added {formatDate(product.createdAt)}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-shrink-0 flex-wrap gap-2">
                    <Button variant="secondary" size="sm" href={`/admin/products/${product.id}/edit`}>
                      Edit
                    </Button>
                    <AdminProductActions productId={product.id} productName={product.name} />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
