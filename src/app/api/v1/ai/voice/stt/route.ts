import { openai } from "@ai-sdk/openai";
import { transcribeSpeech } from "ai";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const audioBlob = formData.get("audio") as Blob;

    if (!audioBlob) {
      return new Response("Audio blob is required", { status: 400 });
    }

    const { text } = await transcribeSpeech({
      model: openai.speech("whisper-1"),
      audio: audioBlob,
    });

    return new Response(JSON.stringify({ text }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("STT Error:", error);
    return new Response("Failed to transcribe audio", { status: 500 });
  }
}
