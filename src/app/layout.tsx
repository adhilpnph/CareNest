import type { Metadata } from "next";
import { StoreProvider } from "./components/shared/StoreProvider";
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
      <body className="min-h-full text-[#292830]">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
