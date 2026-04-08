"use client";

import { useState } from "react";
import type { AdminReservation } from "../types";

interface ReservationStatusControlProps {
  reservationId: string;
  currentStatus: AdminReservation["status"];
  onStatusUpdate: (id: string, newStatus: AdminReservation["status"]) => void;
}

const statusOptions: { value: AdminReservation["status"]; label: string }[] = [
  { value: "PENDING", label: "Pending" },
  { value: "CONFIRMED", label: "Confirmed" },
  { value: "COMPLETED", label: "Completed" },
  { value: "CANCELLED", label: "Cancelled" },
];

export function ReservationStatusControl({
  reservationId,
  currentStatus,
  onStatusUpdate,
}: ReservationStatusControlProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStatusChange = async (newStatus: AdminReservation["status"]) => {
    if (newStatus === currentStatus) return;

    setIsUpdating(true);
    setError(null);

    try {
      const response = await fetch(`/api/admin/reservations/${reservationId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Failed to update status");
      }

      onStatusUpdate(reservationId, newStatus);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <select
        value={currentStatus}
        onChange={(e) => handleStatusChange(e.target.value as AdminReservation["status"])}
        disabled={isUpdating}
        className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${
          currentStatus === "CONFIRMED"
            ? "bg-green-100 text-green-800"
            : currentStatus === "COMPLETED"
            ? "bg-slate-100 text-slate-900"
            : currentStatus === "CANCELLED"
            ? "bg-red-100 text-red-800"
            : "bg-yellow-100 text-yellow-800"
        } ${isUpdating ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      >
        {statusOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
