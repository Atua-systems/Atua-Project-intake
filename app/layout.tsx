import type { Metadata, Viewport } from 'next';
import { Syncopate, Cormorant_Garamond, Jost } from 'next/font/google';
import './globals.css';

const syncopate = Syncopate({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-syncopate',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
});

const jost = Jost({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-jost',
});

export const metadata: Metadata = {
  title: 'Atua Ops — Project Management',
  description: 'Premium project management dashboard for digital agencies',
};

export const viewport: Viewport = {
  themeColor: '#0B1628',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${syncopate.variable} ${cormorant.variable} ${jost.variable} bg-atua-bg`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
