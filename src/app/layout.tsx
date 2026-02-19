import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: "RenoLaunch OS",
  description: "Multi-tenant agency CRM for contractors",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="min-h-screen bg-reno-bg text-reno-text-1 antialiased">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
