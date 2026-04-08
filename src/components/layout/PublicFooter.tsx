import Link from "next/link";

export default function PublicFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface-muted)]">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--color-brand-700)]">
                <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C8.5 2 6 4.5 6 7c0 2 1 3.7 2.5 4.8C7.5 13 6 14.8 5 17H3v2h18v-2h-2c-1-2.2-2.5-4-3.5-5.2C17 10.7 18 9 18 7c0-2.5-2.5-5-6-5zm0 2c2.2 0 4 1.8 4 3 0 1.3-.7 2.4-1.8 3.1l-.7.5.6.5C15.2 12.3 16.5 14 17.3 16H6.7c.8-2 2.1-3.7 3.2-4.9l.6-.5-.7-.5C8.7 9.4 8 8.3 8 7c0-1.2 1.8-3 4-3z"/>
                </svg>
              </span>
              <span className="text-[15px] font-bold tracking-tight text-[var(--color-brand-800)]">
                Table Tickers
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-gray-500">
              Fresh farm produce, simple reservations. Connecting Kokkola residents directly with local farm products.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 text-sm sm:gap-12">
            <div>
              <p className="font-semibold text-gray-800">Quick links</p>
              <ul className="mt-3 space-y-2">
                {[
                  { href: "/", label: "Home" },
                  { href: "/about", label: "About" },
                  { href: "/products", label: "Products" },
                  { href: "/reservation", label: "Reservation" },
                  { href: "/contact", label: "Contact" },
                ].map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} className="text-gray-500 transition hover:text-[var(--color-brand-700)]">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-semibold text-gray-800">Policies</p>
              <ul className="mt-3 space-y-2">
                {[
                  { href: "/policies/privacy", label: "Privacy Policy" },
                  { href: "/policies/booking", label: "Booking Policy" },
                  { href: "/policies/delivery-pickup", label: "Delivery & Pickup" },
                ].map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} className="text-gray-500 transition hover:text-[var(--color-brand-700)]">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-[var(--color-border)] pt-6 text-center text-xs text-gray-400">
          © {year} Table Tickers. All rights reserved. &mdash; Kokkola, Finland.
        </div>
      </div>
    </footer>
  );
}
