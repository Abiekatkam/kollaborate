"use client";
import React, { ReactHTMLElement, useEffect, useState } from "react";
import {
  Crown,
  Edit,
  FileIcon,
  SendHorizonal,
  ShieldCheck,
  Trash,
} from "lucide-react";
import { member, MemberRole, user } from "@prisma/client";
import Image from "next/image";
import { cn } from "@/lib/utils";
import queryString from "query-string";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { CLIENT_SIDE_URL } from "../constants/urls";
import { UserAvatar } from "../common/user-avatar";
import ActionTooltip from "../common/action-tooltip";
import CircleLoader from "../common/circle-loader";

interface ChatItemProps {
  id: string;
  content: string;
  member: member & {
    user: user;
  };
  timestamp: string;
  fileUrl?: string | null;
  fileType?: string | null;
  deleted?: boolean;
  currentMember: member;
  isUpdated?: boolean;
  socketUrl: string;
  socketQuery?: Record<string, string>;
}

const ChatItem = ({
  id,
  content,
  member,
  timestamp,
  fileUrl,
  fileType,
  deleted,
  currentMember,
  isUpdated,
  socketUrl,
  socketQuery,
}: ChatItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [state, setState] = useState({
    content: content,
    loading: false,
  });

  const router = useRouter();
  const params = useParams();

  const memberRedirect = () => {
    if (member.id === currentMember.id) {
      return;
    }

    router.push(
      `${CLIENT_SIDE_URL.HOME.SERVERS}/${params?.serverId}/conversations/${member.id}`
    );
  };

  const { onOpen } = useModal();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "Escape" && e.keyCode === 27) {
        setIsEditing(false);
      }
    };
    document.addEventListener("keydown", down);

    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    setState({ ...state, content: content });
  }, [content]);

  const roleIconConfig = {
    [MemberRole.MEMBER]: null,
    [MemberRole.COLEADER]: (
      <ShieldCheck className="h-4 w-4 ml-2 text-indigo-700" />
    ),
    [MemberRole.LEADER]: (
      <Crown className="h-4 w-4 ml-2 text-orange-400 dark:text-yellow-600" />
    ),
  };

  const isLeader = currentMember.role === MemberRole.LEADER;
  const isCoLeader = currentMember.role === MemberRole.COLEADER;
  const isOwner = currentMember.id === member.id;
  const canDeleteMessage = !deleted && (isLeader || isOwner || isCoLeader);
  const canEditMessage = !deleted && isOwner && !fileUrl;
  const isPdf = fileType === "application/pdf" && fileUrl;
  const isImage = !isPdf && fileUrl;

  const handleEditContent = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    setState({ ...state, loading: true });
    try {
      const url = queryString.stringifyUrl({
        url: `${socketUrl}/${id}`,
        query: socketQuery,
      });

      await axios.patch(url, state);
      setState({
        ...state,
        loading: false,
      });
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    } finally {
      setState({ ...state, loading: false });
    }
  };

  return (
    <div className="relative group flex items-center hover:bg-black/5 p-4 transition w-full">
      <div className="group flex gap-x-2 items-start w-full">
        <div
          onClick={memberRedirect}
          className="cursor-pointer hover:drop-shadow-md transition"
        >
          <UserAvatar
            imageUrl={member?.user?.image_url}
            className={"h-8 w-8 md:w-8 md:h-8"}
          />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-x-2">
            <div className="flex items-center">
              <p
                onClick={memberRedirect}
                className="font-semibold text-sm hover:underline cursor-pointer"
              >
                {member?.user?.fullname}
              </p>
              <ActionTooltip label={member.role}>
                {roleIconConfig[member.role]}
              </ActionTooltip>
            </div>
            <span className="text-xs text-neutral-500 dark:text-neutral-400">
              {timestamp}
            </span>
          </div>
          {isImage && (
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square rounded-md mt-2 overflow-hidden border flex items-center bg-secondary h-48 w-48"
            >
              <Image
                src={fileUrl}
                alt={content}
                fill
                className="object-cover"
              />
            </a>
          )}

          {isPdf && (
            <div className="relative flex items-center p-2 mt-2  rounded-md bg-background/10">
              <FileIcon className="h-10 w-10 fill-fuchsia-500 stroke-fuchsia-400" />
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-sm text-fuchsia-600 dark:text-fuchsia-400 hover:underline"
              >
                PDF Attachment
              </a>
            </div>
          )}

          {!fileUrl && !isEditing && (
            <p
              className={cn(
                "text-sm text-neutral-600 dark:text-neutral-300",
                deleted &&
                  "italic text-neutral-500 dark:text-neutral-400 text-xs mt-1"
              )}
            >
              {content}
              {isUpdated && !deleted && (
                <span className="text-[10px] mx-2 text-neutral-500 dark:text-neutral-400">
                  (edited)
                </span>
              )}
            </p>
          )}

          {!fileUrl && isEditing && (
            <>
              {" "}
              <form
                onSubmit={handleEditContent}
                className="flex items-center w-full gap-x-2 pt-2"
              >
                <div className="flex-1">
                  <div className="relative w-full">
                    <Input
                      name="content"
                      value={state.content}
                      disabled={state.loading}
                      onChange={(e) =>
                        setState({ ...state, content: e.target.value })
                      }
                      className="p-2 bg-neutral-200/90 dark:bg-neutral-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-neutral-600 dark:text-neutral-200"
                      placeholder="Edited message..."
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  disabled={state.loading}
                  className="dark:bg-neutral-950 w-[90px] text-white px-5 transition p-1 flex items-center justify-center"
                >
                  {state.loading ? <CircleLoader text="editing" /> : "edit"}
                </Button>
              </form>
              <span className="text-[10px] mt-1 text-neutral-400">
                Press esc to cancel, enter to save
              </span>
            </>
          )}
        </div>
      </div>
      {canDeleteMessage && (
        <div className="hidden group-hover:flex items-center gap-x-2 absolute p-1 -top-2 right-5 bg-white dark:bg-neutral-800 border rounded-sm">
          {canEditMessage && (
            <ActionTooltip label="Edit">
              <Edit
                onClick={() => setIsEditing(true)}
                className="cursor-pointer ml-auto w-4 h-4 text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 transition"
              />
            </ActionTooltip>
          )}
          <ActionTooltip label="Delete">
            <Trash
                onClick={() =>
                  onOpen("DELETE_MESSAGE", {
                    apiUrl: `${socketUrl}/${id}`,
                    query: socketQuery,
                  })
                }
              className="cursor-pointer ml-auto w-4 h-4 text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 transition"
            />
          </ActionTooltip>
        </div>
      )}
    </div>
  );
};

export default ChatItem;
