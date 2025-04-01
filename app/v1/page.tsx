"use server";
import { CLIENT_SIDE_URL } from "@/components/constants/urls";
import InitialServerModal from "@/components/modals/initial-server-modal";
import { GetCurrentUserProfile } from "@/lib/authorisation";
import prismaClient from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function RootPage() {
  const user = await GetCurrentUserProfile();
  const server = await prismaClient.server.findFirst({
    where: {
      members: {
        some: {
          user_id: user?.id,
        },
      },
    },
  });

  if (server) {
    return redirect(`${CLIENT_SIDE_URL.HOME.SERVERS}/${server?.id}`);
  }
  return (
    <>
      <InitialServerModal />
    </>
  );
}
