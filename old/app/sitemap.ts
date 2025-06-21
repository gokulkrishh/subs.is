import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: `https://sub.is`,
      lastModified: new Date(),
    },
    {
      url: `https://sub.is/settings`,
      lastModified: new Date(),
    },
    {
      url: `https://sub.is/terms`,
      lastModified: new Date(),
    },
    {
      url: `https://sub.is/privacy`,
      lastModified: new Date(),
    },
  ];
}
