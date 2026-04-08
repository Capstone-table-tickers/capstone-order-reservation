import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { EditProductFormWrapper } from "./edit-product-form-wrapper";
import { getAdminProductById } from "@/features/admin/queries/get-admin-product-by-id";
import type { ProductFormValues } from "@/features/admin/components/AdminProductForm";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Edit Product | Admin — Table Tickers",
};

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const product = await getAdminProductById(id);

  if (!product) {
    notFound();
  }

  const initialValues: ProductFormValues = {
    name: product.name,
    description: product.description ?? "",
    price: product.price,
    stockQuantity: String(product.stockQuantity),
    isActive: product.isActive,
  };

  return (
    <div className="space-y-8">
      <SectionTitle
        eyebrow="Edit Product"
        title={`Edit: ${product.name}`}
        description="Update the product details, status, and images below."
      />

      <div className="max-w-2xl">
        <EditProductFormWrapper
          productId={id}
          initialValues={initialValues}
          existingImages={product.images}
        />
      </div>
    </div>
  );
}
