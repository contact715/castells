import { GoogleGenAI, Type, Schema } from "@google/genai";
import { GeneratedConcept } from "../types";

// Lazy initialization to prevent crash when API key is missing
let ai: GoogleGenAI | null = null;

const getAI = (): GoogleGenAI => {
  if (!ai) {
    const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("Gemini API key is not configured");
    }
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
};

const conceptSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: "A short, punchy title for the campaign concept" },
    tagline: { type: Type.STRING, description: "A catchy, futuristic slogan" },
    description: { type: Type.STRING, description: "A 2-sentence explanation of the core idea" },
    visualCues: { type: Type.STRING, description: "Description of the visual aesthetic (colors, mood, lighting)" },
  },
  required: ["title", "tagline", "description", "visualCues"],
};

export const generateCreativeConcept = async (brandInput: string): Promise<GeneratedConcept> => {
  try {
    const aiClient = getAI();
    const model = "gemini-2.5-flash";
    
    const response = await aiClient.models.generateContent({
      model,
      contents: `You are a visionary creative director at a futurist marketing agency called 'Zero Gravity'. 
      The user will provide a brand or product idea. 
      Your goal is to generate an avant-garde, high-concept marketing angle that sounds innovative and 'anti-gravity'.
      
      User Input: ${brandInput}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: conceptSchema,
        temperature: 0.8, 
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");
    
    return JSON.parse(text) as GeneratedConcept;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error("Gemini API Error:", error);
    }
    throw error;
  }
};
