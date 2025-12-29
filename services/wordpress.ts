import { NewsArticle } from "../types.ts";

const WP_API_URL = "https://hubofluck.com/wp-json/wp/v2";

export const fetchWordPressPosts = async (): Promise<NewsArticle[]> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(`${WP_API_URL}/posts?_embed&per_page=6`, {
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`WordPress API returned ${response.status}`);
    }
    
    const data = await response.json();

    if (!Array.isArray(data)) return [];

    return data.map((post: any) => {
      const cleanExcerpt = post.excerpt?.rendered
        ? post.excerpt.rendered.replace(/<[^>]*>?/gm, '').replace(/\[&hellip;\]/g, '...').trim()
        : "Latest update from the Hub of Luck editorial team.";

      return {
        id: `wp-${post.id}`,
        title: post.title?.rendered || "Untitled Post",
        excerpt: cleanExcerpt.substring(0, 160) + '...',
        content: post.content?.rendered || "",
        category: "Editorial",
        author: post._embedded?.author?.[0]?.name || "Editorial Team",
        date: new Date(post.date).toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric'
        }),
        imageUrl: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || `https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&q=80&w=800`,
        sources: [{ uri: post.link, title: "Source HubofLuck" }]
      };
    });
  } catch (error) {
    console.warn("WordPress Sync skipped:", error instanceof Error ? error.message : "Network error");
    return [];
  }
};