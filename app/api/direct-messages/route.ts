import { CONSTANT_MESSGAES } from "@/components/constants/messages";
import { ValidAuthorisation } from "@/lib/authorisation";
import prismaClient from "@/lib/prisma";
import { directmessage } from "@prisma/client";
import { NextResponse } from "next/server";

const MESSAGE_LIMIT = 10;

export async function GET(request: Request) {
  return await ValidAuthorisation(async (user) => {
    try {
      if (!user) {
        return NextResponse.json(CONSTANT_MESSGAES.AUTHORISATION.UNAUTHORISED, {
          status: 401,
        });
      }

      const { searchParams } = new URL(request.url);
      const cursor = searchParams.get("cursor");
      const conversationId = searchParams.get("conversationId");

      if (!conversationId) {
        return NextResponse.json("Conversation Id is missing", {
          status: 401,
        });
      }

      let messages: directmessage[] = [];

      if (cursor) {
        messages = await prismaClient.directmessage.findMany({
          take: MESSAGE_LIMIT,
          skip: 1,
          cursor: {
            id: cursor,
          },
          where: {
            conversation_id: conversationId,
          },
          include: {
            member: {
              include: {
                user: true,
              },
            },
            pollVotes : true,
          },
          orderBy: {
            created_at: "desc",
          },
        });
      } else {
        messages = await prismaClient.directmessage.findMany({
          take: MESSAGE_LIMIT,
          where: {
            conversation_id: conversationId,
          },
          include: {
            member: {
              include: {
                user: true,
              },
            },
            pollVotes : true,
          },
          orderBy: {
            created_at: "desc",
          },
        });
      }

      let nextCursor: string | null = null;

      if (messages.length == MESSAGE_LIMIT) {
        nextCursor = messages[MESSAGE_LIMIT - 1].id;
      }

      return NextResponse.json({
        items: messages,
        nextCursor: nextCursor,
      });
    } catch (error) {
      console.log("[DIRECT_MESSAGES_GET] :", error);
      return NextResponse.json(
        { error, message: CONSTANT_MESSGAES.COMMON.MESSAGES_FAILED_FETCHED },
        { status: 500 }
      );
    }
  });
}
