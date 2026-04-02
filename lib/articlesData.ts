// Import bundled articles content (generated at build time)
import articlesContentMap from "./articlesContent.json";

export function getArticleContent(slug: string): string | null {
  return (articlesContentMap as Record<string, string>)[slug] || null;
}

export function getAllArticleSlugs(): string[] {
  return Object.keys(articlesContentMap);
}
