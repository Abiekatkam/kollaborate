"use client";

import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { APP_CONFIGURATION } from "../constants/urls";

const UserProfile = ({ user }: any) => {
  const router = useRouter();
  return (
    <Popover>
      <PopoverTrigger>
        <div className="w-[40px] h-[40px] ring-2 ring-black dark:ring-white flex mx-3 rounded-[24px] hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-neutral-900 dark:bg-neutral-100 group-hover:bg-neutral-800 dark:group-hover:bg-neutral-200 cursor-pointer">
          <img
            src={user.image_url}
            alt="profile"
            className="w-[40px] h-[40px] object-cover grayscale"
          />
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        side="right"
        className="dark:bg-[#09090a] flex flex-col items-center justify-center w-[250px]"
      >
        <span className="text-md truncate mt-3">{user.fullname}</span>
        <span className="text-xs truncate mt-1">{user.email}</span>
        <div className="flex flex-row items-center justify-around w-full">
          <Button
            variant="destructive"
            className="h-8 mt-4 w-full"
            onClick={() => {
              Cookies.remove(APP_CONFIGURATION.COOKIE_TOKEN);
              router.refresh();
            }}
          >
            Logout
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserProfile;
