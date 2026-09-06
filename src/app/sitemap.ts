import { MetadataRoute } from 'next';

const FALLBACK_PAGES = [
  { path: '', priority: 1.0, changeFreq: 'weekly' },
  { path: '/estimator', priority: 0.95, changeFreq: 'weekly' },
  { path: '/portfolio', priority: 0.85, changeFreq: 'weekly' },
  { path: '/about', priority: 0.75, changeFreq: 'monthly' },
  { path: '/contact', priority: 0.8, changeFreq: 'monthly' },
  { path: '/privacy-policy', priority: 0.3, changeFreq: 'yearly' },
  { path: '/terms-of-service', priority: 0.3, changeFreq: 'yearly' },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bburnbuilders.com';

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    const res = await fetch(`${apiUrl}/seo/bundle`, {
      next: { revalidate: 3600 },
    });

    if (res.ok) {
      const json = await res.json();
      const pages = json.data?.pages || [];
      const siteUrl = json.data?.global?.siteUrl || baseUrl;

      if (pages.length > 0) {
        return pages
          .filter((p: any) => !p.noIndex)
          .map((p: any) => {
            const cleanPath = p.path === '/' ? '' : p.path;
            return {
              url: `${siteUrl}${cleanPath}`,
              lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(),
              changeFrequency: (p.changeFreq || 'weekly') as
                | 'always'
                | 'hourly'
                | 'daily'
                | 'weekly'
                | 'monthly'
                | 'yearly'
                | 'never',
              priority: typeof p.priority === 'number' ? p.priority : 0.8,
            };
          });
      }
    }
  } catch (err) {
    // Graceful fallback to static routes
  }

  return FALLBACK_PAGES.map((page) => ({
    url: `${baseUrl}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFreq as 'weekly' | 'monthly' | 'yearly',
    priority: page.priority,
  }));
}
