// app/admin/layout.tsx — Root layout for CMS admin panel
// Inherits the same font, favicon, and design tokens as the main (user) site.
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { AdminClientLayout } from "@/app/components/layout/admin/AdminClientLayout";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Maenews CMS — Admin Panel",
  description: "Content Management System untuk portal berita Maenews.",
  robots: { index: false, follow: false },
  icons: {
    icon: [
      { url: "/favicon/favicon.ico" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/favicon/apple-touch-icon.png",
    other: [
      { rel: "android-chrome-192x192", url: "/favicon/android-chrome-192x192.png" },
      { rel: "android-chrome-512x512", url: "/favicon/android-chrome-512x512.png" },
    ],
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=ADLaM+Display&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${poppins.variable} antialiased`}>
        <AdminClientLayout>{children}</AdminClientLayout>
      </body>
    </html>
  );
}
