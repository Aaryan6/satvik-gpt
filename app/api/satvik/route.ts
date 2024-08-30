import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { messages } = await req.json();
  const lastUserMsg = messages[messages.length - 1].content;

  const response = await streamText({
    model: openai("ft:gpt-4o-mini-2024-07-18:personal::9ootOJfn"),
    system:
      "You are expert in content writer, your work is to generate the linkedin post on given topic.",
    prompt: lastUserMsg,
  });

  // Convert the response into a friendly text-stream
  return response.toDataStreamResponse();
}
