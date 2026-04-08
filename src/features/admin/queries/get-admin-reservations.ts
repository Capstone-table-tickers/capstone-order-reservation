import { prisma } from "@/lib/prisma";
import type { AdminReservation } from "../types";

export async function getAdminReservations(): Promise<AdminReservation[]> {
  return await prisma.reservation.findMany({
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
    },
  });
}
