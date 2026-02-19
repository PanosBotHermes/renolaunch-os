import type { Metadata } from "next";
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
    <html lang="en">
      <body className="antialiased" style={{ backgroundColor: "#080C14", color: "#F1F5F9", minHeight: "100vh" }}>
        {children}
      </body>
    </html>
  );
}
