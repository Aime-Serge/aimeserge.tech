import { openai } from "@ai-sdk/openai";
import { generateSpeech } from "ai";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { text, voice = "alloy" } = await req.json();

    if (!text) {
      return new Response("Text is required", { status: 400 });
    }

    const speech = await generateSpeech({
      model: openai.speech("tts-1"),
      voice,
      value: text,
    });

    return new Response(speech, {
      headers: {
        "Content-Type": "audio/mpeg",
      },
    });
  } catch (error) {
    console.error("TTS Error:", error);
    return new Response("Failed to generate speech", { status: 500 });
  }
}
