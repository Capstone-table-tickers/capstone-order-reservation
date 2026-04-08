import { z } from "zod";

export const reservationFormSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required"),
  phone: z.string().trim().min(1, "Phone number is required"),
  email: z.string().trim().email("Valid email is required"),
  reservationDate: z.string().trim().min(1, "Reservation date is required"),
  reservationTime: z.string().trim().min(1, "Reservation time is required"),
  fulfillmentMethod: z.enum(["PICKUP", "DELIVERY"]),
  address: z.string().trim().optional(),
  notes: z.string().trim().optional(),
}).superRefine((data, ctx) => {
  if (data.fulfillmentMethod === "DELIVERY" && !data.address) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Delivery address is required for delivery reservations",
      path: ["address"],
    });
  }
});

export type ReservationFormInput = z.infer<typeof reservationFormSchema>;

export type ReservationBackendInput = {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  reservationType: "PICKUP" | "DELIVERY";
  reservationDate: string;
  reservationTime: string;
  deliveryAddress?: string;
  notes?: string;
};

export function mapFormToReservation(input: ReservationFormInput): ReservationBackendInput {
  const deliveryAddress = input.address?.trim() || undefined;
  const notes = input.notes?.trim() || undefined;

  return {
    customerName: input.fullName.trim(),
    customerPhone: input.phone.trim(),
    customerEmail: input.email.trim(),
    reservationType: input.fulfillmentMethod,
    reservationDate: input.reservationDate,
    reservationTime: input.reservationTime,
    deliveryAddress,
    notes,
  };
}