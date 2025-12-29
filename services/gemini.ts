import { GoogleGenAI } from "@google/genai";
import { NewsArticle } from "../types.ts";

export const fetchLatestGamingNews = async (niche: string = "Gaming"): Promise<NewsArticle[]> => {
  try {
    if (!process.env.API_KEY) {
      console.warn("Hub Intelligence: Offline Mode.");
      return [];
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // SEO-Rich niche mapping to ensure the model focuses on high-intent keywords
    const nicheContext = {
      "Casinos": "online casino bonuses, real money slots, live dealer reviews",
      "Sports": "sportsbook promo codes, NFL odds, legal sports betting states",
      "Lottery": "Mega Millions jackpot, Powerball winning numbers, state lottery results",
      "Sweepstakes": "social casino coins, sweeps prizes, free play bonuses",
      "Gaming": "US gambling regulations, industry news, market growth 2024"
    }[niche] || niche;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are an SEO specialist for HubOfLuck.com. Provide 5 trending updates for: ${nicheContext}. 
      Use journalistic tone. Format: Headline | Tagline | FullContent. 
      Ensure headlines include high-volume keywords.`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "";
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const aiSources = groundingChunks
      .filter((chunk: any) => chunk && chunk.web)
      .map((chunk: any) => ({
        uri: chunk.web.uri,
        title: chunk.web.title || chunk.web.uri
      }));
    
    return text.split('\n')
      .filter(line => line.includes('|'))
      .map((line, idx) => {
        const [title, tagline, content] = line.split('|').map(s => s.trim());
        return {
          id: `ai-${idx}-${Date.now()}`,
          title: title || "Industry Insight",
          excerpt: tagline || "Analyzing latest market shifts...",
          content: content || tagline || "",
          category: niche,
          author: "Hub Analysis",
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