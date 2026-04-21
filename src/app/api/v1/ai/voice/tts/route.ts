import { openai } from "@ai-sdk/openai";
import { experimental_generateSpeech as generateSpeech } from "ai";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { text, voice = "alloy" } = (await req.json()) as {
      text?: string;
      voice?: string;
    };

    if (!text) {
      return new Response("Text is required", { status: 400 });
    }

    const speech = await generateSpeech({
      model: openai.speech("tts-1"),
      voice,
      text,
    });

    const audioBytes = Uint8Array.from(speech.audio.uint8Array);
    const audioBlob = new Blob([audioBytes], {
      type: speech.audio.mediaType || "audio/mpeg",
    });

    return new Response(audioBlob, {
      headers: {
        "Content-Type": speech.audio.mediaType || "audio/mpeg",
      },
    });
  } catch (error) {
    console.error("TTS Error:", error);
    return new Response("Failed to generate speech", { status: 500 });
  }
}
