import { prisma } from "@/lib/prisma";
import type { AdminProduct } from "../types";

export async function getAdminProducts(): Promise<AdminProduct[]> {
  const products = await prisma.product.findMany({
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
    isActive: product.isActive,
    createdAt: product.createdAt,
    images: product.images.map((image) => ({
      id: image.id,
      url: image.url,
      isPrimary: image.isPrimary,
    })),
  }));
}
