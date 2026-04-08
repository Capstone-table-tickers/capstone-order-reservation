"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import type { AdminProduct, AdminProductImage } from "../types";

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
  existingImages?: AdminProductImage[];
  onSuccess?: (product: AdminProduct) => void;
}

interface FormErrors {
  name?: string;
  description?: string;
  price?: string;
  stockQuantity?: string;
  server?: string;
  image?: string;
}

export function AdminProductForm({
  mode,
  productId,
  initialValues,
  existingImages = [],
  onSuccess,
}: AdminProductFormProps) {
  const [formData, setFormData] = useState<ProductFormValues>({
    name: initialValues?.name ?? "",
    description: initialValues?.description ?? "",
    price: initialValues?.price ?? "",
    stockQuantity: initialValues?.stockQuantity ?? "",
    ...(mode === "edit" && { isActive: initialValues?.isActive ?? true }),
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Split existing images into primary and gallery
  const [currentPrimary, setCurrentPrimary] = useState<AdminProductImage | null>(
    existingImages.find((img) => img.isPrimary) ?? existingImages[0] ?? null,
  );
  const [currentGallery, setCurrentGallery] = useState<AdminProductImage[]>(
    existingImages.filter((img) =>
      img !== (existingImages.find((i) => i.isPrimary) ?? existingImages[0]),
    ),
  );

  // New images to be uploaded/added
  const [newPrimaryUrl, setNewPrimaryUrl] = useState<string | null>(null);
  const [newGalleryUrls, setNewGalleryUrls] = useState<string[]>([]);

  const [uploadingPrimary, setUploadingPrimary] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [deletingImageId, setDeletingImageId] = useState<string | null>(null);

  const primaryFileRef = useRef<HTMLInputElement>(null);
  const galleryFileRef = useRef<HTMLInputElement>(null);

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

  async function uploadFile(
    file: File,
    onStart: () => void,
    onDone: (url: string) => void,
    onError: (msg: string) => void,
    onFinally: () => void,
  ) {
    onStart();
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const result = await res.json();
      if (res.ok && result.success && typeof result.data.url === "string") {
        onDone(result.data.url);
      } else {
        onError(result.error?.message ?? "Upload failed. Please try again.");
      }
    } catch {
      onError("Upload failed. Check your connection.");
    } finally {
      onFinally();
    }
  }

  async function handlePrimaryFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setErrors((prev) => ({ ...prev, image: undefined }));

    await uploadFile(
      file,
      () => setUploadingPrimary(true),
      (url) => setNewPrimaryUrl(url),
      (msg) => setErrors((prev) => ({ ...prev, image: msg })),
      () => {
        setUploadingPrimary(false);
        if (primaryFileRef.current) primaryFileRef.current.value = "";
      },
    );
  }

  async function handleGalleryFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setErrors((prev) => ({ ...prev, image: undefined }));

    await uploadFile(
      file,
      () => setUploadingGallery(true),
      (url) => setNewGalleryUrls((prev) => [...prev, url]),
      (msg) => setErrors((prev) => ({ ...prev, image: msg })),
      () => {
        setUploadingGallery(false);
        if (galleryFileRef.current) galleryFileRef.current.value = "";
      },
    );
  }

  async function handleDeleteExistingImage(imageId: string, isPrimary: boolean) {
    if (!productId) return;
    setDeletingImageId(imageId);

    try {
      const res = await fetch(`/api/admin/products/${productId}/images/${imageId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        if (isPrimary) {
          setCurrentPrimary(null);
        } else {
          setCurrentGallery((prev) => prev.filter((img) => img.id !== imageId));
        }
      } else {
        setErrors((prev) => ({ ...prev, server: "Could not delete image. Please try again." }));
      }
    } catch {
      setErrors((prev) => ({ ...prev, server: "Could not delete image. Check your connection." }));
    } finally {
      setDeletingImageId(null);
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitSuccess(false);
    setErrors({});

    try {
      const endpoint =
        mode === "create" ? "/api/admin/products" : `/api/admin/products/${productId}`;
      const method = mode === "create" ? "POST" : "PATCH";

      const payload: Record<string, unknown> = {
        name: formData.name.trim(),
        description: formData.description.trim() || undefined,
        price: formData.price,
        stockQuantity: Number(formData.stockQuantity),
        ...(newPrimaryUrl && { primaryImageUrl: newPrimaryUrl }),
        ...(newGalleryUrls.length > 0 && { galleryImageUrls: newGalleryUrls }),
      };

      if (mode === "edit" && formData.isActive !== undefined) {
        payload.isActive = formData.isActive;
      }

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitSuccess(true);
        if (onSuccess) onSuccess(result.data);
        if (mode === "create") {
          setFormData({ name: "", description: "", price: "", stockQuantity: "", isActive: true });
          setNewPrimaryUrl(null);
          setNewGalleryUrls([]);
        } else {
          if (result.data?.images) {
            const imgs: AdminProductImage[] = result.data.images;
            const primary = imgs.find((img) => img.isPrimary) ?? imgs[0] ?? null;
            const gallery = imgs.filter((img) => img !== primary);
            setCurrentPrimary(primary);
            setCurrentGallery(gallery);
            setNewPrimaryUrl(null);
            setNewGalleryUrls([]);
          }
        }
      } else {
        if (result.error?.type === "VALIDATION_ERROR") {
          const validationErrors: FormErrors = {};
          if (Array.isArray(result.error.issues)) {
            result.error.issues.forEach((issue: { path?: string[]; message: string }) => {
              const path = issue.path?.[0];
              if (path && path in formData) {
                validationErrors[path as keyof FormErrors] = issue.message;
              }
            });
          }
          if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
          } else {
            setErrors({ server: result.error.message ?? "Validation failed" });
          }
        } else {
          setErrors({ server: result.error?.message ?? "Failed to save product" });
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

  const inputClass = (hasError: boolean) =>
    `w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 transition ${
      hasError
        ? "border-red-300 focus:ring-red-100"
        : "border-[var(--color-border)] focus:ring-[var(--color-brand-100)] focus:border-[var(--color-brand-600)]"
    } ${isSubmitting ? "bg-gray-50" : "bg-white"}`;

  const labelClass = "block text-xs font-semibold uppercase tracking-widest text-gray-500";

  const UploadButton = ({
    label,
    uploading,
    fileRef,
    onChange,
    disabled,
  }: {
    label: string;
    uploading: boolean;
    fileRef: React.RefObject<HTMLInputElement | null>;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled: boolean;
  }) => (
    <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-600 transition hover:border-[var(--color-brand-600)] hover:text-[var(--color-brand-700)]">
      <svg className="h-4 w-4 shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
      </svg>
      {uploading ? "Uploading…" : label}
      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
        className="sr-only"
        onChange={onChange}
        disabled={uploading || disabled}
      />
    </label>
  );

  const ImageThumb = ({
    url,
    label,
    onRemove,
    removing,
  }: {
    url: string;
    label: string;
    onRemove: () => void;
    removing?: boolean;
  }) => (
    <div className="group relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-white">
      <Image src={url} alt={label} fill className="object-cover" sizes="80px" />
      <button
        type="button"
        onClick={onRemove}
        disabled={removing}
        className="absolute inset-0 flex items-center justify-center bg-black/55 opacity-0 transition group-hover:opacity-100"
        aria-label={`Remove ${label}`}
      >
        <span className="text-xs font-semibold text-white">{removing ? "…" : "Remove"}</span>
      </button>
    </div>
  );

  return (
    <Card className="rounded-2xl border border-[var(--color-border)] p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic fields */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label htmlFor="product-name" className={labelClass}>
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              id="product-name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              disabled={isSubmitting}
              className={inputClass(!!errors.name)}
              placeholder="e.g., Organic Tomatoes"
            />
            {errors.name && <p className="text-xs text-red-600">{errors.name}</p>}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="product-price" className={labelClass}>
              Price (€) <span className="text-red-500">*</span>
            </label>
            <input
              id="product-price"
              type="text"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              disabled={isSubmitting}
              className={inputClass(!!errors.price)}
              placeholder="e.g., 4.50"
            />
            {errors.price && <p className="text-xs text-red-600">{errors.price}</p>}
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="product-description" className={labelClass}>
            Description
          </label>
          <textarea
            id="product-description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            disabled={isSubmitting}
            className={inputClass(!!errors.description)}
            placeholder="Describe the product, its origin, and flavor…"
            rows={3}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label htmlFor="product-stock" className={labelClass}>
              Stock Quantity <span className="text-red-500">*</span>
            </label>
            <input
              id="product-stock"
              type="text"
              value={formData.stockQuantity}
              onChange={(e) => setFormData({ ...formData, stockQuantity: e.target.value })}
              disabled={isSubmitting}
              className={inputClass(!!errors.stockQuantity)}
              placeholder="0"
            />
            {errors.stockQuantity && <p className="text-xs text-red-600">{errors.stockQuantity}</p>}
          </div>

          {mode === "edit" && (
            <div className="flex items-center pt-6">
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.isActive ?? true}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  disabled={isSubmitting}
                  className="h-4 w-4 rounded border-gray-300 accent-[var(--color-brand-600)]"
                />
                <span className={labelClass}>Product is active</span>
              </label>
            </div>
          )}
        </div>

        {/* ── Image management ── */}
        <div className="space-y-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-5">
          <p className={labelClass}>Product Images</p>

          {/* Primary image */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-gray-500">
              Primary image{" "}
              <span className="text-gray-400">(shown first on product card and detail page)</span>
            </p>
            <div className="flex flex-wrap items-start gap-3">
              {(currentPrimary || newPrimaryUrl) && (
                <div className="relative">
                  <ImageThumb
                    url={newPrimaryUrl ?? currentPrimary!.url}
                    label="Primary image"
                    onRemove={() => {
                      if (newPrimaryUrl) {
                        setNewPrimaryUrl(null);
                      } else if (currentPrimary) {
                        handleDeleteExistingImage(currentPrimary.id, true);
                      }
                    }}
                    removing={deletingImageId === currentPrimary?.id}
                  />
                  <span className="absolute -top-1.5 -right-1.5 rounded-full bg-[var(--color-brand-600)] px-1.5 py-0.5 text-[10px] font-semibold text-white">
                    Primary
                  </span>
                </div>
              )}
              {!newPrimaryUrl && (
                <UploadButton
                  label={currentPrimary ? "Replace primary" : "Upload primary image"}
                  uploading={uploadingPrimary}
                  fileRef={primaryFileRef}
                  onChange={handlePrimaryFileUpload}
                  disabled={isSubmitting}
                />
              )}
            </div>
          </div>

          {/* Gallery images */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-gray-500">
              Gallery images{" "}
              <span className="text-gray-400">(appear in the image carousel)</span>
            </p>
            <div className="flex flex-wrap items-start gap-3">
              {currentGallery.map((img) => (
                <ImageThumb
                  key={img.id}
                  url={img.url}
                  label="Gallery image"
                  onRemove={() => handleDeleteExistingImage(img.id, false)}
                  removing={deletingImageId === img.id}
                />
              ))}
              {newGalleryUrls.map((url) => (
                <ImageThumb
                  key={url}
                  url={url}
                  label="New gallery image"
                  onRemove={() => setNewGalleryUrls((prev) => prev.filter((u) => u !== url))}
                />
              ))}
              <UploadButton
                label="Add gallery image"
                uploading={uploadingGallery}
                fileRef={galleryFileRef}
                onChange={handleGalleryFileUpload}
                disabled={isSubmitting}
              />
            </div>
          </div>

          {errors.image && <p className="text-xs text-red-600">{errors.image}</p>}
        </div>

        {errors.server && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-sm text-red-700">{errors.server}</p>
          </div>
        )}

        {submitSuccess && (
          <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3">
            <p className="text-sm text-green-700">
              Product {mode === "create" ? "created" : "updated"} successfully.
            </p>
          </div>
        )}

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting || uploadingPrimary || uploadingGallery}>
            {isSubmitting ? "Saving…" : mode === "create" ? "Create Product" : "Update Product"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
