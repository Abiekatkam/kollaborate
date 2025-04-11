import ChatHeader from "@/components/chat/chat-header";
import ChatInput from "@/components/chat/chat-input";
import ChatMessages from "@/components/chat/chat-messages";
import RoomContainer from "@/components/common/media-room";
import { CLIENT_SIDE_URL } from "@/components/constants/urls";
import { GetCurrentUserProfile } from "@/lib/authorisation";
import prismaClient from "@/lib/prisma";
import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";

interface ChannelIdPageProps {
  params: {
    serverId: string;
    channelId: string;
  };
}

const ChannelIdPage = async ({ params }: ChannelIdPageProps) => {
  const user = await GetCurrentUserProfile();
  const { serverId, channelId } = await params;
  if (!user) {
    return redirect(CLIENT_SIDE_URL.AUTH.LOGIN);
  }

  const channel = await prismaClient.channel.findUnique({
    where: {
      id: channelId,
    },
  });

  const member = await prismaClient.member.findFirst({
    where: {
      server_id: serverId,
      user_id: user?.id,
    },
  });

  if (!channel || !member) {
    return redirect(CLIENT_SIDE_URL.HOME.INDEX);
  }

  return (
    <div className="flex flex-col h-screen">
      <ChatHeader
        name={channel.channel_name}
        serverId={channel.server_id}
        type="channel"
        userId={null}
      />
      {channel.type === ChannelType.TEXT && (
        <>
          <ChatMessages
            member={member}
            currentUser={user}
            name={channel.channel_name}
            type="channel"
            apiUrl="/api/messages"
            socketUrl="/api/socket/messages"
            socketQuery={{
              channelId: channel.id,
              serverId: channel.server_id,
            }}
            paramKey="channelId"
            chatId={channel.id}
            paramValue={channel.id}
          />
          <ChatInput
            apiUrl="/api/socket/messages"
            name={channel.channel_name}
            type="channel"
            query={{ channelId: channel.id, serverId: channel.server_id }}
          />
        </>
      )}

      
        {channel.type === ChannelType.AUDIO && (
          <>
            <RoomContainer
              chatId={channel.id}
              video={false}
              audio={true}
              user={user}
            />
          </>
        )}

        {channel.type === ChannelType.VIDEO && (
          <>
            <RoomContainer
              chatId={channel.id}
              video={true}
              audio={true}
              user={user}
            />
          </>
        )}
    </div>
  );
};

export default ChannelIdPage;
