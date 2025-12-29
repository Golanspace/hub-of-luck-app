
import { GoogleGenAI } from "@google/genai";
import { NewsArticle } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const fetchLatestGamingNews = async (query: string): Promise<NewsArticle[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide 5 latest news updates for the topic: "${query}" in the gambling and gaming industry. 
      Format each item as a structured story with a title, category, and an excerpt of roughly 50 words.`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "";
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    // Simplistic parsing of AI response into NewsArticle objects
    // In a production app, you'd use responseSchema, but Search Grounding works best with free-text/markdown processing
    const articles: NewsArticle[] = text.split('\n\n').filter(p => p.length > 20).slice(0, 5).map((block, idx) => {
      const lines = block.split('\n');
      return {
        id: `gemini-news-${idx}`,
        title: lines[0].replace(/^[#*-\d.\s]+/, '').trim(),
        excerpt: block.substring(block.indexOf('\n') + 1).trim(),
        content: block,
        category: "Latest News",
        author: "Gemini Intelligence",
        date: new Date().toLocaleDateString(),
        imageUrl: `https://picsum.photos/seed/${idx + 100}/800/600`,
        sources: groundingChunks
          .filter(chunk => chunk.web)
          .map(chunk => ({
            uri: chunk.web?.uri || '',
            title: chunk.web?.title || 'Source'
          }))
      };
    });

    return articles;
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};
