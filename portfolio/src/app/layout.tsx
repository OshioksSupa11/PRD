import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
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
  title: 'Godsgrace Edem — Fire Protection Engineer & Technical Specialist',
  description:
    'Godsgrace Edem is a Fire Protection Engineer with 12+ years of experience designing and implementing fire safety systems across commercial, industrial, and residential sectors.',
  keywords: [
    'Fire Protection Engineer',
    'Fire Safety',
    'Mechanical Engineer',
    'NFPA',
    'Fire Suppression',
    'Godsgrace Edem',
    'Engineering Consultant',
  ],
  authors: [{ name: 'Godsgrace Edem' }],
  openGraph: {
    title: 'Godsgrace Edem — Fire Protection Engineer',
    description:
      'Fire Protection Engineer with 12+ years of experience in fire safety systems design and consulting.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Godsgrace Edem Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Godsgrace Edem — Fire Protection Engineer',
    description:
      'Fire Protection Engineer with 12+ years of experience in fire safety systems design and consulting.',
  },
  robots: {
    index: true,
    follow: true,
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
    >
      <body className="min-h-screen flex flex-col bg-bg text-text">
        <a href="#highlights" className="skip-link">
          Skip to content
        </a>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
