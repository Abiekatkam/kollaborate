"use client";
import React, { useState } from "react";
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
import { SERVER_SIDE_URLS } from "../constants/urls";
import CircleLoader from "../common/circle-loader";

const LeaveServerModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const isModalOpen = isOpen && type === "LEAVE_SERVER";
  const { server } = data;

  const handleLeaveServer = async () => {
    try {
      setIsLoading(true);
      await axios.patch(
        `${SERVER_SIDE_URLS.SERVERS.INSERT}/${server?.id}/leave`
      );
      onClose();
      router.refresh();
    } catch (error) {
      console.log("❌ CLIENT_ERROR: Error while leaving the server ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-md p-0 border-2 dark:border-neutral-700 border-neutral-400 selection:bg-fuchsia-100 selection:text-fuchsia-600 dark:selection:bg-fuchsia-600 dark:selection:text-fuchsia-100">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-xl text-center capitalize font-bold">
            Leave Server
          </DialogTitle>
          <DialogDescription className="text-center text-neutral-600 dark:text-neutral-400">
            Are you sure you want to leave{" "}
            <span className="text-fuchsia-600">
              <strong>{server?.server_name}</strong>
            </span>{" "}
            server?
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
            onClick={handleLeaveServer}
            type="button"
            variant={"destructive"}
          >
            {isLoading ? (
              <CircleLoader text="Leaving server..." />
            ) : (
              "Leave Server"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeaveServerModal;
