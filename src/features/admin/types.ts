import type { ReservationType, ReservationStatus } from "@prisma/client";

export type AdminReservation = {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  reservationType: ReservationType;
  reservationDate: Date;
  reservationTime: string;
  deliveryAddress: string | null;
  notes: string | null;
  status: ReservationStatus;
  createdAt: Date;
};
