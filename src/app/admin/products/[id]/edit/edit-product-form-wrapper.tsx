"use client";

import { useRouter } from "next/navigation";
import { AdminProductForm, type ProductFormValues } from "@/features/admin/components/AdminProductForm";

interface EditProductFormWrapperProps {
  productId: string;
  initialValues: ProductFormValues;
}

export function EditProductFormWrapper({
  productId,
  initialValues,
}: EditProductFormWrapperProps) {
  const router = useRouter();

  const handleSuccess = () => {
    router.push("/admin/products");
  };

  return (
    <AdminProductForm
      mode="edit"
      productId={productId}
      initialValues={initialValues}
      onSuccess={handleSuccess}
    />
  );
}
