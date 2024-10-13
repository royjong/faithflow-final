import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "SpiritSounds - De beste app voor Christelijke Meditaties en Gebeden",
  description: "Ontdek meer dan 100 diepgaande christelijke meditaties en gebeden. Start je gratis proefperiode en versterk je spirituele reis met SpiritSounds. Verbeter je geestelijke gezondheid en vind rust.",
  keywords: "christelijke meditatie, gebeden, spirituele groei, meditatie app, geestelijke gezondheid, mindfulness",
  creator: "SpiritSounds Team",
  robots: "index, follow",
  openGraph: {
    title: "SpiritSounds - Jouw bron voor christelijke meditaties",
    description: "Ontdek meer dan 100 unieke meditaties en gebeden. Versterk je spirituele reis met SpiritSounds. Begin je gratis proefperiode vandaag!",
    url: "https://spiritsounds.com",
    type: "website",
    images: [
      {
        url: "https://i.ibb.co/8N97C29/Scherm-afbeelding-2024-10-13-om-20-51-11.png",
        alt: "SpiritSounds Logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://spiritsounds.com" /> {/* Replace with your actual URL */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
