import { getPublicProducts } from "@/features/products/queries/get-public-products";
import ReservationFormWithProducts from "./reservation-form";

export default async function ReservationPage() {
  const products = await getPublicProducts();

  return <ReservationFormWithProducts products={products} />;
}
