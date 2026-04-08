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
  reservationItems: {
    id: string;
    quantity: number;
    product: {
      id: string;
      name: string;
      price: number;
    };
  }[];
};

export type AdminProductImage = {
  id: string;
  url: string;
};

export type AdminProduct = {
  id: string;
  name: string;
  description: string | null;
  price: string;
  stockQuantity: number;
  isActive: boolean;
  createdAt: Date;
  images: AdminProductImage[];
};

