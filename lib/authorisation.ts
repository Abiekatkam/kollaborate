import {
  APP_CONFIGURATION,
  SERVER_SIDE_URLS,
} from "@/components/constants/urls";
import { cookies } from "next/headers";
import { AUTHORISED_JWT_TOKEN } from "./jwt";
import prismaClient from "./prisma";
import { NextResponse } from "next/server";
import { CONSTANT_MESSGAES } from "@/components/constants/messages";

export async function GetCurrentUserProfile() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.get(APP_CONFIGURATION.COOKIE_TOKEN)?.value;

  if (!cookieHeader) return null;

  const res = await fetch(
    `${APP_CONFIGURATION.BASE_URL}/${SERVER_SIDE_URLS.USER.FETCH}`,
    {
      headers: { cookie: `${APP_CONFIGURATION.COOKIE_TOKEN}=${cookieHeader}` },
      credentials: "include",
      cache: "no-store",
    }
  );

  if (!res.ok) return null;

  return res.json();
}

export const ValidAuthorisation = async (
  callback: (user: any) => any
): Promise<any> => {
  const cookieStore = await cookies();
  const token = cookieStore.get(APP_CONFIGURATION.COOKIE_TOKEN)?.value;

  if (!token) return NextResponse.json({ data: null }, { status: 401 });

  const activeUser = AUTHORISED_JWT_TOKEN(token);
  if (!activeUser || typeof activeUser !== "object") {
    return NextResponse.json(
      { message: CONSTANT_MESSGAES.AUTHORISATION.UNAUTHORISED },
      { status: 401 }
    );
  }

  const user = await prismaClient.user.findUnique({
    where: { id: activeUser.id },
  });
  if (!user) {
    return NextResponse.json(
      { message: CONSTANT_MESSGAES.AUTHORISATION.UNAUTHORISED },
      { status: 401 }
    );
  }

  return callback(user);
};

  export async function GetProfilePage(cookies: any) {
    const res = await fetch(`${APP_CONFIGURATION.BASE_URL}/${SERVER_SIDE_URLS.USER.PAGE_PROFILE}`, {
      headers: {
        cookie: Object.entries(cookies).map(([name, value]) => `${name}=${value}`).join('; ')
      },
    });
    if (!res.ok) {
      return null;
    }
    return await res.json();
  }
