import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";

const font = Open_Sans({
  subsets: ["latin"],
});

export const metadata = {
  title: "Kollaborate",
  description: "Connect, Collaborate, Communicate",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${font.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
