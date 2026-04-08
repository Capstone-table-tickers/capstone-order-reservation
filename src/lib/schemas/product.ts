import { z } from "zod";

const imageValueSchema = z
  .string()
  .trim()
  .min(1, "Image path is required")
  .refine((value) => {
    if (value.startsWith("/")) return true;
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  }, "Image must be a valid URL or local path starting with /");

export const createProductSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  description: z.string().trim().optional(),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, "Price must be a valid decimal"),
  stockQuantity: z.number().int().min(0, "Stock quantity must be non-negative"),
  primaryImageUrl: imageValueSchema.optional(),
  galleryImageUrls: z.array(imageValueSchema).optional(),
  // Legacy field: kept for backward compatibility
  imageUrls: z.array(imageValueSchema).optional(),
});

export const updateProductSchema = z.object({
  name: z.string().trim().min(1, "Name is required").optional(),
  description: z.string().trim().optional(),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, "Price must be a valid decimal").optional(),
  stockQuantity: z.number().int().min(0, "Stock quantity must be non-negative").optional(),
  isActive: z.boolean().optional(),
  primaryImageUrl: imageValueSchema.optional(),
  galleryImageUrls: z.array(imageValueSchema).optional(),
  // Legacy field: kept for backward compatibility
  imageUrls: z.array(imageValueSchema).optional(),
});

export const productIdSchema = z.object({
  id: z.string().uuid("Invalid product id"),
});

export const imageIdSchema = z.object({
  id: z.string().uuid("Invalid product id"),
  imageId: z.string().uuid("Invalid image id"),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
