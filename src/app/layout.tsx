import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/providers/SmoothScrollProvider";
import CustomCursor from "@/components/CustomCursor";

// Load Inter for body text
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Load Space Grotesk for headings
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tharusha | Creative Developer & Designer",
  description:
    "Portfolio of Tharusha - A creative developer specializing in building practical digital solutions.",
  keywords: [
    "developer",
    "designer",
    "portfolio",
    "react",
    "next.js",
    "creative",
  ],
  authors: [{ name: "Tharusha" }],
  openGraph: {
    title: "Tharusha | Creative Developer & Designer",
    description:
      "Portfolio of Tharusha - A creative developer specializing in building practical digital solutions.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="lenis">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased bg-black text-white cursor-none md:cursor-none`}
        style={{
          fontFamily: "var(--font-inter), 'Inter', sans-serif",
        }}
      >
        <SmoothScrollProvider>
          <CustomCursor />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
