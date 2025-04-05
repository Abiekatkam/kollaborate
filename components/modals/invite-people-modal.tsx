"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, Copy, RefreshCw } from "lucide-react";
import axios from "axios";
import { useModal } from "@/hooks/use-modal-store";
import { string } from "zod";
import { useOrigin } from "@/hooks/use-origin";
import { SERVER_SIDE_URLS } from "../constants/urls";

const InvitePeopleModal = () => {
  const { isOpen, onClose, type, data, onOpen } = useModal();
  const origin = useOrigin();

  const isModalOpen = isOpen && type === "INVITE_PEOPLE";
  const { server } = data;
  const inviteUrl = `${origin}/v1/invite/${server?.invite_code}`;

  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  const handleGenerateNewLink = async () => {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `${SERVER_SIDE_URLS.SERVERS.INSERT}/${server?.id}/invite-code`
      );

      onOpen("INVITE_PEOPLE", { server: response.data });
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-md p-0 border-2 dark:border-neutral-700 border-neutral-400 selection:bg-fuchsia-100 selection:text-fuchsia-600 dark:selection:bg-fuchsia-600 dark:selection:text-fuchsia-100">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-xl text-center capitalize font-bold">
            Invite People
          </DialogTitle>
          <DialogDescription className="text-center text-pretty text-neutral-600 dark:text-neutral-400">
            Invite people using your unique invite link.
            <br />
            <strong>{server?.server_name}</strong>
          </DialogDescription>
        </DialogHeader>
        <div className="p-6">
          <Label className="uppercase text-xs font-bold text-neutral-500 dark:text-neutral-200">
            Server invite link
          </Label>
          <div className="flex items-center mt-2 gap-x-2">
            <Input
              className="bg-neutral-300/50 dark:bg-[#1b2021]/70 border-0 focus-visible:ring-0 text-black dark:text-white selection:bg-fuchsia-100 selection:text-fuchsia-600 dark:selection:bg-fuchsia-600 dark:selection:text-fuchsia-100 focus-visible:ring-offset-0"
              value={inviteUrl}
              disabled={isLoading}
            />
            <Button size="icon" onClick={handleCopy} disabled={isLoading}>
              {isCopied ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
          <Button
            variant="link"
            size="sm"
            disabled={isLoading}
            onClick={handleGenerateNewLink}
            className="text-xs text-neutral-500 mt-4"
          >
            Generate a new link <RefreshCw className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InvitePeopleModal;
