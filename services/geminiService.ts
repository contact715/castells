import { GoogleGenAI, Type, Schema } from "@google/genai";
import { GeneratedConcept } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

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
    const model = "gemini-2.5-flash";
    
    const response = await ai.models.generateContent({
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
    console.error("Gemini API Error:", error);
    throw error;
  }
};