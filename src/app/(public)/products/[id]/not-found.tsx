import Link from "next/link";

export default function ProductNotFound() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">404</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
        Product not found
      </h1>
      <p className="mt-4 max-w-md text-base leading-7 text-gray-600">
        This product may no longer be available or the link may be incorrect.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href="/products"
          className="inline-flex items-center justify-center rounded-full bg-green-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
        >
          Browse all products
        </Link>
        <Link
          href="/reservation"
          className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition hover:border-green-700 hover:text-green-700"
        >
          Make a reservation
        </Link>
      </div>
    </main>
  );
}
