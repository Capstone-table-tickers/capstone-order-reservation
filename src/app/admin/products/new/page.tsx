"use client";

import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { AdminProductForm } from "@/features/admin/components/AdminProductForm";
import type { AdminProduct } from "@/features/admin/types";

export default function CreateProductPage() {
  const router = useRouter();

  const handleSuccess = (product: AdminProduct) => {
    // Redirect to products list after successful creation
    router.push("/admin/products");
  };

  return (
    <div className="space-y-8">
      <SectionTitle
        eyebrow="Create Product"
        title="Add a new farm product"
        description="Fill in the product details below to add it to the catalog."
      />

      <div className="max-w-2xl">
        <Card className="rounded-3xl border border-gray-200 p-8">
          <AdminProductForm
            mode="create"
            onSuccess={handleSuccess}
          />
        </Card>
      </div>
    </div>
  );
}
