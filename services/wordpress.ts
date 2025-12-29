
import { NewsArticle } from "../types";

const WP_API_URL = "https://hubofluck.com/wp-json/wp/v2";

export const fetchWordPressPosts = async (): Promise<NewsArticle[]> => {
  try {
    // We use _embed to get images and author data in one request
    const response = await fetch(`${WP_API_URL}/posts?_embed&per_page=6`);
    if (!response.ok) throw new Error('Network response was not ok');
    
    const data = await response.json();

    return data.map((post: any) => {
      // Clean Elementor/WP garbage from excerpts
      const cleanExcerpt = post.excerpt.rendered
        .replace(/<[^>]*>?/gm, '')
        .replace(/\[&hellip;\]/g, '...')
        .trim();

      return {
        id: `wp-${post.id}`,
        title: post.title.rendered,
        excerpt: cleanExcerpt.substring(0, 160) + '...',
        content: post.content.rendered,
        category: "Editorial",
        author: post._embedded?.author?.[0]?.name || "Hub of Luck Team",
        date: new Date(post.date).toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        }),
        imageUrl: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || `https://images.unsplash.com/photo-1541167760496-1628856ab752?auto=format&fit=crop&q=80&w=800`,
        sources: [{ uri: post.link, title: "Read on HubofLuck" }]
      };
    });
  } catch (error) {
    console.warn("WordPress Fetch failed, falling back to AI only:", error);
    return [];
  }
};
