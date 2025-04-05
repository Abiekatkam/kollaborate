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
import axios from "axios";
import { useModal } from "@/hooks/use-modal-store";
import CircleLoader from "../common/circle-loader";

const DeleteMessageModal = () => {
  const { isOpen, onClose, type, data } = useModal();

  const [isLoading, setIsLoading] = useState(false);

  const isModalOpen = isOpen && type === "DELETE_MESSAGE";
  const { apiUrl, query } = data;

  const handleDeleteMessage = async () => {
    try {
      setIsLoading(true);
      const url = queryString.stringifyUrl({
        url: apiUrl || "",
        query,
      });
      await axios.delete(url);
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-md p-0 selection:bg-fuchsia-100 selection:text-fuchsia-600 dark:selection:bg-fuchsia-600 dark:selection:text-fuchsia-100 border-2 dark:border-neutral-700 border-neutral-400">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-xl text-center capitalize font-bold">
            Delete Message
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-600 dark:text-zinc-400">
            Are you sure you want to delete the message?
            <br />
            The message will be permanently deleted.
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
            onClick={handleDeleteMessage}
            type="button"
            variant={"destructive"}
          >
            {isLoading ? (
              <CircleLoader text="Deleting message..." />
            ) : (
              "Confirm Delete"
            )}{" "}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteMessageModal;
