import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { getActivePaletteId } from '@/lib/edge-config';
import { getPalette, type PaletteColors } from '@/config/palettes';
import { ThemeProvider } from '@/lib/palette-context';
import { WebVitals } from '@/components/layout/WebVitals';
import { CookieConsent } from '@/components/ui/CookieConsent';
import { ToastProvider } from '@/components/ui/Toast';
import { getStructuredData } from '@/lib/seo/structured-data';
import { MotionProvider } from '@/components/providers/MotionProvider';
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
  metadataBase: new URL('https://christianbourlier.com'),
  title: 'Christian Bourlier | Solutions Architect & Data Engineer',
  description:
    'Solutions Architect, Data Engineer, AI/ML Engineer & Technical Account Manager. 8+ years data engineering on GCP, 20 years enterprise sales.',
  keywords: [
    'Christian Bourlier',
    'Solutions Architect',
    'Data Engineer',
    'AI/ML Engineer',
    'Technical Account Manager',
    'Technical Solutions Partner',
    'Technical Engineering',
    'Solutions Architecture',
    'GCP Professional Data Engineer',
    'GCP Professional Cloud Architect',
    'BigQuery',
    'Vertex AI',
    'LangChain',
    'Python',
    'TypeScript',
    'Enterprise Sales',
    'Cloud Architecture',
    'Machine Learning',
  ],
  alternates: {
    canonical: 'https://christianbourlier.com',
  },
  authors: [{ name: 'Christian Bourlier', url: 'https://christianbourlier.com' }],
  creator: 'Christian Bourlier',
  category: 'Technology',
  manifest: '/manifest.webmanifest',
  openGraph: {
    title: 'Christian Bourlier | Solutions Architect & Data Engineer',
    description:
      'Solutions Architect, Data Engineer, AI/ML Engineer & Technical Account Manager. 8+ years data engineering on GCP, 20 years enterprise sales.',
    type: 'website',
    url: 'https://christianbourlier.com',
    siteName: 'Christian Bourlier',
    locale: 'en_US',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Christian Bourlier | Solutions Architect & Data Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Christian Bourlier | Solutions Architect & Data Engineer',
    description:
      'Solutions Architect, Data Engineer, AI/ML Engineer & Technical Account Manager. 8+ years data engineering on GCP, 20 years enterprise sales.',
    images: ['/twitter-image'],
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
        <link rel="preconnect" href="https://www.youtube.com" />
        <link rel="preconnect" href="https://i.ytimg.com" />
        <link rel="preconnect" href="https://cdn-images-1.medium.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        <link rel="dns-prefetch" href="https://i.ytimg.com" />
        <link rel="dns-prefetch" href="https://cdn-images-1.medium.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getStructuredData()) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `if('serviceWorker' in navigator){window.addEventListener('load',function(){navigator.serviceWorker.register('/sw.js')})}`,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <WebVitals />
        <CookieConsent />
        <MotionProvider>
          <ThemeProvider paletteId={paletteId} colors={palette.colors}>
            <ToastProvider>{children}</ToastProvider>
          </ThemeProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
