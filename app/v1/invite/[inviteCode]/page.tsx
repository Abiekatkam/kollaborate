import { CLIENT_SIDE_URL } from "@/components/constants/urls";
import { GetCurrentUserProfile } from "@/lib/authorisation";
import prismaClient from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
interface InviteCodePageProps {
  params: { inviteCode: string };
}

const InviteCodePage = async ({ params }: InviteCodePageProps) => {
  const user = await GetCurrentUserProfile();
  if (!user) {
    return redirect("/login");
  }
  const { inviteCode } = await params;
  if (!inviteCode) {
    return redirect("/v1");
  }

  const existingServer = await prismaClient.server.findFirst({
    where: {
      invite_code: inviteCode,
      members: {
        some: {
          user_id: user.id,
        },
      },
    },
  });

  if (existingServer) {
    return redirect(`${CLIENT_SIDE_URL.HOME.SERVERS}/${existingServer.id}`);
  }

  const server = await prismaClient.server.update({
    where: {
      invite_code: inviteCode,
    },
    data: {
      members: {
        create: [
          {
            user_id: user.id,
          },
        ],
      },
    },
  });

  if (server) {
    return redirect(`${CLIENT_SIDE_URL.HOME.SERVERS}/${server.id}`);
  }
  return null;
};

export default InviteCodePage;
