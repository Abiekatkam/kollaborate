"use client";
import React, { useEffect, useState } from "react";
import queryString from "query-string";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useModal } from "@/hooks/use-modal-store";
import { SERVER_SIDE_URLS } from "../constants/urls";
import CircleLoader from "../common/circle-loader";
import { ChannelType } from "@prisma/client";

const CreateChannelModal = () => {
  const router = useRouter();
  const params = useParams();
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "CREATE_CHANNEL";

  const handleModalClose = () => {
    onClose();
  };

  const [state, setState] = useState({
    error: "",
    loading: false,
    channelName: "",
    channelType: ChannelType.TEXT,
  });

  const handleServerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState((prev) => ({ ...prev, loading: true, error: "" }));
    if (state.channelName !== "") {
      if (state.channelName.length < 4) {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: "Channel name must contains more than 3 character.",
        }));
      } else if (state.channelName.toLowerCase() === "general") {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: "Channel name cannot be 'general'",
        }));
      } else {
        try {
          const url = queryString.stringifyUrl({
            url: SERVER_SIDE_URLS.CHANNELS.INSERT,
            query: {
              serverId: params?.serverId,
            },
          });

          await axios.post(url, state);
          setState({
            error: "",
            loading: false,
            channelName: "",
            channelType: ChannelType.TEXT,
          });
          router.refresh();
          onClose();
        } catch (error) {
          console.log("initial channel creation error: ", error);
        }
      }
    } else {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: "Please provide a valid channel name and channel type.",
      }));
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleModalClose}>
      <DialogContent className="sm:max-w-md p-0 selection:bg-fuchsia-100 selection:text-fuchsia-600 dark:selection:bg-fuchsia-600 dark:selection:text-fuchsia-100 border-2 dark:border-neutral-700 border-neutral-400">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-xl text-center capitalize font-bold">
            Create a Channel
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-600 dark:text-zinc-400">
            Create a vibrant channel to enhance your server's community
            experience.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleServerSubmit}>
          <div className="space-y-8 px-6">
            <label className="mb-1 block">
              <span className="mb-1 block text-sm font-semibold leading-6">
                Channel Name
              </span>
              <input
                className="block h-9 w-full appearance-none rounded-md bg-white dark:bg-neutral-950 px-3 text-sm text-black dark:text-white shadow-sm ring-1 ring-neutral-300 dark:ring-neutral-700 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-300 placeholder:italic"
                autoFocus
                inputMode="text"
                autoComplete="channelname"
                type="text"
                name="channelName"
                disabled={state.loading}
                placeholder="Enter a channel name"
                value={state.channelName}
                onChange={(event) => {
                  setState({ ...state, channelName: event.target.value });
                }}
              />
            </label>

            <label className="mt-4 block">
              <span className="mb-1 block text-sm font-semibold leading-6">
                Channel Type
              </span>
              <Select
                disabled={state.loading}
                onValueChange={(value:any) =>
                  setState({ ...state, channelType: value })
                }
                value={state.channelType} 
              >
                <SelectTrigger className="h-9 w-full appearance-none rounded-md bg-white dark:bg-neutral-950 px-3 text-sm text-black dark:text-white shadow-sm ring-1 ring-neutral-300 dark:ring-neutral-700 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-300 placeholder:italic">
                  <SelectValue
                    placeholder="Select a channel type"
                    className="capitalize"
                  />
                </SelectTrigger>
                <SelectContent className="dark:bg-[#09090a]">
                  {Object.values(ChannelType).map((type) => (
                    <SelectItem key={type} value={type} className="capitalize">
                      {type.toLowerCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </label>
          </div>
          <p
            className={`h-fit text-center text-sm font-medium ${
              state.error ? "my-4" : "hidden"
            }`}
          >
            {state.error ? (
              <span className="text-red-500 bg-red-100 p-2 rounded-md">
                {state.error}
              </span>
            ) : null}
          </p>
          <DialogFooter className="px-6 py-4">
            <Button
              type="submit"
              className="bg-[#09090a] dark:bg-white h-9"
              disabled={state.loading}
            >
              {state.loading ? (
                <CircleLoader text="Creating a channel..." />
              ) : (
                "Create Channel"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateChannelModal;