import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { getAdminProducts } from "@/features/admin/queries/get-admin-products";
import type { AdminProduct } from "@/features/admin/types";

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

function getActiveLabel(isActive: boolean) {
  return isActive ? "Active" : "Inactive";
}

function getStatusClasses(isActive: boolean) {
  return isActive
    ? "bg-green-100 text-green-800"
    : "bg-red-100 text-red-800";
}

function truncate(text: string | null, limit = 80) {
  if (!text) return "No description";
  return text.length <= limit ? text : `${text.slice(0, limit)}...`;
}

export default async function AdminProductsPage() {
  const products = await getAdminProducts();

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <SectionTitle
            eyebrow="Products"
            title="Manage farm products"
            description="View and maintain the catalog of farm products available for pickup and delivery."
          />
        </div>
        <Button href="/admin/products/new" size="sm">
          Create Product
        </Button>
      </div>

      {products.length === 0 ? (
        <EmptyState
          title="No products yet"
          description="There are no products in the catalog yet. Add product management entries once the first items are ready."
        />
      ) : (
        <div className="grid gap-4">
          {products.map((product) => (
            <Card key={product.id} className="rounded-3xl border border-gray-200 p-6">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">{product.name}</p>
                      <p className="mt-2 text-lg font-semibold text-gray-900">{formatCurrency(product.price)}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge className={getStatusClasses(product.isActive)}>
                        {getActiveLabel(product.isActive)}
                      </Badge>
                      <Badge variant="outline" className="rounded-full px-3 py-1 text-xs uppercase tracking-[0.2em]">
                        {product.images.length} image{product.images.length === 1 ? "" : "s"}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">Description</p>
                      <p className="mt-2 text-sm leading-6 text-gray-700">{truncate(product.description)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">Stock</p>
                      <p className="mt-2 text-sm leading-6 text-gray-700">{product.stockQuantity}</p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-3 min-w-[180px]">
                  <div className="rounded-3xl bg-gray-50 p-4 text-sm text-gray-700 ring-1 ring-inset ring-gray-200">
                    <p className="font-semibold uppercase tracking-[0.2em] text-gray-500">Created</p>
                    <p className="mt-2 text-base font-medium text-gray-900">{formatDate(product.createdAt)}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button variant="secondary" size="sm" href={`/admin/products/${product.id}/edit`}>
                      Edit
                    </Button>
                    <Button variant="secondary" size="sm" href="#">
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
