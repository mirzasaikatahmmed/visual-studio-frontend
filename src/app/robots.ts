import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/(auth-layout)/", "/(dashboard-layout)/"],
      },
    ],
    sitemap: "https://www.visualstudioslens.com/sitemap.xml",
  };
}
