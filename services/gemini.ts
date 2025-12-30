
import { GoogleGenAI, Type, FunctionDeclaration } from "@google/genai";
import { NewsArticle } from "../types.ts";

export interface IntelligenceResponse {
  text: string;
  webLinks: { uri: string; title: string }[];
  functionCalls?: any[];
}

// Cloudways tool definitions for Gemini
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
  },
  {
    name: "get_server_load",
    description: "Retrieves the current CPU and RAM usage for the Cloudways server.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        server_id: { type: Type.STRING, description: "The ID of the server to check" }
      }
    }
  }
];

export const consultIntelligence = async (query: string): Promise<IntelligenceResponse> => {
  try {
    if (!process.env.API_KEY) return { text: "Offline.", webLinks: [] };

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are the Hub of Luck System Architect. 
      You can manage Cloudways hosting and provide industry intelligence.
      If the user asks for server tasks, use the provided tools.
      User: ${query}`,
      config: {
        tools: [{ googleSearch: {} }, { functionDeclarations: cloudwaysTools }],
      },
    });

    const text = response.text || "Consultation complete.";
    const functionCalls = response.functionCalls;
    
    const webLinks = (response.candidates?.[0]?.groundingMetadata?.groundingChunks || [])
      .filter((chunk: any) => chunk && chunk.web)
      .map((chunk: any) => ({
        uri: chunk.web.uri,
        title: chunk.web.title || chunk.web.uri
      }));

    return { text, webLinks, functionCalls };
  } catch (error) {
    console.error("Consultation error:", error);
    return { text: "The intelligence hub is busy.", webLinks: [] };
  }
};

export const fetchLatestGamingNews = async (niche: string = "Gaming"): Promise<NewsArticle[]> => {
  try {
    if (!process.env.API_KEY) return [];
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide 5 trending updates for: ${niche}. Format: Headline | Tagline | FullContent.`,
      config: { tools: [{ googleSearch: {} }] },
    });
    const text = response.text || "";
    return text.split('\n')
      .filter(line => line.includes('|'))
      .map((line, idx) => {
        const [title, tagline, content] = line.split('|').map(s => s.trim());
        return {
          id: `ai-${idx}-${Date.now()}`,
          title: title || "Insight",
          excerpt: tagline || "Analysis...",
          content: content || tagline || "",
          category: niche,
          author: "Hub Analysis",
          date: new Date().toLocaleDateString(),
          imageUrl: `https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=800&sig=${idx}`
        };
      });
  } catch (error) { return []; }
};
