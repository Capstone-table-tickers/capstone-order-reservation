import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Prisma } from "@prisma/client";
import { updateProduct, deleteProduct } from "@/lib/product-service";
import { updateProductSchema, productIdSchema } from "@/lib/schemas/product";
import {
  forbiddenResponse,
  notFoundResponse,
  serverErrorResponse,
  successResponse,
  unauthorizedResponse,
  validationErrorResponse,
} from "@/lib/api-response";

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const session = await getServerSession(authOptions);
  if (!session) {
    return unauthorizedResponse();
  }

  if (session.user?.role !== "ADMIN") {
    return forbiddenResponse();
  }

  const paramsResult = productIdSchema.safeParse({ id });
  if (!paramsResult.success) {
    return validationErrorResponse(paramsResult.error.issues, "Invalid product id");
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return validationErrorResponse([], "Request body must be a JSON object");
  }

  const payloadResult = updateProductSchema.safeParse(body);
  if (!payloadResult.success) {
    return validationErrorResponse(payloadResult.error.issues);
  }

  try {
    const product = await updateProduct(paramsResult.data.id, payloadResult.data);
    return successResponse(product);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return notFoundResponse("Product not found");
    }

    console.error("Product update failed:", error);
    return serverErrorResponse("Unable to update product");
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const session = await getServerSession(authOptions);
  if (!session) {
    return unauthorizedResponse();
  }

  if (session.user?.role !== "ADMIN") {
    return forbiddenResponse();
  }

  const paramsResult = productIdSchema.safeParse({ id });
  if (!paramsResult.success) {
    return validationErrorResponse(paramsResult.error.issues, "Invalid product id");
  }

  try {
    const product = await deleteProduct(paramsResult.data.id);
    return successResponse(product);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return notFoundResponse("Product not found");
    }

    console.error("Product deletion failed:", error);
    return serverErrorResponse("Unable to delete product");
  }
}