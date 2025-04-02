import { GetCurrentUserProfile } from "@/lib/authorisation";
import prismaClient from "@/lib/prisma";
import { redirect } from "next/navigation";
import React from "react";
import { HiCubeTransparent } from "react-icons/hi";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import Link from "next/link";
import { CLIENT_SIDE_URL } from "../constants/urls";
import NavigationActions from "./navigation-actions";
import NavigationItems from "./navigation-items";
import { ThemeToggle } from "../common/theme-toggle";
import UserProfile from "../common/user-profile";

interface Server {
  id: string;
  server_name: string;
  image_url: string;
}
// TODO: looking odd at the bottom left corner fix it ui

const NavigationSidebar = async () => {
  const user = await GetCurrentUserProfile();
  if (!user) {
    return redirect("/login");
  }

  const servers = (await prismaClient.server.findMany({
    where: {
      members: {
        some: {
          user_id: user.id,
        },
      },
    },
  })) as Server[];

  if (servers.length === 0) {
    return <></>;
  }

  return (
    <div className="flex flex-col items-center justify-between h-full text-primary w-full py-3 bg-neutral-200 dark:bg-neutral-950">
      <div className="w-full h-full flex flex-col items-center space-y-3">
        <Link
          href={CLIENT_SIDE_URL.HOME.HOMEPAGE}
          className="w-[43px] h-[43px] text-2xl bg-neutral-900 dark:bg-neutral-50 text-neutral-50 dark:text-neutral-950 flex items-center justify-center group hover:rotate-90 rounded-full transition-all ease-in duration-200"
        >
          <HiCubeTransparent className="group-hover:scale-110 transition-all ease-in-out duration-150" />
        </Link>
        <Separator className="h-[1px] bg-neutral-300 dark:bg-neutral-700 rounded-md w-10 mx-auto" />

        <ScrollArea className="flex-1 w-full">
          {servers?.map((server) => (
            <div key={server.id} className="mb-2">
              <NavigationItems
                id={server.id}
                name={server.server_name}
                imageUrl={server?.image_url}
              />
            </div>
          ))}
        </ScrollArea>
      </div>
      
      <div className="w-full h-fit flex flex-col items-center space-y-3">
        <NavigationActions />
        <ThemeToggle />
        <UserProfile user={user} />
      </div>
    </div>
  );
};

export default NavigationSidebar;
