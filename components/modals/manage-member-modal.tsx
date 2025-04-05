"use client";
import React, { useState } from "react";
import querySting from "query-string";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Check,
  Crown,
  Gavel,
  Loader2,
  MoreVertical,
  ShieldCheck,
  UserRound,
  UserRoundCog,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuTrigger,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { ServerWithMembersWithProfiles } from "@/types";
import { UserAvatar } from "../common/user-avatar";
import { MemberRole } from "@prisma/client";
import { SERVER_SIDE_URLS } from "../constants/urls";

const ManageMemberModal = () => {
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const router = useRouter();

  const [loadingId, setLoadingId] = useState("");

  const isModalOpen = isOpen && type === "MANAGE_MEMBERS";
  const { server } = data as { server: ServerWithMembersWithProfiles };

  const RoleIconConfig = {
    MEMBER: null,
    COLEADER: <ShieldCheck className="h-5 w-5 ml-2 text-fuchsia-700" />,
    LEADER: (
      <Crown className="h-5 w-5 ml-2 text-orange-400 dark:text-yellow-600" />
    ),
  };

  const handleRoleChange = async (userId: string, role: MemberRole) => {
    try {
      setLoadingId(userId);
      const url = querySting.stringifyUrl({
        url: `${SERVER_SIDE_URLS.MEMBERS.INDEX}/${userId}`,
        query: {
          serverId: server?.id,
          userId,
        },
      });

      const response = await axios.patch(url, { role });
      router.refresh();
      onOpen("MANAGE_MEMBERS", { server: response?.data });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingId("");
    }
  };

  const handleKickUser = async (userId: string) => {
    try {
      setLoadingId(userId);
      const url = querySting.stringifyUrl({
        url: `${SERVER_SIDE_URLS.MEMBERS.INDEX}/${userId}`,
        query: {
          serverId: server?.id,
        },
      });

      const response = await axios.delete(url);
      router.refresh();
      onOpen("MANAGE_MEMBERS", { server: response?.data });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingId("");
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-md border-2 dark:border-neutral-700 border-neutral-400 selection:bg-fuchsia-100 selection:text-fuchsia-600 dark:selection:bg-fuchsia-600 dark:selection:text-fuchsia-100">
        <DialogHeader className="pt-3 px-6">
          <DialogTitle className="text-xl text-center capitalize font-bold">
            Manage Members
          </DialogTitle>
          <DialogDescription className="text-center font-semibold text-zinc-600 dark:text-zinc-400">
            {server?.members?.length} Members
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-2 max-h-[460px] pr-5">
          {server?.members?.map((member) => (
            <div
              key={member?.id}
              className="flex items-center gap-x-2 p-1 mb-6"
            >
              <UserAvatar imageUrl={member?.user?.image_url} />
              <div className="flex flex-col">
                <div className="text-sm flex items-center font-semibold gap-x-1">
                  {member?.user?.fullname} {RoleIconConfig[member?.role]}
                </div>
                <p className="text-xs text-zinc-500">{member?.user?.email}</p>
              </div>
              {server?.user_id !== member?.user_id &&
                loadingId !== member?.id && (
                  <div className="ml-auto">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreVertical className="size-4 md:size-5 text-zinc-500" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        side="left"
                        className="dark:bg-[#09090a]"
                      >
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger className="flex items-center">
                            <UserRoundCog className="w-4 h-4 mr-2" />{" "}
                            <span>Change Role</span>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent className="dark:bg-[#09090a]">
                              <DropdownMenuItem
                                onClick={() =>
                                  handleRoleChange(member?.id, "COLEADER")
                                }
                              >
                                <ShieldCheck className="w-4 h-4 mr-2" />
                                <span>Co-Leader</span>
                                {member?.role === "COLEADER" && (
                                  <Check className="w-4 h-4 ml-auto" />
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleRoleChange(member?.id, "MEMBER")
                                }
                              >
                                <UserRound className="w-4 h-4 mr-2" />
                                <span>Member</span>
                                {member?.role === "MEMBER" && (
                                  <Check className="w-4 h-4 ml-auto" />
                                )}
                              </DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-500"
                          onClick={() => handleKickUser(member?.id)}
                        >
                          <Gavel className="h-4 w-4 mr-2" />
                          Kick
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              {loadingId === member.id && (
                <Loader2 className="size-6 ml-auto text-zinc-500 animate-spin" />
              )}
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ManageMemberModal;
