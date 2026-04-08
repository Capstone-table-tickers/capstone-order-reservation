import { ZodError } from "zod";
import { createReservation } from "@/lib/reservation-service";
import { mapFormToReservation, reservationFormSchema } from "@/lib/schemas/reservation";
import {
  serverErrorResponse,
  successResponse,
  validationErrorResponse,
} from "@/lib/api-response";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const validated = reservationFormSchema.parse(payload);
    const reservationData = mapFormToReservation(validated);
    const reservation = await createReservation(reservationData);

    return successResponse(reservation, 201);
  } catch (error) {
    if (error instanceof ZodError) {
      return validationErrorResponse(error.issues);
    }

    console.error("Reservation creation failed:", error);

    return serverErrorResponse("Unable to create reservation");
  }
}
