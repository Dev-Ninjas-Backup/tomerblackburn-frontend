import { MetadataRoute } from 'next';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bburnbuilders.com';

  let robotsIndex = true;
  let robotsFollow = true;

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    const res = await fetch(`${apiUrl}/seo/global`, {
      next: { revalidate: 3600 },
    });

    if (res.ok) {
      const json = await res.json();
      if (json.data) {
        robotsIndex = json.data.robotsIndex ?? true;
        robotsFollow = json.data.robotsFollow ?? true;
      }
    }
  } catch (err) {
    // Fallback to default allowed indexing
  }

  if (!robotsIndex) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
      sitemap: `${baseUrl}/sitemap.xml`,
    };
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/dashboard/',
          '/dashboard/*',
          '/api/',
          '/api/*',
          '/login',
          '/register',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
