import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { messages } = await req.json();
  const lastUserMsg = messages[messages.length - 1].content;
  console.log({ messages });

  const response = await streamText({
    model: openai("gpt-4o-mini"),
    system:
      "You are expert in content writer, your work is to generate the linkedin post on given topic.",
    prompt: lastUserMsg,
  });

  // Convert the response into a friendly text-stream
  return response.toDataStreamResponse();
}
