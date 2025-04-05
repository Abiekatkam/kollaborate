"use client";
import { useModal } from "@/hooks/use-modal-store";
import { ServerWithMembersWithProfiles } from "@/types";
import { MemberRole } from "@prisma/client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  ChevronDown,
  LogOut,
  PlusCircle,
  Settings,
  Trash,
  UserPlus,
  Users,
} from "lucide-react";

interface ServerHeaderProps {
  server: ServerWithMembersWithProfiles;
  role?: MemberRole;
}

const ServerHeader = ({ server, role }: ServerHeaderProps) => {
  const { onOpen } = useModal();
  const isLeader = role === MemberRole.LEADER;
  const isCoLeader = isLeader || role === MemberRole.COLEADER;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none" asChild>
        <button
          type="button"
          className="w-full text-md font-semibold px-3 flex items-center h-14 dark:border-neutral-700 border-b border-neutral-300 text-black dark:text-white hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition capitalize"
          suppressHydrationWarning={true}
        >
          {server.server_name}
          <ChevronDown className="w-5 h-5 ml-auto" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72 dark:bg-[#09090a] text-lg font-medium text-black dark:text-neutral-400 space-y-[2px]">
        {isCoLeader && (
          <DropdownMenuItem
            className="text-fuchsia-800 dark:text-fuchsia-400 px-3 py-2 cursor-pointer"
            onClick={() => onOpen("INVITE_PEOPLE", { server })}
          >
            Invite People <UserPlus className="w-4 h-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isLeader && (
          <DropdownMenuItem
            className=" px-3 py-2 cursor-pointer"
            onClick={() => onOpen("EDIT_SERVER", { server })}
          >
            Server Settings <Settings className="w-4 h-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isLeader && (
          <DropdownMenuItem
            className=" px-3 py-2 cursor-pointer"
            onClick={() => onOpen("MANAGE_MEMBERS", { server })}
          >
            Manage Members <Users className="w-4 h-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isCoLeader && (
          <DropdownMenuItem
            className=" px-3 py-2 cursor-pointer"
            onClick={() => onOpen("CREATE_CHANNEL")}
          >
            Create Channels <PlusCircle className="w-4 h-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isCoLeader && <DropdownMenuSeparator />}
        {isLeader && (
          <DropdownMenuItem
            className="text-rose-500 px-3 py-2 cursor-pointer"
            onClick={() => onOpen("DELETE_SERVER", { server })}
          >
            Delete Server <Trash className="w-4 h-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {!isLeader && (
          <DropdownMenuItem
            className="text-rose-500 px-3 py-2 cursor-pointer"
            onClick={() => onOpen("LEAVE_SERVER", { server })}
          >
            Leave Server <LogOut className="w-4 h-4 ml-auto" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ServerHeader;
