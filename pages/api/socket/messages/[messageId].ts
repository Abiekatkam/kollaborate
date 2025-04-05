import { GetProfilePage } from "@/lib/authorisation";
import prismaClient from "@/lib/prisma";
import { NextApiResponseSocketIo } from "@/types";
import { MemberRole } from "@prisma/client";
import { parse } from "cookie";
import { NextApiRequest } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponseSocketIo
) {
  if (request.method !== "PATCH" && request.method !== "DELETE") {
    return response
      .status(405)
      .json({ error: "This is not a Patch and Delete method" });
  }

  try {
    const cookies = parse(request.headers.cookie || "");
    const user = await GetProfilePage(cookies);
    const { content } = request.body;
    const { serverId, channelId, messageId } = request.query;

    if (!user) {
      return response.status(401).json({ error: "Unauthorised" });
    }
    if (!serverId) {
      return response.status(400).json({ error: "Server ID is missing" });
    }
    if (!channelId) {
      return response.status(400).json({ error: "Channel ID is missing" });
    }
    if (!messageId) {
      return response.status(400).json({ error: "Message ID is missing" });
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

    const member = server?.members.find((member) => member.user_id === user.id);

    if (!member) {
      return response.status(400).json({ error: "Member not found." });
    }

    let message = await prismaClient.message.findFirst({
      where: {
        id: messageId as string,
        channel_id: channelId as string,
      },
      include: {
        member: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!message || message.is_deleted) {
      return response.status(400).json({ error: "Message not found." });
    }

    const isMessageOwner = message.member_id === member.id;
    const isLeader = member.role === MemberRole.LEADER;
    const isCoLeader = member.role === MemberRole.COLEADER;
    const canModify = isMessageOwner || isLeader || isCoLeader;

    if (!canModify) {
      return response.status(401).json({ error: "Unauthorised" });
    }

    if (request.method === "DELETE") {
      message = await prismaClient.message.update({
        where: {
          id: messageId as string,
        },
        data: {
          fileUrl: null,
          content: "This message has been deleted.",
          is_deleted: true,
        },
        include: {
          member: {
            include: {
              user: true,
            },
          },
        },
      });
    }

    if (request.method === "PATCH") {
      if (!isMessageOwner) {
        return response.status(401).json({ error: "Unauthorised" });
      }
      message = await prismaClient.message.update({
        where: {
          id: messageId as string,
        },
        data: {
          content,
        },
        include: {
          member: {
            include: {
              user: true,
            },
          },
        },
      });
    }

    const updateKey = `chat:${channelId}:messages:update`;
    response?.socket?.server?.io?.emit(updateKey, message);
    return response.status(200).json(message);
  } catch (error) {
    console.log("[MESSAGES_ID_POST]:", error);
    return response.status(500).json({ error: "Internal server error" });
  }
}
