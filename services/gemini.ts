import { GoogleGenAI } from "@google/genai";
import { NewsArticle } from "../types";

export const fetchLatestGamingNews = async (query: string): Promise<NewsArticle[]> => {
  try {
    // Standard access to process.env.API_KEY
    const apiKey = process.env.API_KEY;
    
    if (!apiKey) {
      console.warn("Gemini Intelligence: API_KEY is undefined. Falling back to editorial content.");
      return [];
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are a high-end editor for hubofluck.com. Provide 5 latest authoritative news updates for: "${query}". Format each entry on a new line as: Headline | Category | Summary.`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "";
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    // Parse response into articles
    const articles: NewsArticle[] = text.split('\n')
      .filter(line => line.includes('|'))
      .slice(0, 5)
      .map((line, idx) => {
        const [title, category, summary] = line.split('|').map(s => s.trim());
        return {
          id: `ai-${idx}-${Date.now()}`,
          title: title || "Industry Insight",
          excerpt: summary ? summary.substring(0, 160) + '...' : "Critical gaming industry update.",
          content: summary || "Complete intelligence report pending...",
          category: category || "Intelligence",
          author: "Hub Analytics",
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          imageUrl: `https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=800&sig=${idx}`,
          sources: chunks.filter(c => c.web).map(c => ({ 
            uri: c.web?.uri || '', 
            title: c.web?.title || 'External Source' 
          }))
        };
      });

    return articles;
  } catch (error) {
    console.error("Intelligence Fetch Error:", error);
    return [];
  }
};