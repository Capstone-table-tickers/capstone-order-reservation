import { prisma } from "@/lib/prisma";
import type { CreateProductInput, UpdateProductInput } from "@/lib/schemas/product";

const IMAGE_SELECT = { id: true, url: true, isPrimary: true };

function buildImageCreateMany(
  primaryImageUrl?: string,
  galleryImageUrls?: string[],
  legacyImageUrls?: string[],
) {
  const images: { url: string; isPrimary: boolean }[] = [];

  if (primaryImageUrl) {
    images.push({ url: primaryImageUrl, isPrimary: true });
  }

  if (galleryImageUrls?.length) {
    for (const url of galleryImageUrls) {
      images.push({ url, isPrimary: false });
    }
  }

  // Legacy imageUrls: first becomes primary if no explicit primary given, rest are gallery
  if (legacyImageUrls?.length && !primaryImageUrl) {
    images.push({ url: legacyImageUrls[0], isPrimary: true });
    for (const url of legacyImageUrls.slice(1)) {
      images.push({ url, isPrimary: false });
    }
  } else if (legacyImageUrls?.length) {
    for (const url of legacyImageUrls) {
      images.push({ url, isPrimary: false });
    }
  }

  return images;
}

export async function createProduct(data: CreateProductInput) {
  const images = buildImageCreateMany(
    data.primaryImageUrl,
    data.galleryImageUrls,
    data.imageUrls,
  );

  return prisma.product.create({
    data: {
      name: data.name,
      description: data.description,
      price: parseFloat(data.price),
      stockQuantity: data.stockQuantity,
      images: images.length > 0 ? { create: images } : undefined,
    },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      stockQuantity: true,
      isActive: true,
      createdAt: true,
      images: {
        select: IMAGE_SELECT,
        orderBy: { isPrimary: "desc" },
      },
    },
  });
}

export async function updateProduct(productId: string, data: UpdateProductInput) {
  const newImages = buildImageCreateMany(
    data.primaryImageUrl,
    data.galleryImageUrls,
    data.imageUrls,
  );

  // If a new primary image is provided, unset all existing primary flags first
  if (data.primaryImageUrl) {
    await prisma.productImage.updateMany({
      where: { productId },
      data: { isPrimary: false },
    });
  }

  return prisma.product.update({
    where: { id: productId },
    data: {
      ...(data.name !== undefined && { name: data.name }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.price !== undefined && { price: parseFloat(data.price) }),
      ...(data.stockQuantity !== undefined && { stockQuantity: data.stockQuantity }),
      ...(data.isActive !== undefined && { isActive: data.isActive }),
      ...(newImages.length > 0 ? { images: { create: newImages } } : {}),
    },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      stockQuantity: true,
      isActive: true,
      createdAt: true,
      images: {
        select: IMAGE_SELECT,
        orderBy: { isPrimary: "desc" },
      },
    },
  });
}

export async function deleteProduct(productId: string) {
  return prisma.product.update({
    where: { id: productId },
    data: { isActive: false },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      stockQuantity: true,
      isActive: true,
      createdAt: true,
    },
  });
}

export async function deleteProductImage(productId: string, imageId: string) {
  const image = await prisma.productImage.findUnique({
    where: { id: imageId, productId },
    select: { isPrimary: true },
  });

  await prisma.productImage.delete({
    where: { id: imageId, productId },
  });

  // If we deleted the primary, promote the oldest remaining image to primary
  if (image?.isPrimary) {
    const next = await prisma.productImage.findFirst({
      where: { productId },
      orderBy: { id: "asc" },
    });
    if (next) {
      await prisma.productImage.update({
        where: { id: next.id },
        data: { isPrimary: true },
      });
    }
  }
}
