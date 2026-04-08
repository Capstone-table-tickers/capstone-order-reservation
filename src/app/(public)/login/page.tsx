import { Suspense } from "react";
import LoginPageClient from "./login-page-client";

interface LoginPageProps {
  searchParams?: { callbackUrl?: string };
}

export default function LoginPage({ searchParams }: LoginPageProps) {
  const rawCallbackUrl = searchParams?.callbackUrl;
  const callbackUrl = rawCallbackUrl && rawCallbackUrl.startsWith("/") ? rawCallbackUrl : "/admin/dashboard";

  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center py-16 px-4">Loading…</div>}>
      <LoginPageClient callbackUrl={callbackUrl} />
    </Suspense>
  );
}
