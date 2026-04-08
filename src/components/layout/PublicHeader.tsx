"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { publicNavItems } from "./site-nav";

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function PublicHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--color-brand-700)]">
            <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C8.5 2 6 4.5 6 7c0 2 1 3.7 2.5 4.8C7.5 13 6 14.8 5 17H3v2h18v-2h-2c-1-2.2-2.5-4-3.5-5.2C17 10.7 18 9 18 7c0-2.5-2.5-5-6-5zm0 2c2.2 0 4 1.8 4 3 0 1.3-.7 2.4-1.8 3.1l-.7.5.6.5C15.2 12.3 16.5 14 17.3 16H6.7c.8-2 2.1-3.7 3.2-4.9l.6-.5-.7-.5C8.7 9.4 8 8.3 8 7c0-1.2 1.8-3 4-3z"/>
            </svg>
          </span>
          <div className="flex flex-col leading-none">
            <span className="text-[15px] font-bold tracking-tight text-[var(--color-brand-800)]">
              Table Tickers
            </span>
            <span className="text-[10px] font-medium tracking-widest text-gray-400 uppercase">
              Farm & Reservations
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
          {publicNavItems.map((item) => {
            const isActive = isActivePath(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "rounded-lg px-4 py-2 text-sm font-medium transition",
                  isActive
                    ? "bg-[var(--color-brand-700)] text-white"
                    : "text-gray-600 hover:bg-[var(--color-brand-50)] hover:text-[var(--color-brand-700)]",
                ].join(" ")}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:bg-gray-50 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile nav dropdown — absolute so it overlays content */}
      {open && (
        <div
          id="mobile-nav"
          className="absolute left-0 right-0 top-full z-40 border-b border-[var(--color-border)] bg-white shadow-lg md:hidden"
        >
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 sm:px-6" aria-label="Mobile navigation">
            {publicNavItems.map((item) => {
              const isActive = isActivePath(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={[
                    "rounded-lg px-4 py-2.5 text-sm font-medium transition",
                    isActive
                      ? "bg-[var(--color-brand-700)] text-white"
                      : "text-gray-700 hover:bg-[var(--color-brand-50)] hover:text-[var(--color-brand-700)]",
                  ].join(" ")}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
