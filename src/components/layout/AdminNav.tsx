"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";

const NAV_ITEMS = [
  {
    href: "/admin/dashboard",
    label: "Dashboard",
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    href: "/admin/reservations",
    label: "Reservations",
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    href: "/admin/products",
    label: "Products",
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
];

function BrandMark({ compact }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--color-brand-700)]">
        <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2C8.5 2 6 4.5 6 7c0 2 1 3.7 2.5 4.8C7.5 13 6 14.8 5 17H3v2h18v-2h-2c-1-2.2-2.5-4-3.5-5.2C17 10.7 18 9 18 7c0-2.5-2.5-5-6-5zm0 2c2.2 0 4 1.8 4 3 0 1.3-.7 2.4-1.8 3.1l-.7.5.6.5C15.2 12.3 16.5 14 17.3 16H6.7c.8-2 2.1-3.7 3.2-4.9l.6-.5-.7-.5C8.7 9.4 8 8.3 8 7c0-1.2 1.8-3 4-3z"/>
        </svg>
      </span>
      {!compact && (
        <div className="flex flex-col leading-none">
          <span className="text-[15px] font-bold tracking-tight text-[var(--color-brand-800)]">
            Table Tickers
          </span>
          <span className="text-[10px] font-medium tracking-widest text-gray-400 uppercase">
            Admin Panel
          </span>
        </div>
      )}
    </div>
  );
}

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  return (
    <>
      {/* ── Mobile header (visible on < sm) ── */}
      <header className="sm:hidden sticky top-0 z-40 border-b border-[var(--color-border)] bg-white">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/admin/dashboard" onClick={() => setMobileMenuOpen(false)}>
            <BrandMark />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:bg-gray-50"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="border-t border-[var(--color-border)] px-3 py-2 space-y-0.5">
            {NAV_ITEMS.map(({ href, label, icon }) => (
              <NavLink
                key={href}
                href={href}
                active={isActive(href)}
                label={label}
                icon={icon}
                onClick={() => setMobileMenuOpen(false)}
              />
            ))}
            <button
              onClick={() => { setMobileMenuOpen(false); handleLogout(); }}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </nav>
        )}
      </header>

      {/* ── Desktop sidebar (visible on sm+) ── */}
      <aside className="hidden sm:flex h-screen w-60 shrink-0 sticky top-0 flex-col border-r border-[var(--color-border)] bg-white">
        <div className="border-b border-[var(--color-border)] px-5 py-5">
          <Link href="/admin/dashboard">
            <BrandMark />
          </Link>
        </div>

        <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
          {NAV_ITEMS.map(({ href, label, icon }) => (
            <NavLink key={href} href={href} active={isActive(href)} label={label} icon={icon} />
          ))}
        </nav>

        <div className="border-t border-[var(--color-border)] p-3">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-500 transition hover:bg-gray-50 hover:text-gray-800"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign out
          </button>
        </div>
      </aside>
    </>
  );
}

function NavLink({
  href,
  active,
  label,
  icon,
  onClick,
}: {
  href: string;
  active: boolean;
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={[
        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition",
        active
          ? "bg-[var(--color-brand-50)] text-[var(--color-brand-700)] font-semibold"
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
      ].join(" ")}
      aria-current={active ? "page" : undefined}
    >
      <span className={active ? "text-[var(--color-brand-600)]" : "text-gray-400"}>
        {icon}
      </span>
      {label}
    </Link>
  );
}
