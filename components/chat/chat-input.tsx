"use client";
import { SendHorizonal } from "lucide-react";
import React, { useState } from "react";
import queryString from "query-string";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { Textarea } from "@/components/ui/textarea";
import ActionTooltip from "../common/action-tooltip";
import { BiPoll } from "react-icons/bi";
import { CgSoftwareUpload } from "react-icons/cg";
import EmojiToolbar from "../common/emoji-toolbar";

interface ChatInputProps {
  apiUrl: string;
  query: Record<string, any>;
  name: string;
  type: "channel" | "conversation";
}

const ChatInput = ({ apiUrl, query, name, type }: ChatInputProps) => {
  const [state, setState] = useState({
    loading: false,
    content: "",
    fileUrl: "",
    fileType: "",
  });
  const router = useRouter();

  const { onOpen } = useModal();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const url = queryString.stringifyUrl({
        url: apiUrl,
        query,
      });
      await axios.post(url, state);
      setState({
        loading: false,
        content: "",
        fileUrl: "",
        fileType: "",
      });
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full px-4 py-2 mb-2"
    >
      <div className="bg-neutral-200 dark:bg-neutral-800/70 rounded-lg p-2">
        <div>
          <Textarea
            disabled={state.loading}
            className="border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-neutral-600 dark:text-neutral-200 bg-neutral-200 dark:bg-neutral-800/70 shadow-none max-h-[180px] min-h-[50px] h-fit text-lg"
            placeholder={`Send your message to ${type === "channel" ? "#" + name + " channel." : name}`}
            value={state.content}
            onChange={(e) => setState({ ...state, content: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                const fakeEvent = {
                  preventDefault: () => {},
                } as React.FormEvent<HTMLFormElement>;
                handleSubmit(fakeEvent);
              }
            }}
          />
        </div>
        <div className="flex items-center mt-2 px-2 gap-x-2">
          <button
            type="button"
            onClick={() => onOpen("MESSAGE_FILE", { apiUrl, query })}
            className="border border-neutral-700 dark:border-neutral-400 dark:text-neutral-400 text-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-300 dark:hover:text-neutral-700 transition rounded-full p-1 flex items-center justify-center cursor-pointer"
          >
            <ActionTooltip label="Upload Attachment">
              <CgSoftwareUpload className="size-6" />
            </ActionTooltip>
          </button>
          <button
            type="button"
            className="border border-neutral-700 dark:border-neutral-400 dark:text-neutral-400 text-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-300 dark:hover:text-neutral-700 transition rounded-full p-1 flex items-center justify-center cursor-pointer"
          >
            <ActionTooltip label="Create a Poll">
              <BiPoll className="size-6" />
            </ActionTooltip>
          </button>
          <div className="border border-neutral-700 dark:border-neutral-400 dark:text-neutral-400 text-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-300 dark:hover:text-neutral-700 transition rounded-full p-1 flex items-center justify-center cursor-pointer">
            <ActionTooltip label="Add Emoji">
              <EmojiToolbar
                onChange={(emoji) =>
                  setState((prevState) => ({
                    ...prevState,
                    content: prevState.content + emoji,
                  }))
                }
              />
            </ActionTooltip>
          </div>

          <button
            type="submit"
            disabled={state.loading || state.content.length === 0}
            className="ml-auto border border-neutral-700 dark:border-neutral-400 dark:text-neutral-400 text-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-300 dark:hover:text-neutral-700 transition rounded-full flex items-center justify-center cursor-pointer p-2"
          >
            <SendHorizonal className="size-5" />
          </button>
        </div>
      </div>
    </form>
  );
};

export default ChatInput;
