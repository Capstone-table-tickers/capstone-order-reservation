"use client";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";

type FulfillmentMethod = "PICKUP" | "DELIVERY";

type ReservationForm = {
  fullName: string;
  phone: string;
  email: string;
  reservationDate: string;
  reservationTime: string;
  fulfillmentMethod: FulfillmentMethod;
  address: string;
  notes: string;
};

type ReservationErrors = Partial<Record<keyof ReservationForm, string>>;

const initialForm: ReservationForm = {
  fullName: "",
  phone: "",
  email: "",
  reservationDate: "",
  reservationTime: "",
  fulfillmentMethod: "PICKUP",
  address: "",
  notes: "",
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validateForm(values: ReservationForm): ReservationErrors {
  const errors: ReservationErrors = {};

  if (!values.fullName.trim()) {
    errors.fullName = "Please enter your full name.";
  }

  if (!values.phone.trim()) {
    errors.phone = "Please provide a phone number.";
  }

  if (!values.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!isValidEmail(values.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.reservationDate) {
    errors.reservationDate = "Choose a reservation date.";
  }

  if (!values.reservationTime) {
    errors.reservationTime = "Choose a reservation time.";
  }

  if (values.fulfillmentMethod === "DELIVERY" && !values.address.trim()) {
    errors.address = "Delivery address is required.";
  }

  return errors;
}

export default function ReservationPage() {
  const [form, setForm] = useState<ReservationForm>(initialForm);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);

  const errors = useMemo(() => validateForm(form), [form]);
  const hasErrors = Object.keys(errors).length > 0;

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleFulfillmentChange(value: FulfillmentMethod) {
    setForm((current) => ({
      ...current,
      fulfillmentMethod: value,
      address: value === "PICKUP" ? "" : current.address,
    }));
  }

  function handleBlur(event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setTouched((current) => ({ ...current, [event.target.name]: true }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    setTouched({
      fullName: true,
      phone: true,
      email: true,
      reservationDate: true,
      reservationTime: true,
      address: true,
    });

    if (!hasErrors) {
      setSuccess(true);
    } else {
      setSuccess(false);
    }
  }

  function showError(field: keyof ReservationForm) {
    return Boolean((submitted || touched[field]) && errors[field]);
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="mb-10">
        <SectionTitle
          eyebrow="Reservation"
          title="Reserve fresh farm produce for pickup or delivery in Kokkola"
          description="Submit your reservation request for local farm products. We will review your request and contact you with pickup timing or delivery options across Kokkola." 
        />
      </section>

      <div className="grid gap-8 lg:grid-cols-[1.4fr_0.9fr]">
        <Card className="p-8">
          <div className="mb-8">
            <div className="flex items-center gap-3">
              <Badge className="bg-green-100 text-green-800">Request a reservation</Badge>
              <p className="text-sm text-gray-500">No payment required yet</p>
            </div>
            <p className="mt-4 text-base leading-7 text-gray-600">
              Complete the form below to reserve fresh strawberries, vegetables, or farm products. Pickup and delivery both available in the Kokkola area.
            </p>
          </div>

          <form noValidate onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  Full name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={form.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-2 w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-100"
                  placeholder="Anna Koskinen"
                  aria-invalid={showError("fullName")}
                />
                {showError("fullName") && (
                  <p className="mt-2 text-sm text-red-600">{errors.fullName}</p>
                )}
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="mt-2 w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-100"
                    placeholder="040 123 4567"
                    aria-invalid={showError("phone")}
                  />
                  {showError("phone") && (
                    <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="mt-2 w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-100"
                    placeholder="anna@example.com"
                    aria-invalid={showError("email")}
                  />
                  {showError("email") && (
                    <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="reservationDate" className="block text-sm font-medium text-gray-700">
                    Reservation date
                  </label>
                  <input
                    id="reservationDate"
                    name="reservationDate"
                    type="date"
                    value={form.reservationDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="mt-2 w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-100"
                    aria-invalid={showError("reservationDate")}
                  />
                  {showError("reservationDate") && (
                    <p className="mt-2 text-sm text-red-600">{errors.reservationDate}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="reservationTime" className="block text-sm font-medium text-gray-700">
                    Reservation time
                  </label>
                  <input
                    id="reservationTime"
                    name="reservationTime"
                    type="time"
                    value={form.reservationTime}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="mt-2 w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-100"
                    aria-invalid={showError("reservationTime")}
                  />
                  {showError("reservationTime") && (
                    <p className="mt-2 text-sm text-red-600">{errors.reservationTime}</p>
                  )}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700">Fulfillment method</p>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {(["PICKUP", "DELIVERY"] as FulfillmentMethod[]).map((option) => (
                    <label
                      key={option}
                      className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-medium transition ${
                        form.fulfillmentMethod === option
                          ? "border-green-700 bg-green-50 text-gray-900"
                          : "border-gray-300 bg-white text-gray-700 hover:border-green-500"
                      }`}
                    >
                      <input
                        type="radio"
                        name="fulfillmentMethod"
                        value={option}
                        checked={form.fulfillmentMethod === option}
                        onChange={() => handleFulfillmentChange(option)}
                        className="h-4 w-4 accent-green-600"
                      />
                      <span>{option === "PICKUP" ? "Pickup" : "Delivery"}</span>
                    </label>
                  ))}
                </div>
              </div>

              {form.fulfillmentMethod === "DELIVERY" && (
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Delivery address
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    value={form.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="mt-2 w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-100"
                    placeholder="Example: Keskuskatu 12, Kokkola"
                    aria-invalid={showError("address")}
                  />
                  {showError("address") && (
                    <p className="mt-2 text-sm text-red-600">{errors.address}</p>
                  )}
                </div>
              )}

              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                  Additional notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={4}
                  value={form.notes}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-100"
                  placeholder="Tell us if you need a specific pickup window or special farm products."
                />
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  We will review your reservation request and contact you with the next steps.
                </p>
                {success && (
                  <p className="mt-2 text-sm text-green-700">Your reservation request looks good.</p>
                )}
              </div>
              <Button type="submit" size="lg" className="w-full sm:w-auto">
                Submit reservation request
              </Button>
            </div>
          </form>
        </Card>

        <div className="space-y-6">
          <Card className="space-y-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">Reservation guide</p>
              <h3 className="mt-3 text-xl font-semibold text-gray-900">How it works in Kokkola</h3>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Choose pickup from our local farm in Kokkola or request delivery to your home. Delivery availability depends on area and schedule.
              </p>
            </div>
            <ul className="space-y-4 text-sm text-gray-600">
              <li>• Pickup available from the farm store or local collection points.</li>
              <li>• Delivery is reviewed case-by-case for Kokkola and nearby villages.</li>
              <li>• We confirm your reservation by phone or email within one business day.</li>
            </ul>
          </Card>

          <Card className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">Need help?</p>
            <div className="text-sm leading-6 text-gray-600">
              <p>Contact our farm support team if you have questions about product availability, delivery, or pickup times.</p>
              <p className="mt-3 font-medium text-gray-900">Phone: 040 123 4567</p>
              <p className="text-gray-600">Email: info@tabletickers.fi</p>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
