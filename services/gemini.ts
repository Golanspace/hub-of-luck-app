import { GoogleGenAI } from "@google/genai";
import { NewsArticle } from "../types";

export const fetchLatestGamingNews = async (query: string): Promise<NewsArticle[]> => {
  try {
    // Standard access to process.env.API_KEY
    const apiKey = process.env.API_KEY;
    
    if (!apiKey || apiKey === '') {
      console.warn("Hub Intelligence: API_KEY missing. App running in Editorial-only mode.");
      return [];
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide 5 news updates for: "${query}". Format: Headline | Category | Summary.`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "";
    
    return text.split('\n')
      .filter(line => line.includes('|'))
      .slice(0, 5)
      .map((line, idx) => {
        const [title, category, summary] = line.split('|').map(s => s.trim());
        return {
          id: `ai-${idx}-${Date.now()}`,
          title: title || "Industry Insight",
          excerpt: summary ? summary.substring(0, 160) + '...' : "News update pending.",
          content: summary || "",
          category: category || "News",
          author: "Hub Analytics",
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          imageUrl: `https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=800&sig=${idx}`,
          sources: []
        };
      });
  } catch (error) {
    console.error("Gemini Failure:", error);
    return [];
  }
};