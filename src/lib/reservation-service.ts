import { prisma } from "@/lib/prisma";
import { ReservationBackendInput } from "@/lib/schemas/reservation";

function parseReservationDate(dateString: string): Date {
  const [yearRaw, monthRaw, dayRaw] = dateString.split("-");
  const year = Number(yearRaw);
  const month = Number(monthRaw);
  const day = Number(dayRaw);

  if (!yearRaw || !monthRaw || !dayRaw || Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day)) {
    throw new Error("Invalid reservation date format");
  }

  const date = new Date(Date.UTC(year, month - 1, day));
  if (date.getUTCFullYear() !== year || date.getUTCMonth() + 1 !== month || date.getUTCDate() !== day) {
    throw new Error("Invalid reservation date");
  }

  return date;
}

export async function createReservation(data: ReservationBackendInput) {
  const reservationDate = parseReservationDate(data.reservationDate);

  return prisma.reservation.create({
    data: {
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      customerEmail: data.customerEmail,
      reservationType: data.reservationType,
      reservationDate,
      reservationTime: data.reservationTime,
      deliveryAddress: data.deliveryAddress,
      notes: data.notes,
    },
    select: {
      id: true,
      customerName: true,
      customerPhone: true,
      customerEmail: true,
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
