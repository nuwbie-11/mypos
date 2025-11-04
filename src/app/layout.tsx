import { Plus_Jakarta_Sans, IBM_Plex_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Plus_Jakarta_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = IBM_Plex_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: "100",
});

export const metadata: Metadata = {
  title: "MyPOS - Point of Sale System",
  description: "Modern Point of Sale solution with multi-language support",
  keywords: ["pos", "point of sale", "business", "retail", "management", "inventory"],
  authors: [{ name: "MyPOS Team" }],
  creator: "MyPOS Team",
  publisher: "MyPOS Team",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mypos.example.com",
    title: "MyPOS - Point of Sale System",
    description: "Modern Point of Sale solution with multi-language support",
    siteName: "MyPOS",
  },
  twitter: {
    card: "summary_large_image",
    title: "MyPOS - Point of Sale System",
    description: "Modern Point of Sale solution with multi-language support",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
