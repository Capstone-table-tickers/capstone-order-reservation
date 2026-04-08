export default function ProductDetailLoading() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 h-4 w-32 animate-pulse rounded-full bg-gray-200" />
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="aspect-square animate-pulse rounded-3xl bg-gray-200" />
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="h-4 w-20 animate-pulse rounded-full bg-gray-200" />
            <div className="h-10 w-3/4 animate-pulse rounded-xl bg-gray-200" />
            <div className="h-4 w-full animate-pulse rounded-full bg-gray-200" />
            <div className="h-4 w-5/6 animate-pulse rounded-full bg-gray-200" />
          </div>
          <div className="h-32 animate-pulse rounded-3xl bg-gray-200" />
          <div className="h-14 animate-pulse rounded-full bg-gray-200" />
          <div className="h-14 animate-pulse rounded-full bg-gray-200" />
        </div>
      </div>
    </main>
  );
}
