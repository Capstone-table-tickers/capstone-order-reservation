import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { MetricCard } from "@/features/admin/components/MetricCard";
import { getDashboardStats } from "@/features/admin/queries/get-dashboard-stats";

export const metadata: Metadata = {
  title: "Dashboard | Admin — Table Tickers",
};

function getStatusStyle(status: string) {
  switch (status) {
    case "CONFIRMED":
      return "bg-green-100 text-green-800";
    case "COMPLETED":
      return "bg-blue-100 text-blue-800";
    case "CANCELLED":
      return "bg-red-100 text-red-800";
    default:
      return "bg-yellow-100 text-yellow-800";
  }
}

function formatDate(date: Date) {
  return date.toLocaleDateString("fi-FI", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getStockIndicator(stock: number) {
  if (stock === 0) return "text-red-600";
  if (stock <= 3) return "text-red-500";
  return "text-amber-600";
}

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="space-y-10">
      {/* Header */}
      <section className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-6 shadow-sm sm:px-7 sm:py-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-600)]">
              Admin area
            </p>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Dashboard
            </h1>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              Overview of products, reservations, and activity for Table Tickers.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/admin/reservations"
              className="rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-[var(--color-brand-600)] hover:text-[var(--color-brand-700)]"
            >
              View reservations
            </Link>
            <Link
              href="/admin/products/new"
              className="rounded-full bg-[var(--color-brand-700)] px-4 py-2 text-sm font-medium text-white transition hover:bg-[var(--color-brand-800)]"
            >
              Add product
            </Link>
          </div>
        </div>
      </section>

      {/* KPI cards */}
      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Total Products"
          value={stats.totalProducts}
          description={`${stats.activeProducts} active, ${stats.totalProducts - stats.activeProducts} inactive`}
          badgeLabel="Catalog"
          badgeVariant="default"
        />
        <MetricCard
          label="All Reservations"
          value={stats.totalReservations}
          description={`${stats.confirmedReservations} confirmed, ${stats.completedReservations} completed`}
          badgeLabel="Total"
          badgeVariant="outline"
        />
        <MetricCard
          label="Pending Review"
          value={stats.pendingReservations}
          description="Reservations awaiting confirmation from the farm team."
          badgeLabel={stats.pendingReservations > 0 ? "Action needed" : "All clear"}
          badgeVariant={stats.pendingReservations > 0 ? "outline" : "success"}
        />
        <MetricCard
          label="Cancelled"
          value={stats.cancelledReservations}
          description="Reservations that were cancelled by the customer or farm."
          badgeLabel="Archived"
          badgeVariant="default"
        />
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent reservations */}
        <Card className="p-5 sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-gray-900">Recent reservations</h2>
              <p className="mt-0.5 text-xs text-gray-500">Latest 5 reservation requests</p>
            </div>
            <Link
              href="/admin/reservations"
              className="text-sm font-medium text-[var(--color-brand-700)] hover:underline"
            >
              View all →
            </Link>
          </div>

          {stats.recentReservations.length === 0 ? (
            <p className="text-sm text-gray-500">No reservations yet.</p>
          ) : (
            <ul className="space-y-2">
              {stats.recentReservations.map((r) => (
                <li
                  key={r.id}
                  className="flex items-center justify-between rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-muted)] px-3.5 py-3 text-sm"
                >
                  <div className="min-w-0 mr-3">
                    <p className="font-medium text-gray-900 truncate">{r.customerName}</p>
                    <p className="text-xs text-gray-500">
                      {formatDate(r.reservationDate)} · {r.reservationType === "PICKUP" ? "Pickup" : "Delivery"}
                    </p>
                  </div>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${getStatusStyle(r.status)}`}>
                    {r.status.charAt(0) + r.status.slice(1).toLowerCase()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Card>

        {/* Low stock products */}
        <Card className="p-5 sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-gray-900">Low stock products</h2>
              <p className="mt-0.5 text-xs text-gray-500">Products with 5 or fewer units remaining</p>
            </div>
            <Link
              href="/admin/products"
              className="text-sm font-medium text-[var(--color-brand-700)] hover:underline"
            >
              Manage →
            </Link>
          </div>

          {stats.lowStockProducts.length === 0 ? (
            <div className="flex items-center gap-3 rounded-2xl border border-green-100 bg-green-50 p-4">
              <svg className="h-5 w-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-sm text-green-800">All products are well stocked.</p>
            </div>
          ) : (
            <ul className="space-y-2">
              {stats.lowStockProducts.map((p) => (
                <li
                  key={p.id}
                  className="flex items-center justify-between rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-muted)] px-3.5 py-3 text-sm"
                >
                  <div className="min-w-0 mr-3">
                    <p className="font-medium text-gray-900 truncate">{p.name}</p>
                    <p className="text-xs text-gray-500">€{parseFloat(p.price).toFixed(2)}</p>
                  </div>
                  <span className={`shrink-0 font-semibold text-sm ${getStockIndicator(p.stockQuantity)}`}>
                    {p.stockQuantity === 0 ? "Out of stock" : `${p.stockQuantity} left`}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      {/* Quick links */}
      <section className="grid gap-4 sm:grid-cols-3">
        {[
          {
            title: "Manage products",
            description: "Add, edit, or deactivate farm products in the catalog.",
            href: "/admin/products",
            label: "Go to products",
          },
          {
            title: "Reservation pipeline",
            description: "Review pending requests and update reservation statuses.",
            href: "/admin/reservations",
            label: "View reservations",
          },
          {
            title: "Public site",
            description: "Preview the customer-facing product and reservation pages.",
            href: "/products",
            label: "View site",
            external: true,
          },
        ].map((item) => (
          <Card
            key={item.title}
            className="transition hover:border-[var(--color-brand-200)] hover:shadow-md"
          >
            <h3 className="font-semibold text-gray-900">{item.title}</h3>
            <p className="mt-1.5 text-sm leading-6 text-gray-500">{item.description}</p>
            <div className="mt-4">
              <Link
                href={item.href}
                target={item.external ? "_blank" : undefined}
                className="text-sm font-semibold text-[var(--color-brand-700)] hover:underline"
              >
                {item.label} →
              </Link>
            </div>
          </Card>
        ))}
      </section>
    </div>
  );
}
