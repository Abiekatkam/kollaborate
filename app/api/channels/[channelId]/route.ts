import { CONSTANT_MESSGAES } from "@/components/constants/messages";
import { ValidAuthorisation } from "@/lib/authorisation";
import prismaClient from "@/lib/prisma";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { channelId: string } }
) {
  return await ValidAuthorisation(async (user) => {
    try {
      const { channelId } = await params;

      const { searchParams } = new URL(request.url);
      const serverId = searchParams.get("serverId");

      if (!user) {
        return NextResponse.json(CONSTANT_MESSGAES.AUTHORISATION.UNAUTHORISED, {
          status: 401,
        });
      }

      if (!channelId) {
        return NextResponse.json(CONSTANT_MESSGAES.COMMON.CHANNEL_ID_MISSING, {
          status: 400,
        });
      }

      if (!serverId) {
        return NextResponse.json(CONSTANT_MESSGAES.COMMON.SERVER_ID_MISSING, {
          status: 400,
        });
      }
      const server = await prismaClient.server.update({
        where: {
          id: serverId,
          members: {
            some: {
              user_id: user?.id,
              role: {
                in: [MemberRole.LEADER, MemberRole.COLEADER],
              },
            },
          },
        },
        data: {
          channel: {
            delete: {
              id: channelId,
              channel_name: {
                not: "general",
              },
            },
          },
        },
      });

      return NextResponse.json(server);
    } catch (error) {
      console.log("[CHANNEL_ID_DELETE]: ", error);
      return NextResponse.json(
        { error, message: CONSTANT_MESSGAES.COMMON.SERVER_ERROR_500 },
        { status: 500 }
      );
    }
  });
}

export async function PATCH(
  request: Request,
  { params }: { params: { channelId: string } }
) {
  return await ValidAuthorisation(async (user) => {
    try {
      const { channelId } = await params;
      const { searchParams } = new URL(request.url);
      const serverId = searchParams.get("serverId");
      const { channelName, channelType } = await request.json();

      if (!user) {
        return NextResponse.json(CONSTANT_MESSGAES.AUTHORISATION.UNAUTHORISED, {
          status: 401,
        });
      }

      if (!channelId) {
        return NextResponse.json(CONSTANT_MESSGAES.COMMON.CHANNEL_ID_MISSING, {
          status: 400,
        });
      }

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
              user_id: user?.id,
              role: {
                in: [MemberRole.LEADER, MemberRole.COLEADER],
              },
            },
          },
        },
        data: {
          channel: {
            update: {
              where: {
                id: channelId,
                NOT: {
                  channel_name: "general",
                },
              },
              data: {
                channel_name: channelName,
                type: channelType.toUpperCase(),
              },
            },
          },
        },
      });

      return NextResponse.json(server);
    } catch (error) {
      console.log("[CHANNEL_ID_PATCH]: ", error);
      return NextResponse.json(
        { error, message: CONSTANT_MESSGAES.COMMON.SERVER_ERROR_500 },
        { status: 500 }
      );
    }
  });
}
