import type { Metadata } from "next";
import { Playfair_Display, Newsreader, Noto_Serif, Plus_Jakarta_Sans, Allura, Lora, Montserrat } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400", "700"],
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400", "700"],
});

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  variable: "--font-noto-serif",
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400", "700"],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const allura = Allura({
  subsets: ["latin"],
  variable: "--font-allura-font",
  display: "swap",
  weight: "400",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400", "700"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat-font",
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.rinconesbari.com"),
  title: {
    default: "Rincones Bari — Decoración de interiores con alma",
    template: "%s | Rincones Bari",
  },
  description: "Inspírate para transformar tu hogar en un refugio de calma y belleza. Ideas de decoración con alma para cada estancia.",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://www.rinconesbari.com",
    siteName: "Rincones Bari",
    images: [{ url: "/brand/rincones-bari-hero-01.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${newsreader.variable} ${notoSerif.variable} ${plusJakarta.variable} ${allura.variable} ${lora.variable} ${montserrat.variable}`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-on-surface font-label antialiased">
        {children}
      </body>
    </html>
  );
}
