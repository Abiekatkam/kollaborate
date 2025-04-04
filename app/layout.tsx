import { Open_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";

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
        className={`${font.className} antialiased dark:bg-black bg-white`}
      >
        <ThemeProvider
          attribute={"class"}
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
