import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Prisma } from "@prisma/client";
import { deleteProductImage } from "@/lib/product-service";
import { imageIdSchema } from "@/lib/schemas/product";
import {
  forbiddenResponse,
  notFoundResponse,
  serverErrorResponse,
  successResponse,
  unauthorizedResponse,
  validationErrorResponse,
} from "@/lib/api-response";

export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ id: string; imageId: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return unauthorizedResponse();
  if (session.user?.role !== "ADMIN") return forbiddenResponse();

  const { id, imageId } = await context.params;

  const paramsResult = imageIdSchema.safeParse({ id, imageId });
  if (!paramsResult.success) {
    return validationErrorResponse(paramsResult.error.issues, "Invalid parameters");
  }

  try {
    await deleteProductImage(paramsResult.data.id, paramsResult.data.imageId);
    return successResponse({ deleted: true });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return notFoundResponse("Image not found");
    }
    console.error("Image deletion failed:", error);
    return serverErrorResponse("Failed to delete image");
  }
}
