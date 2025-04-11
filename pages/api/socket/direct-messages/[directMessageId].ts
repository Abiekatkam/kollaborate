import { GetProfilePage } from "@/lib/authorisation";
import prismaClient from "@/lib/prisma";
import { NextApiResponseSocketIo } from "@/types";
import { MemberRole } from "@prisma/client";
import { parse } from "cookie";
import { NextApiRequest } from "next";

export default async function handler(request: NextApiRequest, response: NextApiResponseSocketIo) {
  if (request.method !== "PATCH" && request.method !== "DELETE") {
    return response.status(405).json({ error: "This is not a PATCH or DELETE method" });
  }

  try {
    const cookies = parse(request.headers.cookie || "");
    const user = await GetProfilePage(cookies);
    const { content, selectedOption } = request.body;
    const { directMessageId, conversationId } = request.query;

    if (!user) {
      return response.status(401).json({ error: "Unauthorised" });
    }

    if (!conversationId) {
      return response.status(400).json({ error: "Conversation ID is missing" });
    }

    const conversation = await prismaClient.conversation.findFirst({
      where: {
        id: conversationId as string,
      },
      include: {
        memberOne: { include: { user: true } },
        memberTwo: { include: { user: true } },
      },
    });

    const isMember =
      conversation?.memberOne.user_id === user.id ||
      conversation?.memberTwo.user_id === user.id;

    if (!conversation || !isMember) {
      return response.status(400).json({
        error: "Conversation not found or You are not a part of this conversation.",
      });
    }

    const member =
      conversation.memberOne.user_id === user.id
        ? conversation.memberOne
        : conversation.memberTwo;

    if (!member) {
      return response.status(400).json({ error: "Member not found." });
    }

    let message = await prismaClient.directmessage.findFirst({
      where: {
        id: directMessageId as string,
        conversation_id: conversationId as string,
      },
      include: {
        member: { include: { user: true } },
        pollVotes : { include: { user: true } }, 
      },
    });

    if (!message || message.is_deleted) {
      return response.status(400).json({ error: "Message not found." });
    }

    const isMessageOwner = message.member_id === member.id;
    const isLeader = member.role === MemberRole.LEADER;
    const isCoLeader = member.role === MemberRole.COLEADER;
    const canModify = isMessageOwner || isLeader || isCoLeader || message.isPollMessage;

    if (!canModify) {
      return response.status(401).json({ error: "Unauthorised" });
    }

    if (request.method === "DELETE") {
      message = await prismaClient.directmessage.update({
        where: {
          id: directMessageId as string,
        },
        data: {
          fileUrl: null,
          content: "This message has been deleted.",
          is_deleted: true,
        },
        include: {
          member: { include: { user: true } },
          pollVotes : { include: { user: true } },
        },
      });
    }

    if (request.method === "PATCH") {
      if (!isMessageOwner && !message.isPollMessage) {
        return response.status(401).json({ error: "Unauthorised" });
      }

      if (message.isPollMessage && selectedOption) {
        await prismaClient.directPollVote.upsert({
          where: {
            directMessage_id_userId: {
              directMessage_id: directMessageId as string,
              userId: user.id,
            },
          },
          update: {
            option: selectedOption,
          },
          create: {
            directMessage_id: directMessageId as string,
            userId: user.id,
            option: selectedOption,
          },
        });
        

        // 👇 Refetch message with updated votes
        message = await prismaClient.directmessage.findFirst({
          where: {
            id: directMessageId as string,
            conversation_id: conversationId as string,
          },
          include: {
            member: { include: { user: true } },
            pollVotes : { include: { user: true } },
          },
        });
      } else {
        // Regular content update
        message = await prismaClient.directmessage.update({
          where: {
            id: directMessageId as string,
          },
          data: {
            content,
          },
          include: {
            member: { include: { user: true } },
            pollVotes : { include: { user: true } },
          },
        });
      }
    }

    const updateKey = `chat:${conversation.id}:messages:update`;
    response?.socket?.server?.io?.emit(updateKey, message);
    return response.status(200).json(message);
  } catch (error) {
    console.error("[MESSAGES_ID_PATCH_OR_DELETE]:", error);
    return response.status(500).json({ error: "Internal server error" });
  }
}
