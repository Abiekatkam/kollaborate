import { CONSTANT_MESSGAES } from "@/components/constants/messages";
import { ValidAuthorisation } from "@/lib/authorisation";
import prismaClient from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: { serverId: string } }
) {
  return await ValidAuthorisation(async (user) => {
    try {
      const { serverId } = await params;
      if (!user) {
        return NextResponse.json(CONSTANT_MESSGAES.AUTHORISATION.UNAUTHORISED, {
          status: 401,
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
          user_id: {
            not: user?.id,
          },
          members: {
            some: {
              user_id: user?.id,
            },
          },
        },
        data: {
          members: {
            deleteMany: {
              user_id: user?.id,
            },
          },
        },
      });

      return NextResponse.json(server);
    } catch (error) {
      console.log("[SERVER_LEAVE_PATCH]: ", error);
      return NextResponse.json(
        { error, message: CONSTANT_MESSGAES.COMMON.SERVER_ERROR_500 },
        { status: 500 }
      );
    }
  });
}
