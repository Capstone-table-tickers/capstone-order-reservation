import type { Metadata } from "next";
import { getPublicProducts } from "@/features/products/queries/get-public-products";
import ReservationFormWithProducts from "./reservation-form";

export const metadata: Metadata = {
  title: "Make a Reservation | Table Tickers",
  description:
    "Reserve fresh farm produce for pickup or delivery in Kokkola. Choose your products and preferred date.",
};

interface ReservationPageProps {
  searchParams: Promise<{ productId?: string }>;
}

export default async function ReservationPage({ searchParams }: ReservationPageProps) {
  const [products, { productId }] = await Promise.all([
    getPublicProducts(),
    searchParams,
  ]);

  return <ReservationFormWithProducts products={products} initialProductId={productId} />;
}
