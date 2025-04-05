import { CONSTANT_MESSGAES } from "@/components/constants/messages";
import { ValidAuthorisation } from "@/lib/authorisation";
import prismaClient from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: { memberId: string } }
) {
  return await ValidAuthorisation(async (user) => {
    try {
      const { memberId } = await params;
      if (!user) {
        return NextResponse.json(CONSTANT_MESSGAES.AUTHORISATION.UNAUTHORISED, {
          status: 401,
        });
      }

      const { searchParams } = new URL(request.url);
      const { role } = await request.json();
      const serverId = searchParams.get("serverId");

      if (!serverId) {
        return NextResponse.json(CONSTANT_MESSGAES.COMMON.SERVER_ID_MISSING, {
          status: 400,
        });
      }

      if (!memberId) {
        return NextResponse.json(CONSTANT_MESSGAES.COMMON.MEMBER_ID_MISSING, {
          status: 400,
        });
      }

      const server = await prismaClient.server.update({
        where: {
          id: serverId,
          user_id: user?.id,
        },
        data: {
          members: {
            update: {
              where: {
                id: memberId,
                user_id: {
                  not: user?.id,
                },
              },
              data: {
                role: role,
              },
            },
          },
        },
        include: {
          members: {
            include: {
              user: true,
            },
            orderBy: {
              role: "asc",
            },
          },
        },
      });

      return NextResponse.json(server);
    } catch (error) {
      console.log("[MEMBER_ID_PATCH]: ", error);
      return NextResponse.json(
        { error, message: CONSTANT_MESSGAES.COMMON.SERVER_ERROR_500 },
        { status: 500 }
      );
    }
  });
}

export async function DELETE(
  request: Request,
  { params }: { params: { memberId: string } }
) {
  return await ValidAuthorisation(async (user) => {
    try {
      const { memberId } = await params;
      if (!user) {
        return NextResponse.json(CONSTANT_MESSGAES.AUTHORISATION.UNAUTHORISED, {
          status: 401,
        });
      }

      const { searchParams } = new URL(request.url);
      const serverId = searchParams.get("serverId");

      if (!serverId) {
        return NextResponse.json(CONSTANT_MESSGAES.COMMON.SERVER_ID_MISSING, {
          status: 400,
        });
      }

      if (!memberId) {
        return NextResponse.json(CONSTANT_MESSGAES.COMMON.MEMBER_ID_MISSING, {
          status: 400,
        });
      }

      const server = await prismaClient.server.update({
        where: {
          id: serverId,
          user_id: user?.id,
        },
        data: {
          members: {
            deleteMany: {
              id: memberId,
              user_id: {
                not: user?.id,
              },
            },
          },
        },
        include: {
          members: {
            include: {
              user: true,
            },
            orderBy: {
              role: "asc",
            },
          },
        },
      });

      return NextResponse.json(server);
    } catch (error) {
      console.log("[MEMBER_ID_DELETE]: ", error);
      return NextResponse.json(
        { error, message: CONSTANT_MESSGAES.COMMON.SERVER_ERROR_500 },
        { status: 500 }
      );
    }
  });
}
