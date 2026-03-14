import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Elora | Premium Women's Clothing",
  description: "Shop trendy and elegant women's clothing at Elora. Discover modern everyday wear and premium styles.",
};

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Providers from "@/components/Providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
