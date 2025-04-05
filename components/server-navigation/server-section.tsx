"use client";
import { ChannelType, MemberRole } from "@prisma/client";
import React from "react";
import { Plus, Settings } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";
import ActionTooltip from "../common/action-tooltip";
import { ServerWithMembersWithProfiles } from "@/types";

interface ServerSectionProps {
  label: string;
  role?: MemberRole;
  sectionType: "channels" | "members";
  channelType?: ChannelType;
  server?: ServerWithMembersWithProfiles;
}

const ServerSection = ({
  label,
  role,
  sectionType,
  channelType,
  server,
}: ServerSectionProps) => {
  const { onOpen } = useModal();
  return (
    <div className="flex items-center py-2 justify-between">
      <p className="text-xs uppercase font-semibold text-neutral-500 dark:text-neutral-400">
        {label}
      </p>
      {role !== MemberRole.MEMBER && sectionType === "channels" && (
        <ActionTooltip label="Create Channel" side="top">
          <div
            className="text-neutral-500 hover:text-neutral-600 dark:text-neutral-400 dark:hover:text-neutral-300 transition"
            onClick={() => onOpen("CREATE_CHANNEL")}
          >
            <Plus className="w-4 h-4" />
          </div>
        </ActionTooltip>
      )}
      {role === MemberRole.LEADER && sectionType === "members" && (
        <ActionTooltip label="Manage Members" side="top">
          <div
            className="text-neutral-500 hover:text-neutral-600 dark:text-neutral-400 dark:hover:text-neutral-300 transition"
            onClick={() => onOpen("MANAGE_MEMBERS", { server })}
          >
            <Settings className="w-4 h-4" />
          </div>
        </ActionTooltip>
      )}
    </div>
  );
};

export default ServerSection;
