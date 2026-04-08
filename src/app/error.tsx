"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#fafaf8] px-4 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">Something went wrong</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
        Unexpected error
      </h1>
      <p className="mt-4 max-w-md text-base leading-7 text-gray-600">
        An unexpected error occurred. Please try again or return to the home page.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <button
          onClick={reset}
          className="inline-flex items-center justify-center rounded-full bg-green-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
        >
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition hover:border-green-700 hover:text-green-700"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
