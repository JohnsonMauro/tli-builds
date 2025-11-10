import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/modules/common/ui/Header";
import { Footer } from "@/modules/common/ui/Footer";
import { LangSetter } from "@/modules/common/ui/LangSetter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TorchLight Infinite",
  description: "TLI Frontend",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <LangSetter />
        <Header />
        <main className="flex-1 container mx-auto px-4 py-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
