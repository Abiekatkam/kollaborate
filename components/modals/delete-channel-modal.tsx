"use client";
import React, { useState } from "react";
import queryString from "query-string";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useModal } from "@/hooks/use-modal-store";
import { CLIENT_SIDE_URL, SERVER_SIDE_URLS } from "../constants/urls";
import CircleLoader from "../common/circle-loader";

const DeleteChannelModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const isModalOpen = isOpen && type === "DELETE_CHANNEL";
  const { server, channel } = data;

  const handleDeleteChannel = async () => {
    try {
      setIsLoading(true);
      const url = queryString.stringifyUrl({
        url: `${SERVER_SIDE_URLS.CHANNELS.INSERT}/${channel?.id}`,
        query: {
          serverId: server?.id,
        },
      });
      await axios.delete(url);
      onClose();
      router.push(`${CLIENT_SIDE_URL.HOME.SERVERS}/${server?.id}`);
      router.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-md p-0 selection:bg-green-100 selection:text-green-600 dark:selection:bg-green-600 dark:selection:text-green-100 border-2 dark:border-neutral-700 border-neutral-400">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-xl text-center capitalize font-bold">
            Delete Channel
          </DialogTitle>
          <DialogDescription className="text-center text-neutral-600 dark:text-neutral-400 text-pretty">
            Are you sure you want to delete the channel{" "}
            <span className="text-purple-600">
              <strong>#{channel?.channel_name}</strong>
            </span>{" "}
            ?<br /> This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="px-6 py-4 flex items-center gap-x-2 w-full justify-end">
          <Button
            disabled={isLoading}
            variant="ghost"
            onClick={onClose}
            type="button"
          >
            Cancel
          </Button>
          <Button
            disabled={isLoading}
            onClick={handleDeleteChannel}
            type="button"
            variant={"destructive"}
          >
            {isLoading ? (
              <CircleLoader text="Deleting channel..." />
            ) : (
              "Delete Channel"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteChannelModal;
