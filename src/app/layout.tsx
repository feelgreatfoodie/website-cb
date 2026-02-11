import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { getActivePaletteId } from '@/lib/edge-config';
import { getPalette, type PaletteColors } from '@/config/palettes';
import { ThemeProvider } from '@/lib/palette-context';
import './globals.css';

const GA_ID = 'G-N91F3VEKB4';

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

function cssVarsFromPalette(colors: PaletteColors): Record<string, string> {
  return {
    '--background': colors.background,
    '--background-light': colors.backgroundLight,
    '--accent': colors.accent,
    '--cta': colors.cta,
    '--foreground': colors.foreground,
    '--stream1': colors.stream1,
    '--stream2': colors.stream2,
    '--stream3': colors.stream3,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const paletteId = await getActivePaletteId();
  const palette = getPalette(paletteId);

  return (
    <html
      lang="en"
      className="scroll-smooth"
      style={cssVarsFromPalette(palette.colors) as React.CSSProperties}
    >
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
        </Script>
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ThemeProvider colors={palette.colors}>{children}</ThemeProvider>
      </body>
    </html>
  );
}
