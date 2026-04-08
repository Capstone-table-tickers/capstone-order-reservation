import { notFound } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { EditProductFormWrapper } from "./edit-product-form-wrapper";
import { getAdminProductById } from "@/features/admin/queries/get-admin-product-by-id";
import type { ProductFormValues } from "@/features/admin/components/AdminProductForm";

interface EditProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;

  const product = await getAdminProductById(id);

  if (!product) {
    notFound();
  }

  const initialValues: ProductFormValues = {
    name: product.name,
    description: product.description || "",
    price: product.price,
    stockQuantity: String(product.stockQuantity),
    isActive: product.isActive,
  };

  return (
    <div className="space-y-8">
      <SectionTitle
        eyebrow="Edit Product"
        title={`Edit ${product.name}`}
        description="Update the product details below."
      />

      <div className="max-w-2xl">
        <Card className="rounded-3xl border border-gray-200 p-8">
          <EditProductFormWrapper
            productId={id}
            initialValues={initialValues}
          />
        </Card>
      </div>
    </div>
  );
}
