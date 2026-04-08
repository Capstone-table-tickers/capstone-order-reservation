import { prisma } from "@/lib/prisma";
import type { ReservationStatus } from "@prisma/client";
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

type ReservationItemCreateManyArgs = {
  data: Array<{
    reservationId: string;
    productId: string;
    quantity: number;
  }>;
};

type ReservationTransactionClient = {
  reservation: typeof prisma.reservation;
  product: typeof prisma.product;
  reservationItem: {
    createMany(args: ReservationItemCreateManyArgs): Promise<unknown>;
  };
};

export async function createReservation(data: ReservationBackendInput) {
  const reservationDate = parseReservationDate(data.reservationDate);

  // Enforce delivery address requirement at service layer (defense-in-depth)
  if (data.reservationType === "DELIVERY") {
    if (!data.deliveryAddress || !data.deliveryAddress.trim()) {
      throw new Error("Delivery address is required for delivery reservations");
    }
  }

  return prisma.$transaction(async (tx) => {
    const txClient = tx as unknown as ReservationTransactionClient;

    if (data.products && data.products.length > 0) {
      const productIds = data.products.map((product) => product.productId);
      const uniqueProductIds = Array.from(new Set(productIds));

      if (uniqueProductIds.length !== productIds.length) {
        throw new Error("Duplicate product selections are not allowed");
      }

      const activeProducts = await txClient.product.findMany({
        where: {
          id: { in: uniqueProductIds },
          isActive: true,
        },
        select: {
          id: true,
        },
      });

      if (activeProducts.length !== uniqueProductIds.length) {
        throw new Error("One or more selected products are invalid or inactive");
      }
    }

    const reservation = await txClient.reservation.create({
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

    if (data.products && data.products.length > 0) {
      await txClient.reservationItem.createMany({
        data: data.products.map((product) => ({
          reservationId: reservation.id,
          productId: product.productId,
          quantity: product.quantity,
        })),
      });
    }

    return reservation;
  });
}

export async function updateReservationStatus(
  reservationId: string,
  status: ReservationStatus
) {
  return prisma.reservation.update({
    where: {
      id: reservationId,
    },
    data: {
      status,
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
