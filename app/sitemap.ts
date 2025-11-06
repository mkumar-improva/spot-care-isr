import { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();

  // Static routes (manually define your main pages)
  const staticPages = [
    "",
    "/about",
    "/contact",
    "/faq",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Example dynamic routes — if you have provider or service pages
  // Fetch from API or database
  const providers = await fetch(`${siteUrl}/api/providers`).then((res) =>
    res.json().catch(() => [])
  );

  const providerPages =
    providers?.map((p: { code: string }) => ({
      url: `${siteUrl}/detail-screen/${p.code}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    })) ?? [];

  return [...staticPages, ...providerPages];
}
