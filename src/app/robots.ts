import type { MetadataRoute } from "next";
import { firma } from "@/content/firma";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/admin" },
    sitemap: `${firma.url}/sitemap.xml`,
  };
}
