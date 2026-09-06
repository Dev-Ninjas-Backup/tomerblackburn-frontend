import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import ReactQueryProvider from '@/providers/ReactQueryProvider';
import { AuthProvider } from '@/components/auth/AuthProvider';
import { Toaster } from 'sonner';

export async function generateMetadata(): Promise<Metadata> {
  const defaultMeta: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://bburnbuilders.com'),
    title: {
      default: 'BBurn Builders — Premier Custom Remodeling & Construction | Chicago, IL',
      template: '%s | BBurn Builders',
    },
    description:
      "Chicago's premier residential remodeling and construction company. Specializing in luxury bathroom remodels, custom carpentry, plumbing, and whole-home renovations.",
    keywords: [
      'home remodeling chicago',
      'bathroom remodel chicago',
      'custom carpentry',
      'luxury renovations illinois',
      'general contractor chicago',
      'bburn builders',
    ],
    openGraph: {
      title: 'BBurn Builders — Premier Custom Remodeling & Construction',
      description: "Chicago's premier residential remodeling and construction company.",
      url: 'https://bburnbuilders.com',
      siteName: 'BBurn Builders',
      images: [
        {
          url: '/logo.png',
          width: 800,
          height: 600,
          alt: 'BBurn Builders Logo',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'BBurn Builders — Premier Custom Remodeling & Construction',
      description: "Chicago's premier residential remodeling and construction company.",
      creator: '@bburnbuilders',
      images: ['/logo.png'],
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: 'https://bburnbuilders.com',
    },
  };

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    const res = await fetch(`${apiUrl}/seo/global`, {
      next: { revalidate: 3600 },
    });

    if (res.ok) {
      const json = await res.json();
      const data = json.data;
      if (data) {
        return {
          metadataBase: new URL(data.siteUrl || 'https://bburnbuilders.com'),
          title: {
            default: data.defaultTitle || 'BBurn Builders',
            template: data.titleTemplate || '%s | BBurn Builders',
          },
          description: data.defaultDescription || defaultMeta.description,
          keywords: data.defaultKeywords
            ? data.defaultKeywords.split(',').map((k: string) => k.trim())
            : defaultMeta.keywords,
          openGraph: {
            title: data.defaultTitle || 'BBurn Builders',
            description: data.defaultDescription || defaultMeta.description,
            url: data.siteUrl || 'https://bburnbuilders.com',
            siteName: data.siteName || 'BBurn Builders',
            images: [
              {
                url: data.ogImageUrl || '/logo.png',
                width: 800,
                height: 600,
                alt: data.siteName || 'BBurn Builders',
              },
            ],
            locale: 'en_US',
            type: 'website',
          },
          twitter: {
            card: 'summary_large_image',
            title: data.defaultTitle || 'BBurn Builders',
            description: data.defaultDescription || defaultMeta.description,
            creator: data.twitterHandle || '@bburnbuilders',
            images: [data.ogImageUrl || '/logo.png'],
          },
          robots: {
            index: data.robotsIndex ?? true,
            follow: data.robotsFollow ?? true,
          },
          verification: {
            google: data.googleSiteVerification || undefined,
            other: {
              ...(data.bingSiteVerification
                ? { 'msvalidate.01': data.bingSiteVerification }
                : {}),
            },
          },
          alternates: {
            canonical: data.canonicalUrl || data.siteUrl || 'https://bburnbuilders.com',
          },
        };
      }
    }
  } catch (err) {
    // Graceful fallback to defaultMeta
  }

  return defaultMeta;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let schemaData: any = null;
  let googleAnalyticsId: string | null = null;
  let googleTagManagerId: string | null = null;

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    const res = await fetch(`${apiUrl}/seo/global`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const json = await res.json();
      const data = json.data;
      if (data) {
        googleAnalyticsId = data.googleAnalyticsId;
        googleTagManagerId = data.googleTagManagerId;
        schemaData = {
          '@context': 'https://schema.org',
          '@type': data.businessType || 'GeneralContractor',
          name: data.siteName || 'BBurn Builders',
          description: data.defaultDescription,
          url: data.siteUrl || 'https://bburnbuilders.com',
          telephone: data.businessPhone || '773-403-9950',
          email: data.businessEmail || 'estimates@bburnbuilders.com',
          priceRange: data.priceRange || '$$$',
          address: {
            '@type': 'PostalAddress',
            streetAddress: data.businessStreetAddress || 'Chicago, IL',
            addressLocality: data.businessCity || 'Chicago',
            addressRegion: data.businessState || 'IL',
            postalCode: data.businessPostalCode || '60601',
            addressCountry: data.businessCountry || 'US',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: data.geoLatitude || 41.8781,
            longitude: data.geoLongitude || -87.6298,
          },
          openingHours: data.openingHours || 'Mo-Sa 08:00-18:00',
          areaServed: data.serviceAreas
            ? data.serviceAreas.split(',').map((s: string) => s.trim())
            : ['Chicago', 'Naperville', 'Evanston'],
        };
      }
    }
  } catch (err) {
    // Fallback schema
    schemaData = {
      '@context': 'https://schema.org',
      '@type': 'GeneralContractor',
      name: 'BBurn Builders',
      url: 'https://bburnbuilders.com',
      telephone: '773-403-9950',
      email: 'estimates@bburnbuilders.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Chicago',
        addressRegion: 'IL',
        addressCountry: 'US',
      },
    };
  }

  return (
    <html lang="en">
      <head>
        {/* Schema.org LocalBusiness Structured Data */}
        {schemaData && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
          />
        )}

        {/* Google Analytics 4 Script */}
        {googleAnalyticsId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${googleAnalyticsId}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}

        {/* Google Tag Manager */}
        {googleTagManagerId && (
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${googleTagManagerId}');
            `}
          </Script>
        )}
      </head>
      <body className="font-sans antialiased">
        {/* Google Tag Manager (noscript) */}
        {googleTagManagerId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${googleTagManagerId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}

        <AuthProvider>
          <ReactQueryProvider>
            {children}
            <Toaster position="top-right" richColors />
          </ReactQueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
