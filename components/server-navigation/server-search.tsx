"use client";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useParams, useRouter } from "next/navigation";
import { SERVER_SIDE_URLS } from "../constants/urls";

interface ServerSearchProps {
  data: {
    label: string;
    type: "channel" | "member";
    data:
      | {
          id: string;
          name: string;
          icon: React.ReactNode;
        }[]
      | undefined;
  }[];
}

const ServerSearch = ({ data }: ServerSearchProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const params = useParams();

  const handleRedirectCommand = (id: string, type: "member" | "channel") => {
    setIsOpen(false);
    if (type == "member") {
      return router.push(
        `${SERVER_SIDE_URLS.SERVERS.INSERT}/${params.serverId}/conversations/${id}`
      );
    }
    if (type == "channel") {
      return router.push(
        `${SERVER_SIDE_URLS.SERVERS.INSERT}/${params.serverId}/channels/${id}`
      );
    }
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <button
        className="group px-2 py-2 rounded-t-md flex items-center gap-x-2 w-full hover:bg-neutral-700/10 dark:hover:bg-neutral-700/50 transition border-b-2 border-b-neutral-300 dark:border-b-neutral-700/50"
        onClick={() => setIsOpen(true)}
      >
        <Search className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
        <p className="min-[300px]:hidden sm:block font-semibold text-sm text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition">
          Search
        </p>
        <p className="sm:hidden min-[300px]:block font-semibold text-sm text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition">
          Search...
        </p>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto">
          <span className="text-xs">CTRL</span>K
        </kbd>
      </button>
      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        <CommandInput placeholder="Search for channels or members..." />
        <CommandList>
          <CommandEmpty>No Results Found.</CommandEmpty>
          {data.map(({ label, data, type }) => {
            if (!data?.length) return null;

            return (
              <CommandGroup key={label} heading={label}>
                {data?.map(({ id, icon, name }) => {
                  return (
                    <CommandItem
                      key={id}
                        onSelect={() => handleRedirectCommand(id, type)}
                    >
                      {icon}
                      <span className="ml-2">{name}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            );
          })}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default ServerSearch;
