import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CareNest Hospital",
  description: "Hospital MVP prototype",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-stone-100 text-stone-800">{children}</body>
    </html>
  );
}
