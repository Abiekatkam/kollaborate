import { Hash } from "lucide-react";
import React from "react";

interface ChatIntroProps {
  type: "channel" | "conversation";
  name: string;
}

const ChatIntro = ({ type, name }: ChatIntroProps) => {
  return (
    <div className="space-y-2 px-4 mb-4">
      {type === "channel" && (
        <div className="size-[100px] rounded-full bg-neutral-300 dark:bg-neutral-700 flex items-center justify-center">
          <Hash className="size-16 dark:text-neutral-100 text-neutral-700" />
        </div>
      )}
      <p className="text-xl md:text-4xl font-bold text-neutral-600 dark:text-neutral-300">
        {type == "channel" ? "Welcome to #" : ""} {name}
      </p>
      <p className="text-neutral-600 dark:text-neutral-500 text-sm">
        {type == "channel"
          ? `This is the initial conversation of the #${name} channel`
          : `This is the private conversation with ${name}.`}
      </p>
    </div>
  );
};

export default ChatIntro;
