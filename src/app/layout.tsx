import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Navbar } from "@/components/navigation/Navbar"
import { Footer } from "@/components/layout/Footer"
import { siteConfig } from "@/config/site"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "BITMIND STUDIO — Web & Digital Product Studio",
    template: "%s | BITMIND STUDIO",
  },
  description:
    "BITMIND STUDIO designs and builds websites and digital products for modern businesses.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: "BITMIND STUDIO",
    title: "BITMIND STUDIO — Web & Digital Product Studio",
    description:
      "BITMIND STUDIO designs and builds websites and digital products for modern businesses.",
    images: [
      {
        url: "/brand/og-default.png",
        width: 1200,
        height: 630,
        alt: "BITMIND STUDIO — Web & Digital Product Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BITMIND STUDIO — Web & Digital Product Studio",
    description:
      "BITMIND STUDIO designs and builds websites and digital products for modern businesses.",
    images: ["/brand/og-default.png"],
  },
  icons: {
    icon: [
      { url: "/brand/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/icon-48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: [
      {
        url: "/brand/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                var stored = localStorage.getItem('theme');
                if (stored === 'dark' || (!stored && prefersDark)) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
