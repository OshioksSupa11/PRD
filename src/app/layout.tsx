import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import ThemeProvider from '@/components/shared/ThemeProvider';
import AnalyticsProvider from '@/components/shared/AnalyticsProvider';
import { PersonSchema } from '@/components/seo/JsonLd';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/ai/ChatWidget';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Godsgrace Edem — Fire Protection Engineer & Technology Builder',
  description:
    'Godsgrace Edem is a Fire Protection Engineer with 6+ years of experience in inspection, testing, and maintenance of fire protection systems across commercial and industrial sectors. Transitioning into technology building.',
  keywords: [
    'Fire Protection Engineer',
    'Fire Safety',
    'Mechanical Engineer',
    'NFPA',
    'Fire Suppression',
    'Godsgrace Edem',
    'Engineering Consultant',
    'Fire Maintenance Engineer',
    'Fire Safety Specialist',
    'NFPA Certification',
    'Fire Protection Systems',
    'Engineering Portfolio',
    'Professional Portfolio Website',
    'Software Developer',
  ],
  authors: [{ name: 'Godsgrace Edem' }],
  openGraph: {
    title: 'Godsgrace Edem — Fire Protection Engineer & Technology Builder',
    description:
      'Fire Protection Engineer with 6+ years of experience in fire protection systems maintenance and consulting. Emerging technology builder.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Godsgrace Edem Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Godsgrace Edem — Fire Protection Engineer & Technology Builder',
    description:
      'Fire Protection Engineer with 6+ years of experience in fire protection systems maintenance and consulting.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://godsgrace-edem.vercel.app',
  },
  metadataBase: new URL('https://godsgrace-edem.vercel.app'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col bg-bg text-text">
        <PersonSchema />
        <ThemeProvider>
          <AnalyticsProvider>
            <a href="#highlights" className="skip-link">
              Skip to content
            </a>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <ChatWidget />
            <Analytics />
          </AnalyticsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
