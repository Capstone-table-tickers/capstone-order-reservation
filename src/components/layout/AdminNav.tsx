"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      {/* Mobile Header */}
      <header className="sm:hidden border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between px-4 py-4">
          <Link href="/admin/dashboard" className="flex flex-col gap-1" onClick={closeMobileMenu}>
            <span className="text-lg font-semibold text-green-800">Table Tickers</span>
            <span className="text-xs text-gray-500">Admin</span>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="space-y-1 border-t border-gray-200 px-4 py-3">
            <NavLink
              href="/admin/dashboard"
              active={isActive("/admin/dashboard")}
              label="Dashboard"
              onClick={closeMobileMenu}
            />
            <NavLink
              href="/admin/reservations"
              active={isActive("/admin/reservations")}
              label="Reservations"
              onClick={closeMobileMenu}
            />
            <NavLink
              href="/admin/products"
              active={isActive("/admin/products")}
              label="Products"
              onClick={closeMobileMenu}
            />
            <button
              onClick={() => {
                closeMobileMenu();
                handleLogout();
              }}
              className="w-full rounded-lg px-4 py-2 text-left text-sm font-medium text-gray-700 transition hover:bg-gray-100"
            >
              Logout
            </button>
          </nav>
        )}
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden h-screen w-64 flex-col border-r border-gray-200 bg-white sm:flex">
        <div className="border-b border-gray-200 px-6 py-6">
          <Link href="/admin/dashboard" className="flex flex-col gap-1">
            <span className="text-lg font-semibold text-green-800">Table Tickers</span>
            <span className="text-xs text-gray-500">Admin Panel</span>
          </Link>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-6">
          <NavLink
            href="/admin/dashboard"
            active={isActive("/admin/dashboard")}
            label="Dashboard"
          />
          <NavLink
            href="/admin/reservations"
            active={isActive("/admin/reservations")}
            label="Reservations"
          />
          <NavLink
            href="/admin/products"
            active={isActive("/admin/products")}
            label="Products"
          />
        </nav>

        <div className="border-t border-gray-200 p-4">
          <button
            onClick={handleLogout}
            className="w-full rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Logout
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
  onClick,
}: {
  href: string;
  active: boolean;
  label: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={[
        "block rounded-lg px-4 py-2 text-sm font-medium transition",
        active
          ? "bg-green-50 text-green-700"
          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900",
      ].join(" ")}
      aria-current={active ? "page" : undefined}
    >
      {label}
    </Link>
  );
}
