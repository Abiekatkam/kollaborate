"use client";
import { useModal } from "@/hooks/use-modal-store";
import { cn } from "@/lib/utils";
import { channel, ChannelType, MemberRole, server } from "@prisma/client";
import { Edit, Hash, Lock, Mic, Trash, Video } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { CLIENT_SIDE_URL } from "../constants/urls";
import ActionTooltip from "../common/action-tooltip";

interface ServerChannelProps {
  channel: channel;
  server: server;
  role?: MemberRole;
}

const ServerChannel = ({ role, server, channel }: ServerChannelProps) => {
  const channelIconConfig = {
    [ChannelType.TEXT]: Hash,
    [ChannelType.AUDIO]: Mic,
    [ChannelType.VIDEO]: Video,
  };

  const { onOpen } = useModal();

  const router = useRouter();
  const param = useParams();

  const Icon = channelIconConfig[channel.type];

  const handleRedirectChannel = () => {
    router.push(
      `${CLIENT_SIDE_URL.HOME.SERVERS}/${param?.serverId}/channels/${channel?.id}`
    );
  };

  const handleModalAction = (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>,
    modalType: "DELETE_CHANNEL" | "EDIT_CHANNEL"
  ) => {
    e.stopPropagation();
    onOpen(modalType, { channel, server });
  };

  return (
    <div
      onClick={handleRedirectChannel}
      className={cn(
        "group px-2 py-2 cursor-pointer rounded-md flex items-center gap-x-2 w-full hover:bg-neutral-700/20 dark:hover:bg-neutral-700/50 transition mb-1",
        param?.channelId === channel?.id &&
          "bg-neutral-700/10 dark:bg-neutral-700"
      )}
    >
      <Icon className="flex-shrink-0 w-5 h-5 text-neutral-500 dark:text-neutral-400" />
      <p
        className={cn(
          "line-clamp-1 font-semibold text-sm text-neutral-500 group-hover:text-neutral-600 dark:text-neutral-400 dark:group-hover:text-neutral-300 transition",
          param?.channelId === channel?.id &&
            "text-primary dark:text-neutral-200 dark:group-hover:text-white"
        )}
      >
        {channel.channel_name}
      </p>
      {channel.channel_name.toLowerCase() !== "general" &&
        role !== MemberRole.MEMBER && (
          <div className="flex items-center ml-auto gap-x-2">
            <ActionTooltip label="Edit">
              <Edit
                onClick={(e:any) => handleModalAction(e, "EDIT_CHANNEL")}
                className="hidden group-hover:block w-4 h-4 text-neutral-500 hover:text-neutral-600 dark:text-neutral-400 dark:hover:text-neutral-300 transition"
              />
            </ActionTooltip>
            <ActionTooltip label="Delete">
              <Trash
                onClick={(e: any) => handleModalAction(e, "DELETE_CHANNEL")}
                className="hidden group-hover:block w-4 h-4 text-neutral-500 hover:text-neutral-600 dark:text-neutral-400 dark:hover:text-neutral-300 transition"
              />
            </ActionTooltip>
          </div>
        )}

      {channel.channel_name.toLowerCase() === "general" && (
        <Lock className="ml-auto w-4 h-4 dark:text-neutral-400 text-neutral-500" />
      )}
    </div>
  );
};

export default ServerChannel;
