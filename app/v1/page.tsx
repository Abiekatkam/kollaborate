"use server";
import { GetCurrentUserProfile } from "@/lib/authorisation";
import prismaClient from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function RootPage() {
  const user = await GetCurrentUserProfile();
  const server = await prismaClient.server.findFirst({
    where: {
      members: {
        some: {
          user_id: user.id,
        },
      },
    },
  });

  if (server) {
    return redirect(`/v1/servers/${server?.id}`);
  }
  return (
    <>
      <h1>Hello servers</h1>
      {/* <CreateServerModal /> */}
    </>
  );
}
