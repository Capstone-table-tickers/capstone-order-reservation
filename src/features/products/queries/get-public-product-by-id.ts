import { prisma } from "@/lib/prisma";
import type { PublicProduct } from "../types";

export async function getPublicProductById(id: string): Promise<PublicProduct | null> {
  const product = await prisma.product.findUnique({
    where: { id, isActive: true },
    include: {
      images: {
        select: { id: true, url: true, isPrimary: true },
        orderBy: { isPrimary: "desc" },
      },
    },
  });

  if (!product) return null;

  return {
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price.toString(),
    stockQuantity: product.stockQuantity,
    imageUrl: product.images[0]?.url ?? null,
    images: product.images.map((image) => ({
      id: image.id,
      url: image.url,
      isPrimary: image.isPrimary,
    })),
  };
}
