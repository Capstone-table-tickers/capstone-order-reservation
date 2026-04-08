import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {},
  {
    pages: {
      signIn: "/api/auth/signin",
    },
    callbacks: {
      authorized: ({ token }) => {
        if (!token) return false;
        return token.role === "ADMIN";
      },
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"],
};