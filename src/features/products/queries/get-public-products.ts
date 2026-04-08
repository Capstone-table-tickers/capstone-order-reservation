import { prisma } from "@/lib/prisma";
import type { PublicProduct } from "../types";

export async function getPublicProducts(): Promise<PublicProduct[]> {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
    include: {
      images: {
        select: { id: true, url: true, isPrimary: true },
        orderBy: { isPrimary: "desc" },
      },
    },
  });

  return products.map((product) => ({
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
  }));
}
