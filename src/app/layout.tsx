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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Person',
                  '@id': 'https://christianbourlier.com/#person',
                  name: 'Christian Bourlier',
                  givenName: 'Christian',
                  familyName: 'Bourlier',
                  description:
                    'Solutions Architect, Data Engineer, AI/ML Engineer & Technical Account Manager with 8+ years data engineering on GCP and 20 years enterprise sales.',
                  jobTitle: [
                    'Solutions Architect',
                    'Data Engineer',
                    'AI/ML Engineer',
                    'Technical Account Manager',
                    'Technical Solutions Partner',
                  ],
                  url: 'https://christianbourlier.com',
                  image: 'https://christianbourlier.com/opengraph-image',
                  sameAs: [
                    'https://linkedin.com/in/christianbourlier',
                    'https://medium.com/@christianbourlier',
                  ],
                  knowsAbout: [
                    'Technical Engineering',
                    'Solutions Architecture',
                    'AI/ML',
                    'Machine Learning',
                    'GCP',
                    'Google Cloud Platform',
                    'BigQuery',
                    'Vertex AI',
                    'LangChain',
                    'Python',
                    'TypeScript',
                    'Enterprise Sales',
                    'Cloud Architecture',
                    'Data Pipelines',
                    'ETL',
                    'SQL',
                    'Terraform',
                    'Next.js',
                    'Technical Account Management',
                  ],
                  hasCredential: [
                    {
                      '@type': 'EducationalOccupationalCredential',
                      credentialCategory: 'certification',
                      name: 'Google Cloud Professional Data Engineer',
                      recognizedBy: {
                        '@type': 'Organization',
                        name: 'Google Cloud',
                      },
                    },
                    {
                      '@type': 'EducationalOccupationalCredential',
                      credentialCategory: 'certification',
                      name: 'Google Cloud Professional Cloud Architect',
                      recognizedBy: {
                        '@type': 'Organization',
                        name: 'Google Cloud',
                      },
                    },
                  ],
                  hasOccupation: [
                    {
                      '@type': 'Occupation',
                      name: 'Solutions Architect',
                      occupationLocation: {
                        '@type': 'Country',
                        name: 'US',
                      },
                      skills:
                        'Cloud Architecture, GCP, Vertex AI, BigQuery, Terraform, Python, TypeScript',
                    },
                    {
                      '@type': 'Occupation',
                      name: 'Data Engineer',
                      occupationLocation: {
                        '@type': 'Country',
                        name: 'US',
                      },
                      skills:
                        'Data Pipelines, ETL, BigQuery, SQL, Python, GCP, Machine Learning',
                    },
                  ],
                },
                {
                  '@type': 'WebSite',
                  name: 'Christian Bourlier',
                  description:
                    'Personal portfolio of Christian Bourlier — Solutions Architect, Data Engineer, AI/ML Engineer & Technical Account Manager.',
                  url: 'https://christianbourlier.com',
                  publisher: {
                    '@id': 'https://christianbourlier.com/#person',
                  },
                },
              ],
            }),
          }}
        />
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
        <ThemeProvider paletteId={paletteId} colors={palette.colors}>{children}</ThemeProvider>
      </body>
    </html>
  );
}
