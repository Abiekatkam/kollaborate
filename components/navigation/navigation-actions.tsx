"use client";
import React from "react";
import { Plus } from "lucide-react";
import ActionTooltip from "../common/action-tooltip";
import { useModal } from "@/hooks/use-modal-store";

const NavigationActions = () => {
  const { onOpen } = useModal();

  return (
    <ActionTooltip label="Add a server" align="center" side="right">
      <div
        className="group flex items-center mt-4"
        onClick={() => onOpen("CREATE_SERVER")}
      >
        <div className="flex mx-3 h-[40px] w-[40px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-zinc-900 dark:bg-neutral-100 group-hover:bg-green-600 dark:group-hover:bg-green-500">
          <Plus
            size={22}
            className="text-neutral-50 dark:text-neutral-900 transition group-hover:rotate-90 group-hover:scale-110 ease-in duration-150"
          />
        </div>
      </div>
    </ActionTooltip>
  );
};

export default NavigationActions;
