"use client";

import { FormEvent } from "react";
import { useChat } from "ai/react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Forward } from "lucide-react";
import ChatWindow from "./chat-window";
import { ThemeToggle } from "./theme-toggle";

export default function Chat() {
  const {
    messages: BaseMessages,
    handleSubmit: handleSubmitBase,
    handleInputChange: handleBaseInputChange,
    setMessages: setBaseMessages,
  } = useChat({
    api: "/api/chat",
  });
  const {
    messages: CustomMessages,
    input,
    handleInputChange: handleCustomInputChange,
    handleSubmit: handleSubmitCustom,
    setMessages: setCustomMessages,
  } = useChat({
    api: "/api/satvik",
  });

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBaseMessages([]);
    setCustomMessages([]);
    handleSubmitBase(event);
    handleSubmitCustom(event);
  };

  return (
    <Card className="w-full h-screen flex flex-col gap-2">
      <CardHeader className="flex flex-row justify-between items-center space-y-0 py-4 bg-muted">
        <CardTitle className="text-xl font-bold text-center">
          Satvik GPT
        </CardTitle>
        <div className="flex items-center gap-4">
          <IconGithub className="h-5 w-5" />
          <ThemeToggle />
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col pb-0">
        <div className="grid md:grid-cols-2 gap-4">
          <ChatWindow
            messages={BaseMessages}
            title="OpenAI (GPT-4o-mini)"
            isBot={true}
          />
          <ChatWindow
            messages={CustomMessages}
            title="Satvik GPT (Fine-tuned Model)"
            isBot={false}
          />
        </div>
      </CardContent>
      <CardFooter className="w-full pb-4">
        <form
          onSubmit={handleFormSubmit}
          className="relative w-full max-w-4xl mx-auto bg-muted p-2 rounded-full"
        >
          <Input
            value={input}
            onChange={(e) => {
              handleBaseInputChange(e);
              handleCustomInputChange(e);
            }}
            placeholder="Enter a topic..."
            className="w-full resize-none h-full focus:outline-none focus:ring-2 focus:ring-muted dark:focus:ring-muted focus-visible:ring-0 focus-visible:ring-offset-0 py-4 px-4 rounded-full"
          />
          <Button
            className="absolute top-1/2 -translate-y-1/2 right-4 px-2 bg-foreground hover:text-background hover:bg-foreground/80 text-background focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100 rounded-full"
            size="sm"
            type="submit"
            variant="ghost"
          >
            <Forward className="h-5 w-5" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}

const IconGithub = ({ className }: { className: string }) => (
  <svg
    data-testid="geist-icon"
    height="16"
    stroke-linejoin="round"
    viewBox="0 0 16 16"
    width="16"
    className={className}
  >
    <g clip-path="url(#clip0_872_3147)">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8 0C3.58 0 0 3.57879 0 7.99729C0 11.5361 2.29 14.5251 5.47 15.5847C5.87 15.6547 6.02 15.4148 6.02 15.2049C6.02 15.0149 6.01 14.3851 6.01 13.7154C4 14.0852 3.48 13.2255 3.32 12.7757C3.23 12.5458 2.84 11.836 2.5 11.6461C2.22 11.4961 1.82 11.1262 2.49 11.1162C3.12 11.1062 3.57 11.696 3.72 11.936C4.44 13.1455 5.59 12.8057 6.05 12.5957C6.12 12.0759 6.33 11.726 6.56 11.5261C4.78 11.3262 2.92 10.6364 2.92 7.57743C2.92 6.70773 3.23 5.98797 3.74 5.42816C3.66 5.22823 3.38 4.40851 3.82 3.30888C3.82 3.30888 4.49 3.09895 6.02 4.1286C6.66 3.94866 7.34 3.85869 8.02 3.85869C8.7 3.85869 9.38 3.94866 10.02 4.1286C11.55 3.08895 12.22 3.30888 12.22 3.30888C12.66 4.40851 12.38 5.22823 12.3 5.42816C12.81 5.98797 13.12 6.69773 13.12 7.57743C13.12 10.6464 11.25 11.3262 9.47 11.5261C9.76 11.776 10.01 12.2558 10.01 13.0056C10.01 14.0752 10 14.9349 10 15.2049C10 15.4148 10.15 15.6647 10.55 15.5847C12.1381 15.0488 13.5182 14.0284 14.4958 12.6673C15.4735 11.3062 15.9996 9.67293 16 7.99729C16 3.57879 12.42 0 8 0Z"
        fill="currentColor"
      ></path>
    </g>
    <defs>
      <clipPath id="clip0_872_3147">
        <rect width="16" height="16" fill="white"></rect>
      </clipPath>
    </defs>
  </svg>
);
