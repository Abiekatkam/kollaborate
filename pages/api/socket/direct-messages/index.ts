import { GetProfilePage } from "@/lib/authorisation";
import prismaClient from "@/lib/prisma";
import { NextApiResponseSocketIo } from "@/types";
import { parse } from "cookie";
import { NextApiRequest } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponseSocketIo
) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "This is not a POST method" });
  }

  try {
    const cookies = parse(request.headers.cookie || "");
    const user = await GetProfilePage(cookies);

    const { content, fileUrl, fileType } = request.body;

    const { conversationId } = request.query;

    if (!user) {
      return response.status(401).json({ error: "Unauthorized" });
    }
    if (!conversationId) {
      return response.status(400).json({ error: "Conversation ID is missing" });
    }
    if (!content) {
      return response.status(400).json({ error: "Content missing" });
    }

    const conversation = await prismaClient.conversation.findFirst({
      where: {
        id: conversationId as string,
      },
      include: {
        memberOne: {
          include: {
            user: true,
          },
        },
        memberTwo: {
          include: {
            user: true,
          },
        },
      },
    });

    const isMember =
      conversation?.memberOne.user_id === user?.id ||
      conversation?.memberTwo.user_id === user?.id;

    if (!conversation || !isMember) {
      return response.status(400).json({
        error:
          "Conversation not found or You are not a part od this conversation.",
      });
    }

    const member =
      conversation.memberOne.user_id === user.id
        ? conversation.memberOne
        : conversation.memberTwo;

    if (!member) {
      return response.status(400).json({ error: "Member not found." });
    }

    const message = await prismaClient.directmessage.create({
      data: {
        content,
        fileUrl,
        fileType,
        conversation_id: conversationId as string,
        member_id: member.id,
      },
      include: {
        member: { include: { user: true } },
      },
    });

    const channelKey = `chat:${conversationId}:messages`;
    response?.socket?.server?.io?.emit(channelKey, message);

    return response.status(200).json(message);
  } catch (error) {
    console.error("[DIRECT_MESSAGES_POST]:", error);
    return response.status(500).json({ error: "Internal server error" });
  }
}
