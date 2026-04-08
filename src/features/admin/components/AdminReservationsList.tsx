"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/Badge";
import type { AdminReservation } from "../types";
import { ReservationStatusControl } from "./ReservationStatusControl";

interface AdminReservationsListProps {
  initialReservations: AdminReservation[];
}

function formatDate(date: Date) {
  return date.toLocaleDateString("fi-FI", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("fi-FI", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}

function calculateReservationTotal(reservation: AdminReservation): number {
  if (!reservation.reservationItems || reservation.reservationItems.length === 0) {
    return 0;
  }

  return reservation.reservationItems.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);
}

function getStatusLabel(status: AdminReservation["status"]) {
  return status.charAt(0) + status.slice(1).toLowerCase();
}

function getTypeLabel(type: AdminReservation["reservationType"]) {
  return type === "PICKUP" ? "Pickup" : "Delivery";
}

function getStatusClasses(status: AdminReservation["status"]) {
  switch (status) {
    case "CONFIRMED":
      return "bg-green-100 text-green-800";
    case "COMPLETED":
      return "bg-slate-100 text-slate-900";
    case "CANCELLED":
      return "bg-red-100 text-red-800";
    default:
      return "bg-yellow-100 text-yellow-800";
  }
}

export function AdminReservationsList({ initialReservations }: AdminReservationsListProps) {
  const [reservations, setReservations] = useState(initialReservations);

  const updateReservationStatus = (id: string, newStatus: AdminReservation["status"]) => {
    setReservations((prev) =>
      prev.map((res) => (res.id === id ? { ...res, status: newStatus } : res))
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionTitle
          eyebrow="Reservations"
          title="Reservation list"
          description="Browse customer reservations and key details for upcoming pickups and deliveries."
        />
      </div>

      {reservations.length === 0 ? (
        <EmptyState
          title="No reservations yet"
          description="There are currently no reservations in the system. New reservations will appear here once customers place them."
        />
      ) : (
        <div className="grid gap-4">
          {reservations.map((reservation) => {
            const total = calculateReservationTotal(reservation);
            const hasProducts = reservation.reservationItems && reservation.reservationItems.length > 0;

            return (
              <Card key={reservation.id} className="rounded-3xl border border-gray-200 p-6">
                <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
                  <div className="space-y-4">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">Customer</p>
                        <p className="mt-2 text-xl font-semibold text-gray-900">{reservation.customerName}</p>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="outline" className="rounded-full px-3 py-1 text-xs uppercase tracking-[0.2em]">
                          {getTypeLabel(reservation.reservationType)}
                        </Badge>
                        <ReservationStatusControl
                          reservationId={reservation.id}
                          currentStatus={reservation.status}
                          onStatusUpdate={updateReservationStatus}
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <Detail label="Date" value={formatDate(reservation.reservationDate)} />
                      <Detail label="Time" value={reservation.reservationTime} />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <Detail label="Email" value={reservation.customerEmail} />
                      <Detail label="Phone" value={reservation.customerPhone} />
                    </div>

                    {hasProducts && (
                      <div className="rounded-3xl bg-white px-4 py-4 shadow-sm ring-1 ring-inset ring-gray-200">
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">Reserved Products</p>
                        <ul className="mt-2 space-y-2">
                          {reservation.reservationItems.map((item) => (
                            <li key={item.id}>
                              <Link
                                href={`/products/${item.product.id}`}
                                className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                              >
                                {item.product.name}
                              </Link>
                              <span className="text-sm text-gray-600"> × {item.quantity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4 rounded-3xl border border-gray-200 bg-gray-50 p-4">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">Delivery address</p>
                      <p className="mt-2 text-sm leading-6 text-gray-700">
                        {reservation.deliveryAddress || "Pickup location"}
                      </p>
                    </div>

                    {reservation.notes ? (
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">Notes</p>
                        <p className="mt-2 text-sm leading-6 text-gray-700">{reservation.notes}</p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">Notes</p>
                        <p className="mt-2 text-sm leading-6 text-gray-500">No additional notes</p>
                      </div>
                    )}

                    {hasProducts && (
                      <div className="border-t border-gray-200 pt-4">
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">Total</p>
                        <p className="mt-2 text-lg font-semibold text-gray-900">{formatCurrency(total)}</p>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Detail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-3xl bg-white px-4 py-4 shadow-sm ring-1 ring-inset ring-gray-200">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">{label}</p>
      <p className="mt-2 text-sm leading-6 text-gray-700">{value}</p>
    </div>
  );
}