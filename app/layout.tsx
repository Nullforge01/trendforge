import type { Metadata } from "next";
import { Baloo_2, Inter } from "next/font/google";
import "./globals.css";

const baloo = Baloo_2({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-baloo",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "TrendForge",
  description: "Get followers. Get clients. Get paid. Daily.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${baloo.variable} ${inter.variable} font-body bg-[#EDE4D3] min-h-screen flex justify-center items-center p-0 sm:p-8`}
      >
        {children}
      </body>
    </html>
  );
    }
