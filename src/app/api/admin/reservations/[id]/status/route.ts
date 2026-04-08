import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Prisma, ReservationStatus } from "@prisma/client";
import { updateReservationStatus } from "@/lib/reservation-service";
import {
  forbiddenResponse,
  notFoundResponse,
  serverErrorResponse,
  successResponse,
  unauthorizedResponse,
  validationErrorResponse,
} from "@/lib/api-response";

const reservationIdParamSchema = z.object({
  id: z.string().uuid("Invalid reservation id"),
});

const statusUpdateSchema = z.object({
  status: z.nativeEnum(ReservationStatus),
});

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return unauthorizedResponse();
  }

  if (session.user?.role !== "ADMIN") {
    return forbiddenResponse();
  }

  const paramsResult = reservationIdParamSchema.safeParse(params);
  if (!paramsResult.success) {
    return validationErrorResponse(paramsResult.error.issues, "Invalid reservation id");
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return validationErrorResponse([], "Request body must be a JSON object");
  }

  const payloadResult = statusUpdateSchema.safeParse(body);
  if (!payloadResult.success) {
    return validationErrorResponse(payloadResult.error.issues);
  }

  try {
    const updatedReservation = await updateReservationStatus(
      paramsResult.data.id,
      payloadResult.data.status
    );

    return successResponse(updatedReservation);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return notFoundResponse("Reservation not found");
    }

    console.error("Failed to update reservation status:", error);
    return serverErrorResponse("Unable to update reservation status");
  }
}
