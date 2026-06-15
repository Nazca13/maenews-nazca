// app/lib/auth.ts — NextAuth configuration
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@maenews.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Mock auth — replace with real backend auth when ready
        if (
          credentials?.email === "admin@maenews.com" &&
          credentials?.password === "admin123"
        ) {
          return {
            id: "admin-1",
            name: "Admin Maenews",
            email: "admin@maenews.com",
            role: "admin",
          };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = "admin";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { role?: string }).role = token.role as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "maenews-admin-secret-dev-only",
};
