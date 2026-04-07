import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { MetricCard, type MetricCardProps } from "@/features/admin/components/MetricCard";

const metrics: MetricCardProps[] = [
  {
    label: "Total Products",
    value: 12,
    description: "Products currently listed for farm reservation and pickup.",
    badgeLabel: "Stable",
    badgeVariant: "success",
  },
  {
    label: "Active Products",
    value: 8,
    description: "Items currently available and ready for customers to reserve.",
    badgeLabel: "Live",
    badgeVariant: "default",
  },
  {
    label: "Reservations (Today)",
    value: 5,
    description: "Reservations created today for pickup or delivery.",
    badgeLabel: "Pending",
    badgeVariant: "outline",
  },
  {
    label: "Pending Reservations",
    value: 3,
    description: "Reservations waiting for confirmation from the farm team.",
    badgeLabel: "Review",
    badgeVariant: "outline",
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-10">
          <section className="overflow-hidden rounded-[2rem] border border-gray-200 bg-white px-6 py-8 shadow-sm sm:px-8 sm:py-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-3xl">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">Admin area</p>
                <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                  Admin Dashboard
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                  Overview of products, reservations, and activity for the farm operation.
                </p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 shadow-sm">
                Last updated: just now
              </div>
            </div>
          </section>

          <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {metrics.map((metric) => (
              <MetricCard key={metric.label} {...metric} />
            ))}
          </section>

          <section>
            <Card className="overflow-hidden rounded-[2rem] border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between sm:pb-8">
                <div>
                  <h2 className="text-xl font-semibold text-slate-950">Quick overview</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                    Placeholder content for future reservation and product activity insights.
                  </p>
                </div>
                <Badge variant="outline" className="border-slate-300 text-slate-700">
                  Preview mode
                </Badge>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 transition duration-200 ease-out hover:border-slate-300 hover:bg-white">
                  <p className="text-sm font-semibold text-slate-900">Reservation flow</p>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    Upcoming reservation events will appear here, keeping the farm team aligned.
                  </p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 transition duration-200 ease-out hover:border-slate-300 hover:bg-white">
                  <p className="text-sm font-semibold text-slate-900">Product status</p>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    Product availability and farm inventory details will be surfaced in a future update.
                  </p>
                </div>
              </div>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}
