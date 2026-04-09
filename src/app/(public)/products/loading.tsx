export default function ProductsLoading() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 space-y-4">
        <div className="h-3 w-20 animate-pulse rounded-full bg-gray-200" />
        <div className="h-10 w-2/3 animate-pulse rounded-xl bg-gray-200" />
        <div className="h-4 w-full max-w-lg animate-pulse rounded-full bg-gray-200" />
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="aspect-[4/3] animate-pulse bg-gray-200" />
            <div className="p-5 space-y-3">
              <div className="h-4 w-3/4 animate-pulse rounded-full bg-gray-200" />
              <div className="h-3 w-full animate-pulse rounded-full bg-gray-200" />
              <div className="flex justify-between items-center mt-2">
                <div className="h-6 w-16 animate-pulse rounded-full bg-gray-200" />
                <div className="h-8 w-24 animate-pulse rounded-full bg-gray-200" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
