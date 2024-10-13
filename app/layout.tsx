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
  title: "SpiritSounds - Your Source for Christian Meditations and Prayers",
  description: "Ontdek 100+ christelijke meditaties en gebeden. Begin je gratis proefperiode en versterk je spirituele reis met SpiritSounds.",
  keywords: "christelijke meditatie, gebeden, spirituele groei, meditatie app, geestelijke gezondheid",
  creator: "SpiritSounds Team",
  robots: "index, follow",
  openGraph: {
    title: "SpiritSounds",
    description: "Ontdek 100+ christelijke meditaties en gebeden. Begin je gratis proefperiode en versterk je spirituele reis met SpiritSounds.",
    url: "https://spiritsounds.com", // Replace with your actual URL
    type: "website",
    images: [
      {
        url: "https://spiritsounds.com/image.jpg", // Replace with your image URL
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
