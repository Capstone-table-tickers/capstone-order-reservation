"use client";

import { useRouter } from "next/navigation";
import { AdminProductForm, type ProductFormValues } from "@/features/admin/components/AdminProductForm";
import type { AdminProductImage } from "@/features/admin/types";

interface EditProductFormWrapperProps {
  productId: string;
  initialValues: ProductFormValues;
  existingImages: AdminProductImage[];
}

export function EditProductFormWrapper({
  productId,
  initialValues,
  existingImages,
}: EditProductFormWrapperProps) {
  const router = useRouter();

  const handleSuccess = () => {
    router.push("/admin/products");
    router.refresh();
  };

  return (
    <AdminProductForm
      mode="edit"
      productId={productId}
      initialValues={initialValues}
      existingImages={existingImages}
      onSuccess={handleSuccess}
    />
  );
}
