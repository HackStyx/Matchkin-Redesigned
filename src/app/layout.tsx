import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'),
  title: 'MatchKin - Connect With Experts',
  description: 'Join the waitlist for MatchKin, the future of meaningful connections. Inspired by CRED\'s premium design.',
  icons: {
    icon: '/matchkin-icon.svg',
    shortcut: '/matchkin-icon.svg',
    apple: '/matchkin-icon.svg',
  },
  openGraph: {
    title: 'MatchKin - Connect With Experts',
    description: 'Premium connection platform with CRED-inspired design',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MatchKin - Connect With Experts',
    description: 'Premium connection platform with CRED-inspired design',
  },
};

// Enable static generation for optimal performance
export const dynamic = 'force-static';
export const revalidate = false;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable}`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
