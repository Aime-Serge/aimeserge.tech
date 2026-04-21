import { openai } from "@ai-sdk/openai";
import { experimental_transcribe as transcribe } from "ai";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const audioBlob = formData.get("audio");

    if (!(audioBlob instanceof Blob)) {
      return new Response("Audio blob is required", { status: 400 });
    }

    const audioBuffer = await audioBlob.arrayBuffer();

    const { text } = await transcribe({
      model: openai.transcription("whisper-1"),
      audio: new Uint8Array(audioBuffer),
    });

    return new Response(JSON.stringify({ text }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("STT Error:", error);
    return new Response("Failed to transcribe audio", { status: 500 });
  }
}
