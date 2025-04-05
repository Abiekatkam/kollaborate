import { CONSTANT_MESSGAES } from "@/components/constants/messages";
import { ValidAuthorisation } from "@/lib/authorisation";
import prismaClient from "@/lib/prisma";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  return await ValidAuthorisation(async (user) => {
    try {
      if (!user) {
        return NextResponse.json(CONSTANT_MESSGAES.AUTHORISATION.UNAUTHORISED, {
          status: 401,
        });
      }

      const { channelName, channelType } = await request.json();
      const { searchParams } = new URL(request.url);
      const serverId = searchParams.get("serverId");

      if (!serverId) {
        return NextResponse.json(CONSTANT_MESSGAES.COMMON.SERVER_ID_MISSING, {
          status: 400,
        });
      }

      if (channelName.toLowerCase() === "general") {
        return NextResponse.json("Channel name cannot be 'general'.", {
          status: 400,
        });
      }

      const server = await prismaClient.server.update({
        where: {
          id: serverId,
          members: {
            some: {
              user_id: user.id,
              role: {
                in: [MemberRole.LEADER, MemberRole.COLEADER],
              },
            },
          },
        },
        data: {
          channel: {
            create: {
              user_id: user.id,
              channel_name: channelName,
              type: channelType.toUpperCase(),
            },
          },
        },
      });

      return NextResponse.json(server);
    } catch (error) {
      console.log("[CHANNELS_POST]: ", error);
      return NextResponse.json(
        { error, message: CONSTANT_MESSGAES.COMMON.SERVER_ERROR_500 },
        { status: 500 }
      );
    }
  });
}
