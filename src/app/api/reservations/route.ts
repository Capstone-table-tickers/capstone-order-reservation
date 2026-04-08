import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { createReservation } from "@/lib/reservation-service";
import { mapFormToReservation, reservationFormSchema } from "@/lib/schemas/reservation";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const validated = reservationFormSchema.parse(payload);
    const reservationData = mapFormToReservation(validated);
    const reservation = await createReservation(reservationData);

    return NextResponse.json(
      {
        success: true,
        data: reservation,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Validation failed",
            issues: error.issues,
          },
        },
        { status: 400 }
      );
    }

    console.error("Reservation creation failed:", error);

    return NextResponse.json(
      {
        success: false,
        error: {
          message: "Unable to create reservation",
        },
      },
      { status: 500 }
    );
  }
}
