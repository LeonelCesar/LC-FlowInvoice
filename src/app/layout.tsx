import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { APP_METADATA } from "@/config/metadata";

import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://flow-invoice.com"),

  title: {
    default: APP_METADATA.TITLE,
    template: `%s | ${APP_METADATA.APP_NAME}`,
  },

  description: APP_METADATA.DESCRIPTION,

  applicationName: String(APP_METADATA.APP_NAME),

  openGraph: {
    title: APP_METADATA.TITLE,
    description: APP_METADATA.DESCRIPTION,
    type: "website",
    locale: "pt_PT",
  },

  robots: {
    index: true,
    follow: true,
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-PT">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
