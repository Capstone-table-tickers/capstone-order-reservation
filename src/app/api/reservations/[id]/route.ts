import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  notFoundResponse,
  serverErrorResponse,
  successResponse,
  validationErrorResponse,
} from "@/lib/api-response";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!id || typeof id !== "string") {
    return validationErrorResponse([], "Invalid reservation ID");
  }

  try {
    const reservation = await prisma.reservation.findUnique({
      where: { id },
      select: {
        id: true,
        customerName: true,
        customerEmail: true,
        customerPhone: true,
        reservationType: true,
        reservationDate: true,
        reservationTime: true,
        deliveryAddress: true,
        notes: true,
        status: true,
        createdAt: true,
        reservationItems: {
          select: {
            id: true,
            quantity: true,
            product: {
              select: {
                id: true,
                name: true,
                price: true,
                images: {
                  select: { url: true },
                  take: 1,
                },
              },
            },
          },
        },
      },
    });

    if (!reservation) {
      return notFoundResponse("Reservation not found");
    }

    // If email is provided, verify it matches (for customer lookup security)
    if (email !== null) {
      if (reservation.customerEmail.toLowerCase() !== email.toLowerCase()) {
        return notFoundResponse("Reservation not found");
      }
    }

    const data = {
      id: reservation.id,
      customerName: reservation.customerName,
      customerEmail: reservation.customerEmail,
      customerPhone: reservation.customerPhone,
      reservationType: reservation.reservationType,
      reservationDate: reservation.reservationDate,
      reservationTime: reservation.reservationTime,
      deliveryAddress: reservation.deliveryAddress,
      notes: reservation.notes,
      status: reservation.status,
      createdAt: reservation.createdAt,
      reservationItems: reservation.reservationItems.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        product: {
          id: item.product.id,
          name: item.product.name,
          price: Number(item.product.price),
          imageUrl: item.product.images[0]?.url ?? null,
        },
      })),
    };

    return successResponse(data);
  } catch (error) {
    console.error("Reservation lookup failed:", error);
    return serverErrorResponse("Unable to retrieve reservation");
  }
}
