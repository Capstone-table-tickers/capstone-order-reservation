"use client";

import { useState, useMemo } from "react";
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
  return new Intl.NumberFormat("fi-FI", { style: "currency", currency: "EUR" }).format(amount);
}

function calculateTotal(reservation: AdminReservation): number {
  return (reservation.reservationItems ?? []).reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
}

function getStatusStyle(status: AdminReservation["status"]) {
  switch (status) {
    case "CONFIRMED":
      return "bg-green-100 text-green-800";
    case "COMPLETED":
      return "bg-blue-100 text-blue-800";
    case "CANCELLED":
      return "bg-red-100 text-red-800";
    default:
      return "bg-yellow-100 text-yellow-800";
  }
}

const STATUS_OPTIONS = [
  { value: "ALL", label: "All statuses" },
  { value: "PENDING", label: "Pending" },
  { value: "CONFIRMED", label: "Confirmed" },
  { value: "COMPLETED", label: "Completed" },
  { value: "CANCELLED", label: "Cancelled" },
];

const TYPE_OPTIONS = [
  { value: "ALL", label: "All methods" },
  { value: "PICKUP", label: "Pickup" },
  { value: "DELIVERY", label: "Delivery" },
];

export function AdminReservationsList({ initialReservations }: AdminReservationsListProps) {
  const [reservations, setReservations] = useState(initialReservations);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");

  const updateStatus = (id: string, newStatus: AdminReservation["status"]) => {
    setReservations((prev) =>
      prev.map((res) => (res.id === id ? { ...res, status: newStatus } : res))
    );
  };

  const filtered = useMemo(() => {
    return reservations.filter((r) => {
      if (statusFilter !== "ALL" && r.status !== statusFilter) return false;
      if (typeFilter !== "ALL" && r.reservationType !== typeFilter) return false;
      return true;
    });
  }, [reservations, statusFilter, typeFilter]);

  const selectClass =
    "rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-100";

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionTitle
          eyebrow="Reservations"
          title="Reservation list"
          description="Browse customer reservations and manage upcoming pickups and deliveries."
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4">
        <span className="text-sm font-medium text-gray-700">Filter by:</span>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className={selectClass}
          aria-label="Filter by status"
        >
          {STATUS_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className={selectClass}
          aria-label="Filter by fulfillment method"
        >
          {TYPE_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        {(statusFilter !== "ALL" || typeFilter !== "ALL") && (
          <button
            onClick={() => {
              setStatusFilter("ALL");
              setTypeFilter("ALL");
            }}
            className="text-sm font-medium text-red-600 hover:text-red-700"
          >
            Clear filters
          </button>
        )}
        <span className="ml-auto text-sm text-gray-500">
          {filtered.length} of {reservations.length} reservation{reservations.length !== 1 ? "s" : ""}
        </span>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title={reservations.length === 0 ? "No reservations yet" : "No results"}
          description={
            reservations.length === 0
              ? "New reservations will appear here once customers submit them."
              : "No reservations match the current filters. Try adjusting the filters."
          }
        />
      ) : (
        <div className="grid gap-4">
          {filtered.map((reservation) => {
            const total = calculateTotal(reservation);
            const hasProducts = (reservation.reservationItems ?? []).length > 0;

            return (
              <Card key={reservation.id} className="rounded-3xl border border-gray-200 p-6">
                <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
                  <div className="space-y-4">
                    {/* Customer + status */}
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                          Customer
                        </p>
                        <p className="mt-1 text-xl font-semibold text-gray-900">
                          {reservation.customerName}
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge
                          variant="outline"
                          className="rounded-full px-3 py-1 text-xs uppercase tracking-[0.15em]"
                        >
                          {reservation.reservationType === "PICKUP" ? "Pickup" : "Delivery"}
                        </Badge>
                        <ReservationStatusControl
                          reservationId={reservation.id}
                          currentStatus={reservation.status}
                          onStatusUpdate={updateStatus}
                        />
                      </div>
                    </div>

                    {/* Date + time */}
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Detail label="Date" value={formatDate(reservation.reservationDate)} />
                      <Detail label="Time" value={reservation.reservationTime} />
                    </div>

                    {/* Contact */}
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Detail label="Email" value={reservation.customerEmail} />
                      <Detail label="Phone" value={reservation.customerPhone} />
                    </div>

                    {/* Reserved products */}
                    {hasProducts && (
                      <div className="rounded-2xl bg-gray-50 px-4 py-4 ring-1 ring-inset ring-gray-200">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                          Reserved products
                        </p>
                        <ul className="mt-2 space-y-1.5">
                          {reservation.reservationItems.map((item) => (
                            <li key={item.id} className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-2">
                                <Link
                                  href={`/products/${item.product.id}`}
                                  target="_blank"
                                  className="font-medium text-green-700 hover:underline"
                                >
                                  {item.product.name}
                                </Link>
                                <span className="text-gray-500">× {item.quantity}</span>
                              </div>
                              <span className="text-gray-700">
                                {formatCurrency(item.product.price * item.quantity)}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-4 rounded-2xl border border-gray-200 bg-gray-50 p-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                        {reservation.reservationType === "DELIVERY" ? "Delivery address" : "Pickup"}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-gray-700">
                        {reservation.deliveryAddress || "Pickup from farm"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">Notes</p>
                      <p className="mt-2 text-sm leading-6 text-gray-500">
                        {reservation.notes || "No additional notes"}
                      </p>
                    </div>

                    {hasProducts && (
                      <div className="border-t border-gray-200 pt-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                          Total
                        </p>
                        <p className="mt-1 text-xl font-semibold text-gray-900">
                          {formatCurrency(total)}
                        </p>
                      </div>
                    )}

                    <div className="border-t border-gray-200 pt-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                        Status
                      </p>
                      <span
                        className={`mt-1 inline-block rounded-full px-2.5 py-1 text-xs font-medium ${getStatusStyle(reservation.status)}`}
                      >
                        {reservation.status.charAt(0) + reservation.status.slice(1).toLowerCase()}
                      </span>
                    </div>
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

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-inset ring-gray-200">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">{label}</p>
      <p className="mt-1 text-sm leading-6 text-gray-800">{value}</p>
    </div>
  );
}
