import LoginPageClient from "./login-page-client";

interface LoginPageProps {
  searchParams?: Promise<{ callbackUrl?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const rawCallbackUrl = params?.callbackUrl;
  const callbackUrl =
    rawCallbackUrl && rawCallbackUrl.startsWith("/")
      ? rawCallbackUrl
      : "/admin/dashboard";

  return <LoginPageClient callbackUrl={callbackUrl} />;
}
