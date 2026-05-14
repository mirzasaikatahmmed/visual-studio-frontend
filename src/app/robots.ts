import { MetadataRoute } from "next";

const disallow = ["/api/", "/admin/", "/(auth-layout)/", "/(dashboard-layout)/"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      { userAgent: "Googlebot", allow: "/", disallow },
      { userAgent: "Bingbot", allow: "/", disallow },
      { userAgent: "GPTBot", allow: "/", disallow },
      { userAgent: "ChatGPT-User", allow: "/", disallow },
      { userAgent: "OAI-SearchBot", allow: "/", disallow },
      { userAgent: "ClaudeBot", allow: "/", disallow },
      { userAgent: "anthropic-ai", allow: "/", disallow },
      { userAgent: "Google-Extended", allow: "/", disallow },
      { userAgent: "PerplexityBot", allow: "/", disallow },
      { userAgent: "FacebookBot", allow: "/", disallow },
      { userAgent: "Applebot", allow: "/", disallow },
      { userAgent: "Applebot-Extended", allow: "/", disallow },
      { userAgent: "YouBot", allow: "/", disallow },
      { userAgent: "cohere-ai", allow: "/", disallow },
      { userAgent: "Amazonbot", allow: "/", disallow },
      { userAgent: "CCBot", allow: "/", disallow },
      { userAgent: "Diffbot", allow: "/", disallow },
      { userAgent: "Bytespider", allow: "/", disallow },
    ],
    sitemap: "https://www.visualstudioslens.com/sitemap.xml",
  };
}
