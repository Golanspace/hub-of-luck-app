
import { GoogleGenAI } from "@google/genai";
import { NewsArticle } from "../types.ts";

export const fetchLatestGamingNews = async (query: string): Promise<NewsArticle[]> => {
  try {
    // API_KEY must be obtained exclusively from the environment variable process.env.API_KEY.
    if (!process.env.API_KEY) {
      console.warn("Hub Intelligence: API_KEY missing. App running in Editorial-only mode.");
      return [];
    }

    // Must use new GoogleGenAI({ apiKey: process.env.API_KEY })
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Using gemini-3-flash-preview for basic news/text task as per guidelines
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide 5 news updates for: "${query}". Format: Headline | Category | Summary.`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    // response.text is a getter, not a method
    const text = response.text || "";
    
    // Extract website URLs from groundingChunks as required by guidelines
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const aiSources = groundingChunks
      .filter((chunk: any) => chunk && chunk.web)
      .map((chunk: any) => ({
        uri: chunk.web.uri,
        title: chunk.web.title || chunk.web.uri
      }));
    
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
          sources: aiSources
        };
      });
  } catch (error) {
    console.error("Gemini Failure:", error);
    return [];
  }
};
