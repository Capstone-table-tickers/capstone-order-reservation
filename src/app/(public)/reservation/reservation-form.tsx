"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { PublicProduct } from "@/features/products/types";

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

type SelectedProduct = {
  productId: string;
  quantity: number;
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

  if (!values.fullName.trim()) errors.fullName = "Please enter your full name.";
  if (!values.phone.trim()) errors.phone = "Please provide a phone number.";
  if (!values.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!isValidEmail(values.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!values.reservationDate) errors.reservationDate = "Choose a reservation date.";
  if (!values.reservationTime) errors.reservationTime = "Choose a reservation time.";
  if (values.fulfillmentMethod === "DELIVERY" && !values.address.trim()) {
    errors.address = "Please enter a delivery address.";
  }

  return errors;
}

type ReservationFormProps = {
  products: PublicProduct[];
  initialProductId?: string;
};

export default function ReservationFormWithProducts({
  products,
  initialProductId,
}: ReservationFormProps) {
  const router = useRouter();

  const [form, setForm] = useState<ReservationForm>(initialForm);
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>(() => {
    if (initialProductId) {
      const found = products.find((p) => p.id === initialProductId);
      if (found && found.stockQuantity > 0) {
        return [{ productId: found.id, quantity: 1 }];
      }
    }
    return [];
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

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

  function handleProductCheckChange(productId: string) {
    setSelectedProducts((current) => {
      const exists = current.find((p) => p.productId === productId);
      if (exists) return current.filter((p) => p.productId !== productId);
      return [...current, { productId, quantity: 1 }];
    });
  }

  function handleProductQuantityChange(productId: string, quantity: number) {
    setSelectedProducts((current) =>
      current.map((p) => (p.productId === productId ? { ...p, quantity } : p))
    );
  }

  function isProductSelected(productId: string) {
    return selectedProducts.some((p) => p.productId === productId);
  }

  function getProductQuantity(productId: string) {
    return selectedProducts.find((p) => p.productId === productId)?.quantity ?? 1;
  }

  function showError(field: keyof ReservationForm) {
    return Boolean((submitted || touched[field]) && errors[field]);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    setSubmitted(true);
    setTouched({
      fullName: true,
      phone: true,
      email: true,
      reservationDate: true,
      reservationTime: true,
      address: true,
    });

    if (hasErrors) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const payload = { ...form, products: selectedProducts };

      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        const params = new URLSearchParams({
          id: result.data.id,
          email: form.email,
        });
        router.push(`/reservation/success?${params.toString()}`);
      } else {
        if (result.error?.type === "VALIDATION_ERROR") {
          const issues = result.error.issues ?? [];
          const addressIssue = issues.find((issue: { path?: string[] }) =>
            issue.path?.includes("address")
          );
          setSubmitError(
            addressIssue?.message ?? "Please check the form for errors and try again."
          );
        } else {
          setSubmitError(result.error?.message ?? "Something went wrong. Please try again.");
        }
      }
    } catch {
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputClass =
    "mt-2 w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm transition focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-100";
  const inputErrorClass =
    "mt-2 w-full rounded-2xl border border-red-300 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm transition focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-100";

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
          </div>

          <form noValidate onSubmit={handleSubmit}>
            <div className="grid gap-6">
              {/* Full name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  Full name <span className="text-red-600">*</span>
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={form.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={showError("fullName") ? inputErrorClass : inputClass}
                  placeholder="Anna Koskinen"
                  aria-invalid={showError("fullName")}
                  aria-describedby={showError("fullName") ? "error-fullName" : undefined}
                />
                {showError("fullName") && (
                  <p id="error-fullName" className="mt-2 text-sm text-red-600" role="alert">
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Phone + Email */}
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone number <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={showError("phone") ? inputErrorClass : inputClass}
                    placeholder="040 123 4567"
                    aria-invalid={showError("phone")}
                  />
                  {showError("phone") && (
                    <p className="mt-2 text-sm text-red-600" role="alert">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={showError("email") ? inputErrorClass : inputClass}
                    placeholder="anna@example.com"
                    aria-invalid={showError("email")}
                  />
                  {showError("email") && (
                    <p className="mt-2 text-sm text-red-600" role="alert">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Date + Time */}
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="reservationDate" className="block text-sm font-medium text-gray-700">
                    Reservation date <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="reservationDate"
                    name="reservationDate"
                    type="date"
                    value={form.reservationDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={showError("reservationDate") ? inputErrorClass : inputClass}
                    aria-invalid={showError("reservationDate")}
                  />
                  {showError("reservationDate") && (
                    <p className="mt-2 text-sm text-red-600" role="alert">{errors.reservationDate}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="reservationTime" className="block text-sm font-medium text-gray-700">
                    Reservation time <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="reservationTime"
                    name="reservationTime"
                    type="time"
                    value={form.reservationTime}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={showError("reservationTime") ? inputErrorClass : inputClass}
                    aria-invalid={showError("reservationTime")}
                  />
                  {showError("reservationTime") && (
                    <p className="mt-2 text-sm text-red-600" role="alert">{errors.reservationTime}</p>
                  )}
                </div>
              </div>

              {/* Fulfillment method */}
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
                      <span>{option === "PICKUP" ? "Pickup from farm" : "Home delivery"}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Delivery address or pickup info */}
              {form.fulfillmentMethod === "DELIVERY" ? (
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Delivery address <span className="text-red-600">*</span>
                  </label>
                  <p className="mt-1 mb-2 text-sm text-gray-500">
                    We need your address to arrange delivery to your home.
                  </p>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    value={form.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={showError("address") ? inputErrorClass : inputClass}
                    placeholder="Keskuskatu 12, Kokkola"
                    aria-invalid={showError("address")}
                  />
                  {showError("address") && (
                    <p className="mt-2 text-sm text-red-600" role="alert">{errors.address}</p>
                  )}
                </div>
              ) : (
                <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4">
                  <p className="text-sm text-blue-900">
                    <span className="font-medium">Pickup selected:</span> No address needed. We&apos;ll confirm your preferred pickup time.
                  </p>
                </div>
              )}

              {/* Product selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product selection
                  {initialProductId && selectedProducts.length > 0 && (
                    <span className="ml-2 text-xs text-green-700">(pre-selected)</span>
                  )}
                </label>
                <p className="mt-2 mb-4 text-sm text-gray-500">
                  Select the products you&apos;d like to reserve
                </p>
                <div className="space-y-3">
                  {products.length > 0 ? (
                    products.map((product) => {
                      const isSelected = isProductSelected(product.id);
                      const isPreselected = product.id === initialProductId;
                      return (
                        <div
                          key={product.id}
                          className={`flex items-start gap-4 rounded-xl border p-4 transition ${
                            isSelected
                              ? "border-green-300 bg-green-50"
                              : "border-gray-200 bg-white"
                          } ${isPreselected ? "ring-1 ring-green-400" : ""}`}
                        >
                          <div className="flex items-start gap-3 flex-1">
                            <input
                              type="checkbox"
                              id={`product-${product.id}`}
                              checked={isSelected}
                              onChange={() => handleProductCheckChange(product.id)}
                              className="mt-1 h-4 w-4 rounded border-gray-300 accent-green-600"
                              disabled={product.stockQuantity === 0}
                            />
                            <div className="flex-1">
                              <label
                                htmlFor={`product-${product.id}`}
                                className="block font-medium text-gray-900"
                              >
                                {product.name}
                                {isPreselected && (
                                  <span className="ml-2 text-xs font-normal text-green-600">
                                    Selected from product page
                                  </span>
                                )}
                              </label>
                              <p className="text-sm text-gray-500">
                                €{parseFloat(product.price).toFixed(2)}
                                {product.stockQuantity === 0 && (
                                  <span className="ml-2 text-red-500">— Out of stock</span>
                                )}
                              </p>
                            </div>
                          </div>
                          {isSelected && (
                            <div className="flex items-center gap-2">
                              <label htmlFor={`qty-${product.id}`} className="text-sm text-gray-600">
                                Qty:
                              </label>
                              <input
                                id={`qty-${product.id}`}
                                type="number"
                                min="1"
                                max={product.stockQuantity}
                                value={getProductQuantity(product.id)}
                                onChange={(e) =>
                                  handleProductQuantityChange(
                                    product.id,
                                    parseInt(e.target.value) || 1
                                  )
                                }
                                className="w-16 rounded-xl border border-gray-300 px-2 py-1 text-sm focus:border-green-600 focus:outline-none"
                              />
                            </div>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-sm text-gray-500">No products available at the moment.</p>
                  )}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                  Additional notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  value={form.notes}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Tell us if you need a specific pickup window or have special requests."
                />
              </div>
            </div>

            <div className="mt-8 space-y-4">
              {submitError && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3" role="alert">
                  <p className="text-sm text-red-700">{submitError}</p>
                </div>
              )}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-gray-500">
                  We will review your request and contact you within one business day.
                </p>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full sm:w-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting…" : "Submit reservation request"}
                </Button>
              </div>
            </div>
          </form>
        </Card>

        <div className="space-y-6">
          <Card className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">
              Reservation guide
            </p>
            <h3 className="text-lg font-semibold text-gray-900">How it works in Kokkola</h3>
            <p className="text-sm leading-6 text-gray-600">
              Choose pickup from our local farm in Kokkola or request delivery to your home.
              Delivery availability depends on area and schedule.
            </p>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex gap-2">
                <span className="text-green-600">✓</span>
                Pickup available from the farm store or local collection points.
              </li>
              <li className="flex gap-2">
                <span className="text-green-600">✓</span>
                Delivery reviewed case-by-case for Kokkola and nearby villages.
              </li>
              <li className="flex gap-2">
                <span className="text-green-600">✓</span>
                Confirmation by phone or email within one business day.
              </li>
            </ul>
          </Card>

          <Card className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">
              Need help?
            </p>
            <div className="text-sm leading-6 text-gray-600">
              <p>Questions about availability, delivery, or pickup? Contact us.</p>
              <p className="mt-3 font-medium text-gray-900">Phone: 040 123 4567</p>
              <p>Email: info@tabletickers.fi</p>
            </div>
          </Card>

          <Card className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">
              Check reservation status
            </p>
            <p className="text-sm text-gray-600">
              Already made a reservation? Check its current status using your ID and email.
            </p>
            <Button href="/reservation/status" variant="secondary" size="sm">
              Check status
            </Button>
          </Card>
        </div>
      </div>
    </main>
  );
}
