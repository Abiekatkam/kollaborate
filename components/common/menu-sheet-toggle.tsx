import { Menu } from "lucide-react";
import React from "react";

import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import NavigationSidebar from "../navigation/navigation-sidebar";
import ServerSidebar from "../server-navigation/server-sidebar";

interface MenuToggleProps {
  serverId: string;
}

const MenuToggle = ({ serverId }: MenuToggleProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="sm:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 flex gap-0">
        <div className="w-[64px]">
          <NavigationSidebar />
        </div>
        <ServerSidebar serverId={serverId} />
      </SheetContent>
    </Sheet>
  );
};

export default MenuToggle;
