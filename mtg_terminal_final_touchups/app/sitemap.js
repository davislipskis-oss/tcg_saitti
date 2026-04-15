import { products } from '@/data/products';

export default function sitemap() {
  const base = 'https://example.com';
  const staticPages = ['', '/signals', '/market', '/scanner', '/methodology', '/contact', '/about', '/legal/disclaimer', '/legal/privacy', '/legal/terms'];

  return [
    ...staticPages.map((route) => ({ url: `${base}${route}`, lastModified: new Date() })),
    ...products.map((product) => ({
      url: `${base}/product/${product.slug}`,
      lastModified: new Date(),
    })),
  ];
}
