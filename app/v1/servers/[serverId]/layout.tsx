import { CLIENT_SIDE_URL } from "@/components/constants/urls";
import ServerSidebar from "@/components/server-navigation/server-sidebar";
import { GetCurrentUserProfile } from "@/lib/authorisation";
import prismaClient from "@/lib/prisma";
import { redirect } from "next/navigation";
import React from "react";

export default async function ServerIdLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { serverId: string };
}) {
  const { serverId } = await params;
  const user = await GetCurrentUserProfile();
  if (!user) {
    return redirect(CLIENT_SIDE_URL.AUTH.LOGIN);
  }

  const server = await prismaClient.server.findUnique({
    where: {
      id: serverId,
      members: {
        some: {
          user_id: user?.id,
        },
      },
    },
  });

  if (!server) {
    return redirect(CLIENT_SIDE_URL.HOME.INDEX);
  }

  return (
    <div className="h-full">
      <div className="md:flex min-[300px]:hidden h-full w-80 z-20 flex-col fixed inset-y-0">
        <ServerSidebar serverId={serverId} />
      </div>
      <div className="h-full md:pl-80">{children}</div>
    </div>
  );
}
