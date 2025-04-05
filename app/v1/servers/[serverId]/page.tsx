import { CLIENT_SIDE_URL } from "@/components/constants/urls";
import { GetCurrentUserProfile } from "@/lib/authorisation";
import prismaClient from "@/lib/prisma";
import { redirect } from "next/navigation";

interface ServerIdPageProps {
  params: { serverId: string };
}

const ServerIdPage = async ({ params }: ServerIdPageProps) => {
  const user = await GetCurrentUserProfile();
  if (!user) {
    return redirect(CLIENT_SIDE_URL.AUTH.LOGIN);
  }

  const server = await prismaClient.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          user_id: user?.id,
        },
      },
    },
    include: {
      channel: {
        where: {
          channel_name: "general",
        },
        orderBy: {
          created_at: "asc",
        },
      },
    },
  });

  const initialChannel = server?.channel[0];

  if (initialChannel?.channel_name !== "general") {
    return redirect(CLIENT_SIDE_URL.HOME.INDEX);
  }
  return redirect(
    `${CLIENT_SIDE_URL.HOME.SERVERS}/${params?.serverId}/channels/${initialChannel?.id}`
  );
};

export default ServerIdPage;
