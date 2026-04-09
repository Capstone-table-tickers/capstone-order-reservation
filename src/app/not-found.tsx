import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#fafaf8] px-4 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">404</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-base leading-7 text-gray-600">
        We couldn&apos;t find what you were looking for. The page may have moved or the link may be incorrect.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-green-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-700"
        >
          Go home
        </Link>
        <Link
          href="/products"
          className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition hover:border-green-700 hover:text-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-700"
        >
          Browse products
        </Link>
      </div>
    </div>
  );
}
