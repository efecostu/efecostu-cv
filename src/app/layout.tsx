import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  metadataBase: new URL("https://efecostu.space"),
  title: "Efe Costu",
  description:
    "Efe Costu — Strategy & Business Development Specialist at SKF. Industrial Engineer (Kadir Has) with an MSc in Business Management (UEA), McKinsey Forward graduate and SAP S/4HANA Certified Associate.",
  generator: "Next.js",
  applicationName: "Efe Costu Portfolio",
  keywords: [
    "Efe Costu",
    "efecostu",
    "Efe Coştu",
    "Industrial Engineer",
    "Business Management",
    "Strategy",
    "Business Development",
    "SKF",
    "Key Account Management",
    "SAP S/4HANA",
    "McKinsey Forward",
    "portfolio",
  ],
  authors: [{ name: "Efe Costu" }],
  creator: "Efe Costu",
  publisher: "Efe Costu",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Efe Costu",
    description: "Strategy & Business Development Specialist at SKF · Industrial Engineer · MSc Business Management",
    url: "https://efecostu.space",
    siteName: "Efe Costu",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Efe Costu - Industrial Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Efe Costu",
    description: "Strategy & Business Development Specialist at SKF · Industrial Engineer · MSc Business Management",
    creator: "@efecostu",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [{ url: "/favicon.ico" }],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <div className="relative">
          <div className="relative mx-auto max-w-screen-xl">
            <div className="absolute left-4 sm:left-8 top-0 bottom-0 border-l border-dotted border-[var(--border)] h-full overflow-hidden" aria-hidden="true"></div>
            <div className="absolute right-4 sm:right-8 top-0 bottom-0 border-l border-dotted border-[var(--border)] h-full overflow-hidden" aria-hidden="true"></div>

            <div className="px-[18px] sm:px-[34px]">{children}</div>
          </div>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
