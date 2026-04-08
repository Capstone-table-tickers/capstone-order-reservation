import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { createProduct } from "@/lib/product-service";
import { createProductSchema } from "@/lib/schemas/product";
import {
  forbiddenResponse,
  serverErrorResponse,
  successResponse,
  unauthorizedResponse,
  validationErrorResponse,
} from "@/lib/api-response";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return unauthorizedResponse();
  }

  if (session.user?.role !== "ADMIN") {
    return forbiddenResponse();
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return validationErrorResponse([], "Request body must be a JSON object");
  }

  const payloadResult = createProductSchema.safeParse(body);
  if (!payloadResult.success) {
    return validationErrorResponse(payloadResult.error.issues);
  }

  try {
    const product = await createProduct(payloadResult.data);
    return successResponse(product, 201);
  } catch (error) {
    console.error("Product creation failed:", error);
    return serverErrorResponse("Unable to create product");
  }
}