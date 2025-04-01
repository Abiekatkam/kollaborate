import { CONSTANT_MESSGAES } from "@/components/constants/messages";
import { ValidAuthorisation } from "@/lib/authorisation";
import prismaClient from "@/lib/prisma";
import { MemberRole } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  const { serverName, imageUrl } = await request.json();  
  return await ValidAuthorisation(async (user: any) => {
    try {
      if (!user) {
        return NextResponse.json(CONSTANT_MESSGAES.AUTHORISATION.UNAUTHORISED, {
          status: 401,
        });
      }

      const server = await prismaClient.server.create({
        data: {
          user_id: user.id,
          server_name: serverName,
          image_url: imageUrl,
          invite_code: uuidv4(),
          channel: {
            create: [{ channel_name: "general", user_id: user.id }],
          },
          members: {
            create: [{ user_id: user.id, role: MemberRole.LEADER }],
          },
        },
      });
      return NextResponse.json(server, { status: 201 });
    } catch (error) {
      console.log("❌ [SERVER_POST] creating an server: ", error);
      return NextResponse.json(
        { error, message: CONSTANT_MESSGAES.COMMON.SERVER_CREATION_ERROR },
        { status: 500 }
      );
    }
  });
}
