import PublicFooter from "./PublicFooter";
import PublicHeader from "./PublicHeader";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-[var(--background)] text-[var(--foreground)]">
      <PublicHeader />
      <main className="flex-1">{children}</main>
      <PublicFooter />
    </div>
  );
}
