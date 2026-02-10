import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Christian Bourlier | Technical Solutions Partner',
  description:
    'I build the system AND close the deal. 8+ years data engineering, 20 years sales, 10 years poker pro.',
  keywords: [
    'Christian Bourlier',
    'Solutions Architect',
    'Data Engineering',
    'Technical Solutions Partner',
  ],
  openGraph: {
    title: 'Christian Bourlier | Technical Solutions Partner',
    description: 'I build the system AND close the deal.',
    type: 'website',
    url: 'https://christianbourlier.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
