"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { SectionTitle } from "@/components/ui/SectionTitle";

type ReservationItem = {
  id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
    imageUrl: string | null;
  };
};

type ReservationData = {
  id: string;
  customerName: string;
  customerEmail: string;
  reservationType: "PICKUP" | "DELIVERY";
  reservationDate: string;
  reservationTime: string;
  deliveryAddress: string | null;
  notes: string | null;
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
  createdAt: string;
  reservationItems: ReservationItem[];
};

function getStatusStyle(status: ReservationData["status"]) {
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

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("fi-FI", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("fi-FI", { style: "currency", currency: "EUR" }).format(amount);
}

export default function ReservationStatusPage() {
  const [reservationId, setReservationId] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [reservation, setReservation] = useState<ReservationData | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleLookup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!reservationId.trim() || !email.trim()) return;

    setIsLoading(true);
    setError(null);
    setReservation(null);

    try {
      const params = new URLSearchParams({ email: email.trim() });
      const res = await fetch(
        `/api/reservations/${encodeURIComponent(reservationId.trim())}?${params.toString()}`
      );
      const result = await res.json();

      if (res.ok && result.success) {
        setReservation(result.data);
      } else {
        setError(
          "No reservation found with that ID and email combination. Please check and try again."
        );
      }
    } catch {
      setError("Could not retrieve reservation. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const total =
    reservation?.reservationItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    ) ?? 0;

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="mb-10">
        <SectionTitle
          eyebrow="Reservation status"
          title="Check your reservation"
          description="Enter your reservation ID and the email address you used to look up the status of your reservation."
        />
      </section>

      <Card className="p-6">
        <form onSubmit={handleLookup} className="space-y-5">
          <div>
            <label htmlFor="reservationId" className="block text-sm font-medium text-gray-700">
              Reservation ID
            </label>
            <input
              id="reservationId"
              type="text"
              value={reservationId}
              onChange={(e) => setReservationId(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-100 font-mono"
              placeholder="Paste your reservation ID here"
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <label htmlFor="lookupEmail" className="block text-sm font-medium text-gray-700">
              Email address used for reservation
            </label>
            <input
              id="lookupEmail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-100"
              placeholder="anna@example.com"
              required
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3" role="alert">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Looking up…" : "Look up reservation"}
          </Button>
        </form>
      </Card>

      {reservation && (
        <div className="mt-8 space-y-4">
          {/* Status */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                  Reservation for
                </p>
                <p className="mt-1 text-lg font-semibold text-gray-900">
                  {reservation.customerName}
                </p>
                <p className="text-xs font-mono text-gray-400 mt-1">{reservation.id}</p>
              </div>
              <Badge className={getStatusStyle(reservation.status)}>
                {reservation.status.charAt(0) + reservation.status.slice(1).toLowerCase()}
              </Badge>
            </div>
          </div>

          {/* Date / fulfillment details */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              Details
            </p>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="font-medium text-gray-700">Date</dt>
                <dd className="text-gray-900">{formatDate(reservation.reservationDate)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="font-medium text-gray-700">Time</dt>
                <dd className="text-gray-900">{reservation.reservationTime}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="font-medium text-gray-700">Fulfillment</dt>
                <dd className="text-gray-900">
                  {reservation.reservationType === "PICKUP" ? "Pickup from farm" : "Home delivery"}
                </dd>
              </div>
              {reservation.deliveryAddress && (
                <div className="flex justify-between gap-4">
                  <dt className="font-medium text-gray-700">Delivery address</dt>
                  <dd className="text-right text-gray-900">{reservation.deliveryAddress}</dd>
                </div>
              )}
            </dl>
          </div>

          {/* Products */}
          {reservation.reservationItems.length > 0 && (
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                Reserved products
              </p>
              <ul className="space-y-3">
                {reservation.reservationItems.map((item) => (
                  <li key={item.id} className="flex items-center justify-between text-sm">
                    <div>
                      <span className="font-medium text-gray-900">{item.product.name}</span>
                      <span className="ml-2 text-gray-500">× {item.quantity}</span>
                    </div>
                    <span className="font-medium text-gray-900">
                      {formatCurrency(item.product.price * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 border-t border-gray-100 pt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-gray-700">Estimated total</span>
                  <span className="font-semibold text-green-700">{formatCurrency(total)}</span>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/products" variant="secondary" size="md" className="flex-1">
              Browse products
            </Button>
            <Button href="/reservation" size="md" className="flex-1">
              New reservation
            </Button>
          </div>
        </div>
      )}

      <div className="mt-8 text-center">
        <Link href="/reservation" className="text-sm text-green-700 hover:underline">
          ← Make a new reservation
        </Link>
      </div>
    </main>
  );
}
