"use client";
import { member, MemberRole, server, user } from "@prisma/client";
import { Crown, ShieldCheck } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { cn } from "@/lib/utils";
import { UserAvatar } from "../common/user-avatar";
import { CLIENT_SIDE_URL } from "../constants/urls";
import ActionTooltip from "../common/action-tooltip";

// TODO: implement user online status
// TODO: implement user typing effect

interface ServerMemberProps {
  member: member & { user: user };
  server: server;
}

const ServerMember = ({ member, server }: ServerMemberProps) => {
  const roleIconConfig = {
    [MemberRole.MEMBER]: null,
    [MemberRole.COLEADER]: <ShieldCheck className="size-5 text-green-700" />,
    [MemberRole.LEADER]: (
      <Crown className="size-5 text-orange-400 dark:text-yellow-600" />
    ),
  };

  const param = useParams();
  const router = useRouter();

  const icon = roleIconConfig[member.role];

  const handleRedirectConversation = () => {
    router.push(
      `${CLIENT_SIDE_URL.HOME.SERVERS}/${server?.id}/conversations/${member?.id}`
    );
  };

  return (
    <div
      onClick={handleRedirectConversation}
      className={cn(
        "group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-neutral-700/10 dark:hover:bg-neutral-700/50 transition mb-1",
        param?.memberId === member?.id &&
          "bg-neutral-700/20 dark:bg-neutral-700"
      )}
    >
      <UserAvatar imageUrl={member?.user?.image_url} className="md:size-7" />
      <p
        className={cn(
          "font-semibold text-sm text-neutral-500 group-hover:text-neutral-600 dark:text-neutral-400 dark:group-hover:text-neutral-300 transition",
          param?.memberId === member?.id &&
            "text-primary dark:text-neutral-200 dark:group-hover:text-white"
        )}
      >
        {member?.user?.fullname}
      </p>
      <ActionTooltip label={member.role} align="center">
        {icon}
      </ActionTooltip>

      {/* <UserOnlineStatus userId={member?.user?.id} type="serverlist" /> */}
    </div>
  );
};

export default ServerMember;
