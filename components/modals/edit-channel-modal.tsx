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
import { useRouter } from "next/navigation";
import axios from "axios";
import { useModal } from "@/hooks/use-modal-store";
import { ChannelType } from "@prisma/client";
import { SERVER_SIDE_URLS } from "../constants/urls";
import CircleLoader from "../common/circle-loader";

const EditChannelModal = () => {
  const router = useRouter();
  const { isOpen, onClose, type, data } = useModal();
  const { channel, server } = data;
  const [state, setState] = useState({
    error: "",
    loading: false,
    channelName: "",
    channelType: "",
  });

  useEffect(() => {
    if (channel) {
      setState({
        ...state,
        channelName: channel.channel_name,
        channelType: channel.type.toUpperCase(),
      });
    }
  }, [channel]);

  const isModalOpen = isOpen && type === "EDIT_CHANNEL";

  const handleModalClose = () => {
    onClose();
  };

  const handleServerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState((prev) => ({ ...prev, loading: true, error: "" }));
    if (state.channelName !== "" && state.channelType !== "") {
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
            url: `${SERVER_SIDE_URLS.CHANNELS.INSERT}/${channel?.id}`,
            query: {
              serverId: server?.id,
            },
          });

          await axios.patch(url, state);
          setState({
            error: "",
            loading: false,
            channelName: "",
            channelType: "",
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
            Edit Channel
          </DialogTitle>
          <DialogDescription className="text-center text-neutral-600 dark:text-neutral-400">
            Edit the details of your channel. Make sure to save your changes.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleServerSubmit}>
          <div className="space-y-8 px-6">
            <label className="mb-1 block">
              <span className="mb-1 block text-sm font-semibold leading-6">
                Channel Name
              </span>
              <input
                className="block h-9 w-full appearance-none rounded-md bg-neutral-300/50 dark:bg-[#09090a] px-3 text-sm text-black dark:text-white shadow-sm ring-1 ring-gray-300 dark:ring-gray-600 placeholder:text-slate-800 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-gray-900 placeholder:italic dark:focus:ring-gray-500"
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

            <label className="mb-1 block">
              <span className="mb-1 block text-sm font-semibold leading-6">
                Channel Type
              </span>
              <Select
                disabled={state.loading}
                onValueChange={(value) =>
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
                <CircleLoader text="Updating channel" />
              ) : (
                "Update Channel"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditChannelModal;
