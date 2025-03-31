import { CONSTANT_MESSGAES } from "@/components/constants/messages";
import { ValidAuthorisation } from "@/lib/authorisation";
import prismaClient from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  return await ValidAuthorisation(async (user) => {
    try {
      const data = await prismaClient.user.findUnique({ where: { id: user.id } });
      return NextResponse.json(data, { status: 200 });
    } catch (error: any) {
      console.error("❌ Error in fetching user profile:", error);
      return NextResponse.json(
        { error, message: CONSTANT_MESSGAES.COMMON.SERVER_ERROR_500 },
        { status: 500 }
      );
    }
  });
}
