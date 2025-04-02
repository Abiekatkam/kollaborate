import React from "react";
import { redirect } from "next/navigation";

import prismaClient from "@/lib/prisma";
import { ChannelType, MemberRole } from "@prisma/client";

import { Crown, Hash, Mic, ShieldCheck, Video } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GetCurrentUserProfile } from "@/lib/authorisation";
import { CLIENT_SIDE_URL } from "../constants/urls";
import ServerHeader from "./server-header";

interface ServerSidebarProps {
  serverId: string;
}

const ServerSidebar = async ({ serverId }: ServerSidebarProps) => {
  const user = await GetCurrentUserProfile();
  if (!user) {
    return redirect(CLIENT_SIDE_URL.AUTH.LOGIN);
  }

  const server = await prismaClient.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channel: {
        orderBy: {
          created_at: "asc",
        },
      },
      members: {
        include: {
          user: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });

  if (!server) {
    return redirect(CLIENT_SIDE_URL.HOME.INDEX);
  }

  const textChannels = server?.channel.filter(
    (channel) => channel.type === ChannelType.TEXT
  );
  const videoChannels = server?.channel.filter(
    (channel) => channel.type === ChannelType.VIDEO
  );
  const audioChannels = server?.channel.filter(
    (channel) => channel.type === ChannelType.AUDIO
  );
  const members = server?.members.filter((member) => member.user_id != user.id);

  const role = server?.members.find(
    (member) => member.user_id === user.id
  )?.role;

  const channelIconConfig = {
    [ChannelType.TEXT]: <Hash className="w-4 h-4 mr-2" />,
    [ChannelType.AUDIO]: <Mic className="w-4 h-4 mr-2" />,
    [ChannelType.VIDEO]: <Video className="w-4 h-4 mr-2" />,
  };



//   const roleIconConfig = {
//     [MemberRole.GUEST]: null,
//     [MemberRole.MODERATOR]: (
//       <ShieldCheck className="h-5 w-5 ml-2 text-indigo-700" />
//     ),
//     [MemberRole.ADMIN]: (
//       <Crown className="h-5 w-5 ml-2 text-orange-400 dark:text-yellow-600" />
//     ),
//   };


  

  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-neutral-800/70 bg-neutral-200/40">
      <ServerHeader server={server} role={role} />
      <ScrollArea className="flex-1 px-3">
        <div className="mt-2">
          {/* <ServerSearch
            data={[
              {
                label: "Text Channels",
                type: "channel",
                data: textChannels?.map((channel) => ({
                  id: channel?.id,
                  name: channel?.channel_name,
                  icon: channelIconConfig[channel.type],
                })),
              },
              {
                label: "Voice Channels",
                type: "channel",
                data: audioChannels?.map((channel) => ({
                  id: channel?.id,
                  name: channel?.channel_name,
                  icon: channelIconConfig[channel.type],
                })),
              },
              {
                label: "Video Channels",
                type: "channel",
                data: videoChannels?.map((channel) => ({
                  id: channel?.id,
                  name: channel?.channel_name,
                  icon: channelIconConfig[channel.type],
                })),
              },
              {
                label: "Members",
                type: "member",
                data: members?.map((member) => ({
                  id: member?.id,
                  name: member?.user?.fullname,
                  icon: roleIconConfig[member?.role],
                })),
              },
            ]}
          /> */}
        </div>
        {/* {!!textChannels?.length && (
          <div className="my-2">
            <ServerSection
              label="Text Channels"
              sectionType="channels"
              channelType={ChannelType.TEXT}
              role={role}
            />
            <div className="space-y-[2px]">
              {textChannels?.map((channel) => (
                <ServerChannel
                  key={channel.id}
                  role={role}
                  channel={channel}
                  server={server}
                />
              ))}
            </div>
          </div>
        )}

        {!!audioChannels?.length && (
          <div className="my-2">
            <ServerSection
              label="Voice Channels"
              sectionType="channels"
              channelType={ChannelType.AUDIO}
              role={role}
            />
            <div className="space-y-[2px]">
              {audioChannels?.map((channel) => (
                <ServerChannel
                  key={channel.id}
                  role={role}
                  channel={channel}
                  server={server}
                />
              ))}
            </div>
          </div>
        )}

        {!!videoChannels?.length && (
          <div className="my-2">
            <ServerSection
              label="Video Channels"
              sectionType="channels"
              channelType={ChannelType.VIDEO}
              role={role}
            />
            <div className="space-y-[2px]">
              {videoChannels?.map((channel) => (
                <ServerChannel
                  key={channel.id}
                  role={role}
                  channel={channel}
                  server={server}
                />
              ))}
            </div>
          </div>
        )}

        {!!members?.length && (
          <div className="my-2">
            <ServerSection
              label="Members"
              sectionType="members"
              role={role}
              server={server}
            />
            <div className="space-y-[2px]">
              {members?.map((member) => (
                <ServerMember key={member.id} member={member} server={server} />
              ))}
            </div>
          </div>
        )} */}
      </ScrollArea>
    </div>
  );
};

export default ServerSidebar;
