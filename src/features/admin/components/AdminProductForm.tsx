"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import type { AdminProduct } from "../types";

export interface ProductFormValues {
  name: string;
  description: string;
  price: string;
  stockQuantity: string;
  isActive?: boolean;
}

export interface AdminProductFormProps {
  mode: "create" | "edit";
  productId?: string;
  initialValues?: ProductFormValues;
  onSuccess?: (product: AdminProduct) => void;
}

interface FormErrors {
  name?: string;
  description?: string;
  price?: string;
  stockQuantity?: string;
  server?: string;
}

export function AdminProductForm({
  mode,
  productId,
  initialValues,
  onSuccess,
}: AdminProductFormProps) {
  const [formData, setFormData] = useState<ProductFormValues>({
    name: initialValues?.name || "",
    description: initialValues?.description || "",
    price: initialValues?.price || "",
    stockQuantity: initialValues?.stockQuantity || "",
    ...(mode === "edit" && { isActive: initialValues?.isActive ?? true }),
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (formData.price) {
      if (!/^\d+(\.\d{1,2})?$/.test(formData.price)) {
        newErrors.price = "Price must be a valid decimal (e.g., 10.50)";
      }
    } else {
      newErrors.price = "Price is required";
    }

    if (formData.stockQuantity === "") {
      newErrors.stockQuantity = "Stock quantity is required";
    } else if (!/^\d+$/.test(formData.stockQuantity)) {
      newErrors.stockQuantity = "Stock quantity must be a whole number";
    } else if (Number(formData.stockQuantity) < 0) {
      newErrors.stockQuantity = "Stock quantity cannot be negative";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitSuccess(false);
    setErrors({});

    try {
      const endpoint = mode === "create" ? "/api/admin/products" : `/api/admin/products/${productId}`;
      const method = mode === "create" ? "POST" : "PATCH";

      const payload: any = {
        name: formData.name.trim(),
        description: formData.description.trim() || undefined,
        price: formData.price,
        stockQuantity: Number(formData.stockQuantity),
      };

      if (mode === "edit" && formData.isActive !== undefined) {
        payload.isActive = formData.isActive;
      }

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitSuccess(true);
        if (onSuccess) {
          onSuccess(result.data);
        }
        // Reset form for create mode
        if (mode === "create") {
          setFormData({
            name: "",
            description: "",
            price: "",
            stockQuantity: "",
            isActive: true,
          });
        }
      } else {
        if (result.error?.type === "VALIDATION_ERROR") {
          const validationErrors: FormErrors = {};
          if (Array.isArray(result.error.issues)) {
            result.error.issues.forEach((issue: any) => {
              const path = issue.path?.[0];
              if (path && path in formData) {
                validationErrors[path as keyof FormErrors] = issue.message;
              }
            });
          }
          if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
          } else {
            setErrors({ server: result.error.message || "Validation failed" });
          }
        } else {
          setErrors({ server: result.error?.message || "Failed to save product" });
        }
      }
    } catch (error) {
      setErrors({
        server: error instanceof Error ? error.message : "An unexpected error occurred",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="rounded-3xl border border-gray-200 p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Name Field */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold uppercase tracking-[0.2em] text-gray-700">
              Product Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              disabled={isSubmitting}
              className={`w-full rounded-2xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 ${
                errors.name
                  ? "border-red-300 focus:ring-red-500"
                  : "border-gray-300 focus:ring-green-500"
              } ${isSubmitting ? "bg-gray-50" : "bg-white"}`}
              placeholder="e.g., Organic Tomatoes"
            />
            {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
          </div>

          {/* Price Field */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold uppercase tracking-[0.2em] text-gray-700">
              Price (€) *
            </label>
            <input
              type="text"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              disabled={isSubmitting}
              className={`w-full rounded-2xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 ${
                errors.price
                  ? "border-red-300 focus:ring-red-500"
                  : "border-gray-300 focus:ring-green-500"
              } ${isSubmitting ? "bg-gray-50" : "bg-white"}`}
              placeholder="e.g., 4.50"
            />
            {errors.price && <p className="text-sm text-red-600">{errors.price}</p>}
          </div>
        </div>

        {/* Description Field */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold uppercase tracking-[0.2em] text-gray-700">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            disabled={isSubmitting}
            className={`w-full rounded-2xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 ${
              errors.description
                ? "border-red-300 focus:ring-red-500"
                : "border-gray-300 focus:ring-green-500"
            } ${isSubmitting ? "bg-gray-50" : "bg-white"}`}
            placeholder="Describe the product..."
            rows={4}
          />
          {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
        </div>

        {/* Stock Quantity Field */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold uppercase tracking-[0.2em] text-gray-700">
            Stock Quantity *
          </label>
          <input
            type="text"
            value={formData.stockQuantity}
            onChange={(e) => setFormData({ ...formData, stockQuantity: e.target.value })}
            disabled={isSubmitting}
            className={`w-full rounded-2xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 ${
              errors.stockQuantity
                ? "border-red-300 focus:ring-red-500"
                : "border-gray-300 focus:ring-green-500"
            } ${isSubmitting ? "bg-gray-50" : "bg-white"}`}
            placeholder="0"
          />
          {errors.stockQuantity && <p className="text-sm text-red-600">{errors.stockQuantity}</p>}
        </div>

        {/* Active Toggle (Edit mode only) */}
        {mode === "edit" && (
          <div className="space-y-2">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={formData.isActive ?? true}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                disabled={isSubmitting}
                className="h-4 w-4 rounded border-gray-300 focus:ring-green-500"
              />
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-700">
                Product is active
              </span>
            </label>
          </div>
        )}

        {/* Server Error */}
        {errors.server && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-700">{errors.server}</p>
          </div>
        )}

        {/* Success Message */}
        {submitSuccess && (
          <div className="rounded-2xl border border-green-200 bg-green-50 p-4">
            <p className="text-sm text-green-700">
              Product {mode === "create" ? "created" : "updated"} successfully!
            </p>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end gap-3">
          <Button
            type="submit"
            disabled={isSubmitting}
            className={isSubmitting ? "opacity-50" : ""}
          >
            {isSubmitting ? "Saving..." : mode === "create" ? "Create Product" : "Update Product"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
