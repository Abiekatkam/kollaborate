export const dynamic = "force-dynamic";
import { GetCurrentUserProfile } from "@/lib/authorisation";
import prismaClient from "@/lib/prisma";
import { redirect } from "next/navigation";
import React from "react";
import { HiCubeTransparent } from "react-icons/hi";
import { ScrollArea } from "../ui/scroll-area";
import Link from "next/link";
import { CLIENT_SIDE_URL } from "../constants/urls";
import NavigationActions from "./navigation-actions";
import NavigationItems from "./navigation-items";
import { ThemeToggle } from "../common/theme-toggle";
import UserProfile from "../common/user-profile";
import { Button } from "../ui/button";
import { LuMessageSquareText } from "react-icons/lu";

const NavigationSidebar = async () => {
  const user = await GetCurrentUserProfile();

  if (!user || !user.id) {
    return redirect(CLIENT_SIDE_URL.AUTH.LOGIN);
  }

  const servers = await prismaClient.server.findMany({
    where: {
      members: {
        some: {
          user_id: user?.id,
        },
      },
    },
  });

  if (!Array.isArray(servers) || servers.length === 0) {
    return <></>;
  }

  return (
    <div className="flex flex-col items-center justify-between h-full text-primary w-full py-3 bg-neutral-200 dark:bg-neutral-900/90">
      <div className="w-full h-full flex flex-col items-center">
        <Link
          href={CLIENT_SIDE_URL.HOME.HOMEPAGE}
          className="p-2 text-2xl bg-neutral-900 dark:bg-neutral-50 text-neutral-50 dark:text-neutral-950 flex items-center justify-center group hover:rotate-90 rounded-full transition-all ease-in duration-200"
        >
          <HiCubeTransparent className="group-hover:scale-110 transition-all ease-in-out duration-150" />
        </Link>
        <NavigationActions />
        <ScrollArea className="flex-1 w-full mt-6">
          {servers &&
            servers.map((server) => (
              <div key={server.id} className="mb-2">
                <NavigationItems
                  id={server.id}
                  name={server?.server_name || "untitled server"}
                  imageUrl={server?.image_url || ""}
                />
              </div>
            ))}
        </ScrollArea>
      </div>

      <div className="w-full h-fit flex flex-col items-center space-y-4">
        {/* <Button className="flex items-center group">
          <LuMessageSquareText className="size-4 group-hover:scale-110 transition-all ease-in-out duration-150" />
        </Button> */}
        <ThemeToggle />
        <UserProfile user={user} />
      </div>
    </div>
  );
};

export default NavigationSidebar;
