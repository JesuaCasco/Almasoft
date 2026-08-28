import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  const host = siteConfig.domain || "https://example.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${host}/sitemap.xml`,
  };
}
