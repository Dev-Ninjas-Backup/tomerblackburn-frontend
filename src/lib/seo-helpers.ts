import { Metadata } from 'next';

interface FallbackMetadata {
  title: string;
  description: string;
  keywords?: string;
}

export async function getPageMetadata(
  path: string,
  fallback: FallbackMetadata
): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bburnbuilders.com';

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    const res = await fetch(
      `${apiUrl}/seo/page?path=${encodeURIComponent(path)}`,
      { next: { revalidate: 3600 } }
    );

    if (res.ok) {
      const json = await res.json();
      const page = json.data;
      if (page) {
        const canonical =
          page.canonicalUrl || `${baseUrl}${path === '/' ? '' : path}`;
        return {
          title: page.title || fallback.title,
          description: page.description || fallback.description,
          keywords: page.keywords
            ? page.keywords.split(',').map((k: string) => k.trim())
            : fallback.keywords
            ? fallback.keywords.split(',').map((k: string) => k.trim())
            : undefined,
          openGraph: {
            title: page.ogTitle || page.title || fallback.title,
            description:
              page.ogDescription || page.description || fallback.description,
            images: page.ogImage ? [{ url: page.ogImage }] : undefined,
          },
          robots: {
            index: !page.noIndex,
            follow: !page.noFollow,
          },
          alternates: {
            canonical,
          },
        };
      }
    }
  } catch (err) {
    // Graceful fallback to static meta
  }

  return {
    title: fallback.title,
    description: fallback.description,
    keywords: fallback.keywords
      ? fallback.keywords.split(',').map((k: string) => k.trim())
      : undefined,
    alternates: {
      canonical: `${baseUrl}${path === '/' ? '' : path}`,
    },
  };
}
