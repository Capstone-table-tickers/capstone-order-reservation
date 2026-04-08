import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Reservation Confirmed | Table Tickers",
};

interface ReservationSuccessPageProps {
  searchParams: Promise<{ id?: string; email?: string }>;
}

function formatDate(date: Date) {
  return date.toLocaleDateString("fi-FI", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("fi-FI", { style: "currency", currency: "EUR" }).format(amount);
}

export default async function ReservationSuccessPage({ searchParams }: ReservationSuccessPageProps) {
  const { id, email } = await searchParams;

  if (!id) {
    redirect("/reservation");
  }

  const reservation = await prisma.reservation.findUnique({
    where: { id },
    select: {
      id: true,
      customerName: true,
      customerEmail: true,
      reservationType: true,
      reservationDate: true,
      reservationTime: true,
      deliveryAddress: true,
      notes: true,
      status: true,
      createdAt: true,
      reservationItems: {
        select: {
          id: true,
          quantity: true,
          product: {
            select: {
              id: true,
              name: true,
              price: true,
            },
          },
        },
      },
    },
  });

  if (!reservation) {
    redirect("/reservation");
  }

  // Security: if email was passed, verify it matches
  if (email && reservation.customerEmail.toLowerCase() !== email.toLowerCase()) {
    redirect("/reservation");
  }

  const total = reservation.reservationItems.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0
  );

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Success banner */}
      <div className="mb-8 rounded-3xl border border-green-200 bg-green-50 px-6 py-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
          <svg
            className="h-7 w-7 text-green-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">
          Reservation submitted
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-gray-900">
          Thank you, {reservation.customerName}!
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          We&apos;ve received your reservation and will confirm it within one business day.
        </p>
      </div>

      {/* Reservation details */}
      <div className="space-y-4">
        {/* Reference + status */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                Reservation reference
              </p>
              <p className="mt-1 font-mono text-sm text-gray-900 select-all">{reservation.id}</p>
            </div>
            <Badge className="bg-yellow-100 text-yellow-800">
              {reservation.status.charAt(0) + reservation.status.slice(1).toLowerCase()}
            </Badge>
          </div>
        </div>

        {/* Date, time, method */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
            Reservation details
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

        {/* Reserved products */}
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
                    {formatCurrency(Number(item.product.price) * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-4 border-t border-gray-100 pt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-gray-900">Estimated total</span>
                <span className="text-lg font-semibold text-green-700">{formatCurrency(total)}</span>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Final amount confirmed upon reservation approval.
              </p>
            </div>
          </div>
        )}

        {/* Notes */}
        {reservation.notes && (
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              Notes
            </p>
            <p className="text-sm text-gray-700">{reservation.notes}</p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button href="/reservation/status" variant="secondary" size="lg" className="flex-1">
          Check reservation status
        </Button>
        <Button href="/products" size="lg" className="flex-1">
          Browse more products
        </Button>
      </div>

      <p className="mt-6 text-center text-sm text-gray-500">
        Save your reference ID above to look up your reservation later.
        <br />
        Questions?{" "}
        <Link href="/contact" className="text-green-700 hover:underline">
          Contact us
        </Link>
        .
      </p>
    </main>
  );
}
