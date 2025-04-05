import { Hash } from "lucide-react";
import React from "react";
import { UserAvatar } from "../common/user-avatar";
import MenuToggle from "../common/menu-sheet-toggle";
import SocketIndicator from "../common/socket-indicator";
import ChatVideo from "./chat-video";

// TODO: POLL option 
// TODO: user online status

interface ChatHeaderProps {
  serverId: string;
  name?: string;
  type: "channel" | "conversation";
  imageUrl?: string;
  userId?: string | null;
}

const ChatHeader = ({
  serverId,
  name,
  type,
  imageUrl,
  userId,
}: ChatHeaderProps) => {
  return (
    <div className="text-md font-semibold px-3 flex items-center h-14 border-neutral-200 dark:border-neutral-900 border-b-2">
      <MenuToggle serverId={serverId} />
      {type == "channel" && (
        <span className="rounded-full p-2 mr-2 bg-neutral-200 dark:bg-neutral-900">
          <Hash className="size-5 text-neutral-500 dark:text-neutral-400" />
        </span>
      )}
      {type == "conversation" && (
        <UserAvatar imageUrl={imageUrl} className="md:size-8 mr-2" />
      )}

      <p className="font-semibold text-md text-black dark:text-white">{name}</p>
      {/* {userId && type == "conversation" && (
        <UserOnlineStatus userId={userId} type={"conversationMember"} />
      )} */}
      <div className="ml-auto flex items-center">
        {type === "conversation" && <ChatVideo />}
        <SocketIndicator />
      </div>
    </div>
  );
};

export default ChatHeader;
