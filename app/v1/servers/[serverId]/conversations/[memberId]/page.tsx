import ChatHeader from "@/components/chat/chat-header";
import ChatInput from "@/components/chat/chat-input";
import ChatMessages from "@/components/chat/chat-messages";
import RoomContainer from "@/components/common/media-room";
import { CLIENT_SIDE_URL } from "@/components/constants/urls";
import { GetCurrentUserProfile } from "@/lib/authorisation";
import { getOrCreateConversation } from "@/lib/conversation";
import prismaClient from "@/lib/prisma";
import { redirect } from "next/navigation";
import React from "react";

interface ConversationIdPageProps {
  params: {
    serverId: string;
    memberId: string;
  };
  searchParams: {
    video?: boolean;
  };
}

const ConversationIdPage = async ({
  params,
  searchParams,
}: ConversationIdPageProps) => {
  const user = await GetCurrentUserProfile();
  const { serverId, memberId } = await params;
  const { video } = await searchParams;
  if (!user) {
    return redirect(CLIENT_SIDE_URL.AUTH.LOGIN);
  }

  const currentMember = await prismaClient.member.findFirst({
    where: {
      server_id: serverId,
      user_id: user.id,
    },
    include: {
      user: true,
    },
  });

  if (!currentMember) {
    return redirect(CLIENT_SIDE_URL.HOME.INDEX);
  }

  const conversation = await getOrCreateConversation(
    currentMember.id,
    memberId
  );

  if (!conversation) {
    return redirect(`${CLIENT_SIDE_URL.HOME.SERVERS}/${serverId}`);
  }

  const { memberOne, memberTwo } = conversation;

  const otherMember = memberOne?.user_id === user?.id ? memberTwo : memberOne;

  return (
    <div className="flex flex-col h-screen">
      <ChatHeader
        imageUrl={otherMember?.user?.image_url || ""}
        name={otherMember?.user?.fullname || ""}
        serverId={serverId}
        type="conversation"
        userId={otherMember?.user?.id}
      />
      {!video && (
        <>
          <ChatMessages
            member={currentMember}
            currentUser={user}
            name={otherMember.user.fullname as string}
            chatId={conversation.id}
            type="conversation"
            apiUrl="/api/direct-messages"
            paramKey="conversationId"
            paramValue={conversation.id}
            socketUrl="/api/socket/direct-messages"
            socketQuery={{
              conversationId: conversation.id,
            }}
          />

          <ChatInput
            name={otherMember?.user?.fullname as string}
            type="conversation"
            apiUrl="/api/socket/direct-messages"
            query={{
              conversationId: conversation.id,
            }}
          />
        </>
      )}

      {video && (
        <>
          <RoomContainer
            chatId={conversation.id}
            video={true}
            audio={true}
            user={user}
          />
        </>
      )}
    </div>
  );
};

export default ConversationIdPage;
