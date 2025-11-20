import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"]
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Euuu | Immersive Sound Garden",
  description:
    "Euuu blends ambient visuals and adaptive audio to craft a tranquil, interactive sound garden experience.",
  metadataBase: new URL("https://agentic-457a1f5a.vercel.app"),
  openGraph: {
    title: "Euuu | Immersive Sound Garden",
    description:
      "Guided breathing, adaptive soundscapes, and interactive blooms in a serene digital escape.",
    url: "https://agentic-457a1f5a.vercel.app",
    siteName: "Euuu",
    images: [
      {
        url: "/opengraph-preview.png",
        width: 1200,
        height: 630,
        alt: "Euuu - Immersive Sound Garden"
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Euuu | Immersive Sound Garden",
    description:
      "Guided breathing, adaptive soundscapes, and interactive blooms in a serene digital escape.",
    images: ["/opengraph-preview.png"]
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f172a"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
