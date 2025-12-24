import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message, context } = await req.json();
    const genAI = new GoogleGenerativeAI("AIzaSyBLkZt6NrBn58Zc0-xO0cz-Ga_9TgK7Lng");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are a professional AI assistant for Wagmi Terminal, a Solana tool developed by Bader Alkorgli. 
    Context: ${context}
    User asked: ${message}
    Answer in English only.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    return NextResponse.json({ text: response.text() });
  } catch (error) {
    return NextResponse.json({ error: "API connection failed" }, { status: 500 });
  }
}