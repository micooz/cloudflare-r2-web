import "./globals.css";
import { Providers } from "./providers";
import { MAIN_TITLE } from "@/constants";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const runtime = "edge";

export const metadata: Metadata = {
  title: MAIN_TITLE,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
