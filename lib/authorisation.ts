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
  const cookieHeader = cookieStore.toString();

  const res = await fetch(
    `${APP_CONFIGURATION.BASE_URL}/${SERVER_SIDE_URLS.USER.FETCH}`,
    {
      headers: { cookie: cookieHeader },
      credentials: "include",
    }
  );

  if (!res.ok) {
    return null;
  }

  return await res.json();
}

export const ValidAuthorisation = async (
  callback: (user: any | null) => any
): Promise<any> => {
  const cookieStore = await cookies();
  const token = cookieStore.get(APP_CONFIGURATION.COOKIE_TOKEN)?.value;

  if (!token) {
    return null;
  }

  const activeUser = AUTHORISED_JWT_TOKEN(token);
  if (typeof activeUser === "object" && activeUser !== null) {
    const user = await prismaClient.user.findUnique({
      where: { id: activeUser.id },
    });

    return callback(user);
  } else {
    return NextResponse.json(
      { message: CONSTANT_MESSGAES.AUTHORISATION.UNAUTHORISED },
      { status: 401 }
    );
  }
};

//   export async function getProfilePage(cookies) {
//     const res = await fetch(`${clientUrls.host.home}/${serverUrls.user.pageprofile}`, {
//       headers: {
//         cookie: Object.entries(cookies).map(([name, value]) => `${name}=${value}`).join('; ')
//       },
//     });
//     if (!res.ok) {
//       return null;
//     }
//     return await res.json();
//   }
