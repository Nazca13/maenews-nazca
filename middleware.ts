// middleware.ts — Route protection for admin pages
import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token,
  },
  pages: {
    signIn: "/admin/login",
  },
});

export const config = {
  matcher: [
    "/admin",
    "/admin/:path*",
  ],
};
