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
      const {serverId} = await params;
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

      const { serverName, imageUrl } = await request.json();

      const server = await prismaClient.server.update({
        where: {
          id: serverId,
          user_id: user.id,
        },
        data: {
          server_name: serverName,
          image_url: imageUrl,
        },
      });

      return NextResponse.json(server);
    } catch (error: any) {
      console.log("[SERVER_ID_PATCH]: ", error);
      return NextResponse.json(
        { error, message: CONSTANT_MESSGAES.COMMON.SERVER_UPDATE_FAILED },
        { status: 400 }
      );
    }
  });
}

export async function DELETE(
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

      const server = await prismaClient.server.delete({
        where: {
          id: serverId,
          user_id: user.id,
        },
      });

      return NextResponse.json(server);
    } catch (error) {
      console.log("[SERVER_ID_DELETE]: ", error);
      return NextResponse.json(
        { error, message: CONSTANT_MESSGAES.COMMON.SERVER_UPDATE_FAILED },
        { status: 500 }
      );
    }
  });
}
