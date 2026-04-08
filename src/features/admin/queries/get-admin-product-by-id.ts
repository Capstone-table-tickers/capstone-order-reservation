import { prisma } from "@/lib/prisma";
import type { AdminProduct } from "../types";

export async function getAdminProductById(id: string): Promise<AdminProduct | null> {
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      images: {
        select: {
          id: true,
          url: true,
        },
      },
    },
  });

  if (!product) {
    return null;
  }

  return {
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price.toString(),
    stockQuantity: product.stockQuantity,
    isActive: product.isActive,
    createdAt: product.createdAt,
    images: product.images.map((image) => ({
      id: image.id,
      url: image.url,
    })),
  };
}
