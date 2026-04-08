"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { AdminProductForm, type ProductFormValues } from "@/features/admin/components/AdminProductForm";
import type { AdminProduct } from "@/features/admin/types";

interface EditProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EditProductPage({ params }: EditProductPageProps) {
  const router = useRouter();
  const [productId, setProductId] = useState<string | null>(null);
  const [product, setProduct] = useState<AdminProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unwrapParams = async () => {
      const resolvedParams = await params;
      setProductId(resolvedParams.id);

      // Fetch product
      try {
        const response = await fetch(`/api/admin/products/${resolvedParams.id}`);
        if (!response.ok) {
          setError("Product not found");
          setLoading(false);
          return;
        }

        const data = await response.json();
        if (data.success) {
          setProduct(data.data);
        } else {
          setError(data.error?.message || "Failed to load product");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    unwrapParams();
  }, [params]);

  const handleSuccess = (updated: AdminProduct) => {
    router.push("/admin/products");
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <SectionTitle
          eyebrow="Edit Product"
          title="Loading..."
          description="Please wait while we fetch the product details."
        />
      </div>
    );
  }

  if (error || !product || !productId) {
    return (
      <div className="space-y-8">
        <SectionTitle
          eyebrow="Edit Product"
          title="Product not found"
          description={error || "The product you are looking for does not exist."}
        />
      </div>
    );
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
          <AdminProductForm
            mode="edit"
            productId={productId}
            initialValues={initialValues}
            onSuccess={handleSuccess}
          />
        </Card>
      </div>
    </div>
  );
}
