import { Card } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";

export default function AdminProductsPage() {
  return (
    <div className="space-y-8">
      <SectionTitle
        eyebrow="Products"
        title="Manage farm products"
        description="Add, edit, and manage available products for farm reservations."
      />

      <Card className="rounded-2xl border border-gray-200 p-8">
        <div className="space-y-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
            Coming soon
          </p>
          <h2 className="text-2xl font-semibold text-gray-900">Products list</h2>
          <p className="mx-auto max-w-md text-base leading-6 text-gray-600">
            The product management interface will allow adding, editing, and removing farm products from the catalog.
          </p>
        </div>
      </Card>
    </div>
  );
}
