import { GetProfilePage } from "@/lib/authorisation";
import prismaClient from "@/lib/prisma";
import { NextApiResponseSocketIo } from "@/types";
import { NextApiRequest } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponseSocketIo
) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "This is not a POST method" });
  }

  try {
    const user = await GetProfilePage(request.cookies);
    const {
      content,
      fileUrl,
      fileType,
      isPollMessage,
      pollQuestion,
      pollOptions,
    } = request.body;
    const { serverId, channelId } = request.query;

    if (!user) {
      return response.status(401).json({ error: "Unauthorised" });
    }

    if (!serverId) {
      return response.status(400).json({ error: "Server ID is missing" });
    }

    if (!channelId) {
      return response.status(400).json({ error: "Channel ID is missing" });
    }

    if (!content && !isPollMessage) {
      return response.status(400).json({ error: "Content is missing" });
    }

    const server = await prismaClient.server.findFirst({
      where: {
        id: serverId as string,
        members: {
          some: {
            user_id: user.id,
          },
        },
      },
      include: {
        members: true,
      },
    });

    if (!server) {
      return response.status(400).json({ error: "Server not found." });
    }

    const channel = await prismaClient.channel.findFirst({
      where: {
        id: channelId as string,
        server_id: serverId as string,
      },
    });

    if (!channel) {
      return response.status(400).json({ error: "Channel not found." });
    }

    const member = server.members.find((m) => m.user_id === user.id);

    if (!member) {
      return response.status(400).json({ error: "Member not found." });
    }

    const message = await prismaClient.message.create({
      data: {
        content,
        fileUrl,
        fileType,
        isPollMessage: !!isPollMessage,
        pollQuestion: isPollMessage ? pollQuestion : undefined,
        pollOptions: isPollMessage ? pollOptions : undefined,
        channel_id: channelId as string,
        member_id: member.id,
      },
      include: {
        member: {
          include: {
            user: true,
          },
        },
      },
    });

    const channelKey = `chat:${channelId}:messages`;
    response?.socket?.server?.io?.emit(channelKey, message);
    return response.status(200).json(message);
  } catch (error) {
    console.log("[MESSAGES_POST]:", error);
    return response.status(500).json({ error: "Internal server error" });
  }
}
