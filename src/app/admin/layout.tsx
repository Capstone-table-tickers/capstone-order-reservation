import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AdminNav from "@/components/layout/AdminNav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // Unauthenticated users should be sent to sign-in
  if (!session) {
    redirect("/login");
  }

  // Authenticated users without ADMIN role should be sent home
  if (session.user?.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-[var(--color-surface-muted)] sm:flex-row">
      <AdminNav />
      <main className="min-w-0 flex-1">
        <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</div>
      </main>
    </div>
  );
}
