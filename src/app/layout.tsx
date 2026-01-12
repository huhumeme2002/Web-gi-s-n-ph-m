import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/lib/context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Shop - Premium AI Tools at Best Prices",
  description: "Cung cấp ChatGPT Plus, Cursor Pro, GitHub Copilot và các công cụ AI cao cấp với giá tốt nhất Việt Nam. Uy tín, nhanh chóng, hỗ trợ 24/7.",
  keywords: ["ChatGPT Plus", "Cursor Pro", "GitHub Copilot", "AI tools", "mua tài khoản AI"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a12] text-white`}
      >
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
