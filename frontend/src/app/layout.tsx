import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Σῐ́βυλλᾰ",
  description: "Consult the future.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body className={`${inter.className} overflow-hidden`}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange enableColorScheme>
            {children}
          </ThemeProvider>
        </body>
    </html>
  );
}
