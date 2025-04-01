"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import ActionTooltip from "../common/action-tooltip";
import { CLIENT_SIDE_URL } from "../constants/urls";

interface NavigationItemsProps {
  id: string;
  imageUrl: string;
  name: string;
}

const NavigationItems = ({ id, imageUrl, name }: NavigationItemsProps) => {
  const params = useParams();
  const router = useRouter();

  const redirectToSever = () => {
    router.push(`${CLIENT_SIDE_URL.HOME.SERVERS}/${id}`);
  };
  return (
    <ActionTooltip
      side="right"
      align="center"
      label={name || "untitled server"}
    >
      <div
        onClick={redirectToSever}
        className="group relative flex items-center"
      >
        <div
          className={cn(
            "absolute left-0 bg-primary rounded-r-full transition-all w-[4px]",
            params.serverId !== id && "group-hover:h-[20px]",
            params.serverId === id ? "h-[36px] dark:bg-green-500 bg-green-600" : "h-[8px]"
          )}
        />
        <div
          className={cn(
            "relative group flex mx-3 h-[42px] w-[42px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden my-1 ring-1",
            params.serverId === id &&
              "bg-primary/10 text-primary rounded-[16px] ring-2 dark:ring-green-500 ring-green-600"
          )}
        >
          <Image fill src={imageUrl} alt="channel" />
        </div>
      </div>
    </ActionTooltip>
  );
};

export default NavigationItems;
