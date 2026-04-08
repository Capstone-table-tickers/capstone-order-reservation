import { prisma } from "@/lib/prisma";
import type { CreateProductInput, UpdateProductInput } from "@/lib/schemas/product";

export async function createProduct(data: CreateProductInput) {
  return prisma.product.create({
    data: {
      name: data.name,
      description: data.description,
      price: parseFloat(data.price),
      stockQuantity: data.stockQuantity,
    },
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

export async function updateProduct(productId: string, data: UpdateProductInput) {
  return prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      ...(data.name !== undefined && { name: data.name }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.price !== undefined && { price: parseFloat(data.price) }),
      ...(data.stockQuantity !== undefined && { stockQuantity: data.stockQuantity }),
    },
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

export async function deleteProduct(productId: string) {
  return prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      isActive: false,
    },
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