import { prisma } from "@/lib/prisma";
import type { AdminReservation } from "../types";

export async function getAdminReservations(): Promise<AdminReservation[]> {
  const reservations = await prisma.reservation.findMany({
    orderBy: {
      createdAt: "desc",
    },
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
            },
          },
        },
      },
    },
  });

  // Convert Decimal values to plain numbers for client serialization
  const result: AdminReservation[] = reservations.map((reservation) => {
    const items = reservation.reservationItems as Array<{
      id: string;
      quantity: number;
      product: {
        id: string;
        name: string;
        price: any;
      };
    }>;

    return {
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
      reservationItems: items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        product: {
          id: item.product.id,
          name: item.product.name,
          price: Number(item.product.price),
        },
      })),
    };
  });

  return result;
}
