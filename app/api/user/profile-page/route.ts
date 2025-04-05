import { CONSTANT_MESSGAES } from "@/components/constants/messages";
import { APP_CONFIGURATION } from "@/components/constants/urls";
import { AUTHORISED_JWT_TOKEN } from "@/lib/jwt";
import prismaClient from "@/lib/prisma";
import { parse } from "cookie";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const cookies = parse(request.headers.get("cookie") || "");
    const token = cookies[APP_CONFIGURATION.COOKIE_TOKEN];

    if (!token) {
      return null;
    }
    const activeUser = AUTHORISED_JWT_TOKEN(token) as any;
    const data = await prismaClient.user.findUnique({
      where: { id: activeUser.id },
    });
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error, message: CONSTANT_MESSGAES.COMMON.SERVER_ERROR_500 },
      { status: 500 }
    );
  }
}
