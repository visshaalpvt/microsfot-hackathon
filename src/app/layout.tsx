import type { Metadata } from "next";
import "./globals.css";
import Layout from "@/components/layout/Layout";
import { AppProvider } from "@/lib/store";

export const metadata: Metadata = {
  title: "DealMind AI - Memory-Powered Sales Intelligence",
  description: "AI Deal Intelligence Agent with Persistent Memory for Sales Teams",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        <AppProvider>
          <Layout>
            {children}
          </Layout>
        </AppProvider>
      </body>
    </html>
  );
}
