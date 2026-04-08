import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { randomUUID } from "crypto";
import {
  forbiddenResponse,
  serverErrorResponse,
  successResponse,
  unauthorizedResponse,
  validationErrorResponse,
} from "@/lib/api-response";

const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return unauthorizedResponse();
  if (session.user?.role !== "ADMIN") return forbiddenResponse();

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return validationErrorResponse([], "A file is required");
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return validationErrorResponse([], "Only JPEG, PNG, WebP, and GIF images are allowed");
    }

    if (file.size > MAX_SIZE_BYTES) {
      return validationErrorResponse([], "File size must be under 5 MB");
    }

    const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
    const filename = `${randomUUID()}.${ext}`;
    const uploadDir = join(process.cwd(), "public", "uploads", "products");

    await mkdir(uploadDir, { recursive: true });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(join(uploadDir, filename), buffer);

    return successResponse({ url: `/uploads/products/${filename}` }, 201);
  } catch (error) {
    console.error("File upload failed:", error);
    return serverErrorResponse("Failed to upload file");
  }
}
