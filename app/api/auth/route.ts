import { CONSTANT_MESSGAES } from "@/components/constants/messages";
import { APP_CONFIGURATION } from "@/components/constants/urls";
import { AUTHORISED_JWT_TOKEN, GENERATE_JWT_TOKEN } from "@/lib/jwt";
import prismaClient from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { JwtPayload } from "jsonwebtoken";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);

  const token: string | null = searchParams.get("token");
  const type: string | null = searchParams.get("type");

  if (!token) {
    return NextResponse.json(
      { message: CONSTANT_MESSGAES.AUTHORISATION.UNAUTHORISED },
      { status: 400 }
    );
  }

  try {
    const decoded: JwtPayload | string | null = AUTHORISED_JWT_TOKEN(token);

    if (!decoded || typeof decoded === "string") {
      return NextResponse.json(
        { message: CONSTANT_MESSGAES.COMMON.SERVER_INVALID_TOKEN },
        { status: 400 }
      );
    }

    const { email, fullname } = decoded as JwtPayload;

    let existingUser = await prismaClient.user.findUnique({
      where: { email },
    });

    if (existingUser && type !== "login") {
      return NextResponse.json(
        { message: CONSTANT_MESSGAES.COMMON.CLIENT_USER_ACCOUNT_EXISTS },
        { status: 400 }
      );
    }

    if (!existingUser && type === "register") {
      const initials = fullname
        .split(" ")
        .map((word: string) => word[0])
        .join("")
        .toUpperCase();
      const imageUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
        initials
      )}&background=random`;
      existingUser = await prismaClient.user.create({
        data: { email, fullname, image_url: imageUrl },
      });
    }

    const newToken: string = GENERATE_JWT_TOKEN(
      existingUser as Object,
      60 * 60 * 24 * 7
    );

    const response: NextResponse = NextResponse.redirect(
      `${APP_CONFIGURATION.BASE_URL}/v1/`
    );

    response.cookies.set(APP_CONFIGURATION.COOKIE_TOKEN, newToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
    });

    return response;
  } catch (error) {
    console.error("❌ Error in verifying token:", error);
    return NextResponse.json(
      { message: CONSTANT_MESSGAES.COMMON.CLIENT_ERROR },
      { status: 400 }
    );
  }
}
