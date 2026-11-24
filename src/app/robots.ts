
import type { MetadataRoute } from "next";

const BASE_URL = "https://sitecroftdev.dnnengineer.com";

const allowedBots = [
  // Search engines
  "Googlebot",
  "Googlebot-Image",
  "Googlebot-News",
  "Google-Extended",
  "Bingbot",
  "BingPreview",
  "DuckDuckBot",
  "YandexBot",
  "Baiduspider",
  "Applebot",
  "Applebot-Extended",

  // OpenAI / ChatGPT
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",

  // Other AI search engines
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "Amazonbot",
  "YouBot",
  "Bytespider",
  "cohere-ai",
  "cohere-training-data-crawler",
  "Meta-ExternalAgent",
  "FacebookBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // General access for all other crawlers
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },

      // Explicit permissions for known search and AI crawlers
      ...allowedBots.map((bot) => ({
        userAgent: bot,
        allow: "/",
        disallow: ["/admin/", "/api/"],
      })),
    ],

    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
