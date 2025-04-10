import type { Metadata } from "next";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";

import "keen-slider/keen-slider.min.css";
import { Toaster } from "sonner";
import { SupabaseProvider } from "@/components/SupabaseProvider";
import ClientLayout from "@/components/ClientLayout";


const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Youradress",
  description: "Booking website application",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Toaster richColors position="top-center" />
        <SupabaseProvider>
          <ClientLayout>{children}</ClientLayout>
        </SupabaseProvider>
      </body>
    </html>
  );
}
