import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/provider/QueryProvider";
import { AuthProvider } from "@/provider/AuthContext";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SparkGear – Gadgets & Electronics Store",
  description:
    "Buy the latest phones, laptops, keyboards, mice, and other gadgets at SparkGear. High-quality products, best prices, and fast delivery.",
  keywords:
    "SparkGear, gadgets, electronics, phones, laptops, keyboards, mice, tech store, online electronics",
  robots: "index, follow",
  openGraph: {
    title: "SparkGear – Gadgets & Electronics Store",
    description:
      "Discover and shop the latest tech gadgets, from smartphones to laptops, keyboards, and more at SparkGear.",
    type: "website",
    url: "https://sparkgear.com",
    siteName: "SparkGear",
    images: [
      {
        url: "https://sparkgear.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SparkGear - Shop Electronics and Gadgets",
      },
    ],
  },
};

// Global viewport & theme color
export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const themeColor = "#1A7F73";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <QueryProvider>{children}</QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
