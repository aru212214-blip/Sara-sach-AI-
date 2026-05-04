import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY || "" });

export async function chatWithGemini(message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) {
  if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not set. Please add it in the Secrets panel.");
  }

  const model = "gemini-3-flash-preview";
  
  const response = await ai.models.generateContent({
    model,
    contents: [
      ...history,
      { role: "user", parts: [{ text: message }] }
    ],
    config: {
      systemInstruction: "You are a professional yet friendly AI Agent named 'Pro AI Agent'. Respond in a mix of Hindi and Hinglish as requested by the user, or stay professional in English if they prefer. You should be helpful, empathetic, and technologically advanced. If the user mentions camera or mic, acknowledge that you have those capabilities integrated.",
    }
  });

  return response.text || "Sorry, I couldn't process that.";
}
