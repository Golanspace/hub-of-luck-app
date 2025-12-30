import { GoogleGenAI, Type, FunctionDeclaration } from "@google/genai";
import { NewsArticle } from "../types.ts";

export interface IntelligenceResponse {
  text: string;
  webLinks: { uri: string; title: string }[];
  functionCalls?: any[];
}

// Strictly retrieve the API Key
const getApiKey = () => {
    try {
        const key = (window.process?.env?.API_KEY || '').trim();
        return key;
    } catch (e) {
        return '';
    }
};

const cloudwaysTools: FunctionDeclaration[] = [
  {
    name: "purge_cache",
    description: "Clears the Varnish or Memcached cache for the Cloudways application.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        cache_type: { type: Type.STRING, description: "Type of cache to purge (varnish, memcached)" },
        app_name: { type: Type.STRING, description: "Name of the app, e.g., 'hubofluck'" }
      },
      required: ["cache_type"]
    }
  }
];

export const consultIntelligence = async (query: string): Promise<IntelligenceResponse> => {
  const apiKey = getApiKey();
  if (!apiKey) {
    return { text: "The AI Hub is currently offline. Please add a valid API_KEY to your deployment environment variables.", webLinks: [] };
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are the Hub of Luck System Architect. Analyze: ${query}`,
      config: {
        tools: [{ googleSearch: {} }, { functionDeclarations: cloudwaysTools }],
      },
    });

    const text = response.text || "Analysis complete.";
    const webLinks = (response.candidates?.[0]?.groundingMetadata?.groundingChunks || [])
      .filter((chunk: any) => chunk && chunk.web)
      .map((chunk: any) => ({
        uri: chunk.web.uri,
        title: chunk.web.title || chunk.web.uri
      }));

    return { text, webLinks, functionCalls: response.functionCalls };
  } catch (error) {
    console.error("Consultation System Error:", error);
    return { text: "Intelligence hub encountered a processing error. Please check API quota or logs.", webLinks: [] };
  }
};

export const fetchLatestGamingNews = async (niche: string = "Gaming"): Promise<NewsArticle[]> => {
  const apiKey = getApiKey();
  if (!apiKey) return [];
  
  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Search for trending ${niche} news. Return 5 summaries formatted: Headline | Tagline | Content`,
      config: { tools: [{ googleSearch: {} }] },
    });
    
    const text = response.text || "";
    return text.split('\n')
      .filter(line => line.includes('|'))
      .map((line, idx) => {
        const parts = line.split('|').map(s => s.trim());
        return {
          id: `ai-${idx}-${Date.now()}`,
          title: parts[0] || "News Flash",
          excerpt: parts[1] || "Latest update from the field.",
          content: parts[2] || parts[1] || "",
          category: niche,
          author: "Hub Intelligence",
          date: new Date().toLocaleDateString(),
          imageUrl: `https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=800&sig=${idx}`
        };
      });
  } catch (error) { 
    console.warn("News sync error", error);
    return []; 
  }
};