
import { GoogleGenAI, Type, FunctionDeclaration } from "@google/genai";
import { NewsArticle } from "../types.ts";

export interface IntelligenceResponse {
  text: string;
  webLinks: { uri: string; title: string }[];
  functionCalls?: any[];
}

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
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    return { text: "The AI Hub is currently offline. Please ensure the API_KEY environment variable is set.", webLinks: [] };
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are the Hub of Luck Senior Intelligence Analyst. Provide a detailed, professional breakdown of: ${query}. Focus on legal status, recent movements, and expert consensus.`,
      config: {
        tools: [{ googleSearch: {} }, { functionDeclarations: cloudwaysTools }],
      },
    });

    const text = response.text || "No analysis available.";
    const webLinks = (response.candidates?.[0]?.groundingMetadata?.groundingChunks || [])
      .filter((chunk: any) => chunk && chunk.web)
      .map((chunk: any) => ({
        uri: chunk.web.uri,
        title: chunk.web.title || chunk.web.uri
      }));

    return { text, webLinks, functionCalls: response.functionCalls };
  } catch (error) {
    console.error("Consultation System Error:", error);
    return { text: "Intelligence hub encountered a processing error. Please check connectivity.", webLinks: [] };
  }
};

export const fetchLatestGamingNews = async (niche: string = "Gaming"): Promise<NewsArticle[]> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) return [];
  
  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Find the absolute latest, breaking news for the US ${niche} industry. Return 5 summaries. FORMAT EACH ON ONE LINE: Headline | Tagline | Content`,
      config: { 
        tools: [{ googleSearch: {} }] 
      },
    });
    
    const text = response.text || "";
    const webLinks = (response.candidates?.[0]?.groundingMetadata?.groundingChunks || [])
      .filter((chunk: any) => chunk && chunk.web)
      .map((chunk: any) => ({
        uri: chunk.web.uri,
        title: chunk.web.title || chunk.web.uri
      }));

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
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          imageUrl: `https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=800&sig=${idx}`,
          sources: webLinks.slice(idx, idx + 2) // Distribute links
        };
      });
  } catch (error) { 
    console.warn("News sync error", error);
    return []; 
  }
};
