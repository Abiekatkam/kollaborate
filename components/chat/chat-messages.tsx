"use client";
import React, { ElementRef, RefObject, useRef } from "react";
// import { useChatQuery } from "@/store/use-chat-query";
import { Loader2, ServerCrash } from "lucide-react";
import { Fragment } from "react";
// import ChatItem from "./ChatItem";
import { format } from "date-fns";
import { member } from "@prisma/client";
import { useChatQuery } from "@/hooks/use-chat-query";
import ChatIntro from "./chat-intro";
import CircleLoader from "../common/circle-loader";
import { MessageWithMemberWithProfile } from "@/types";
import ChatItem from "./chat-item";
import { useChatSocket } from "@/hooks/use-chat-socket";
import { useChatScroll } from "@/hooks/use-chat-scroll";
// import { useChatSocket } from "@/store/use-chat-socket";
// import { useChatScroll } from "@/store/use-chat-scroll";

interface ChatMessagesProps {
  name: string;
  member: member;
  chatId: string;
  apiUrl: string;
  socketUrl: string;
  socketQuery: Record<string, string>;
  paramKey: "channelId" | "conversationId";
  paramValue: string;
  type: "channel" | "conversation";
}

const ChatMessages = ({
  name,
  member,
  chatId,
  apiUrl,
  socketUrl,
  socketQuery,
  paramKey,
  paramValue,
  type,
}: ChatMessagesProps) => {
  const queryKey = `chat:${chatId}`;
  const addKey = `chat:${chatId}:messages`;
  const updateKey = `chat:${chatId}:messages:update`;

  const DATE_FORMAT = "dd MM yyyy, HH:mm";

  const chatRef = useRef<ElementRef<"div">>(null);
  const bottomChatRef = useRef<ElementRef<"div">>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useChatQuery({ queryKey, apiUrl, paramKey, paramValue });

  useChatSocket({ queryKey, addKey, updateKey });

  useChatScroll({
    chatRef: chatRef as RefObject<HTMLDivElement>,
    bottomChatRef: bottomChatRef as RefObject<HTMLDivElement>,
    loadMore: fetchNextPage,
    shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
    count: data?.pages?.[0]?.items?.length ?? 0,
  });

  if (status === "pending") {
    return (
      <div className="flex flex-col items-center justify-center flex-1">
        <CircleLoader />
        <p className="text-sm text-neutral-700 dark:text-neutral-400">
          Fetching messages...
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-col items-center justify-center flex-1">
        <ServerCrash className="size-10 text-neutral-500 my-2 animate-bounce" />
        <p className="text-sm text-neutral-700 dark:text-neutral-400">
          Something Went Wrong! Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={chatRef}
      className="flex-1 flex flex-col py-4 overflow-y-auto chatmessagescollarea"
    >
      {!hasNextPage && <div className="flex-1" />}

      {!hasNextPage && <ChatIntro type={type} name={name} />}

      {hasNextPage && (
        <div className="flex justify-center">
          {isFetchingNextPage ? (
            <Loader2 className="w-6 h-6 text-neutral-500 animate-spin my-4" />
          ) : (
            <button
              type="button"
              onClick={() => fetchNextPage()}
              className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-600 text-xs my-4 dark:hover:text-neutral-300 transition"
            >
              Load previous messages
            </button>
          )}
        </div>
      )}

      <div className="flex flex-col-reverse mt-auto">
        {data?.pages?.map((group, i) => (
          <Fragment key={i}>
            {group?.items?.map((message: MessageWithMemberWithProfile) => (
              <ChatItem
                key={message.id}
                id={message.id}
                currentMember={member}
                content={message.content}
                fileUrl={message.fileUrl}
                fileType={message.fileType}
                deleted={message.is_deleted}
                timestamp={format(new Date(message.created_at), DATE_FORMAT)}
                isUpdated={message.updated_at !== message.created_at}
                socketUrl={socketUrl}
                socketQuery={socketQuery}
                member={message.member}
              />
            ))}
          </Fragment>
        ))}
      </div>
      <div ref={bottomChatRef} />
    </div>
  );
};

export default ChatMessages;
