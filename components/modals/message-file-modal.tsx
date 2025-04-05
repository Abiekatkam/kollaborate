"use client";
import React, { ReactHTMLElement, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import queryString from "query-string";
import axios from "axios";
import { useModal } from "@/hooks/use-modal-store";
import FileUpload from "../common/file-upload";
import CircleLoader from "../common/circle-loader";

const MessageFileModal = () => {
  const router = useRouter();
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type == "MESSAGE_FILE";
  const { apiUrl, query } = data;

  const [state, setState] = useState({
    error: "",
    loading: false,
    isFileUploaded: false,
    serverName: "",
    imageUrl: "",
    fileType: "",
  });

  const handleCloseModal = () => {
    setState({
      error: "",
      loading: false,
      imageUrl: "",
      isFileUploaded: false,
      serverName: "",
      fileType: "",
    });
    onClose();
  };

  const handleServerSubmit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    setState((prev) => ({ ...prev, loading: true, error: "" }));
    if (state.imageUrl !== "") {
      try {
        const url = queryString.stringifyUrl({
          url: apiUrl || "",
          query,
        });

        await axios.post(url, {
          ...state,
          content: state.imageUrl,
          fileUrl: state.imageUrl,
          fileType: state.fileType,
        });

        setState({
          error: "",
          loading: false,
          imageUrl: "",
          isFileUploaded: false,
          fileType: "",
          serverName: "",
        });
        handleCloseModal();
        router.refresh();
      } catch (error) {
        console.log("messafge file error: ", error);
      }
    } else {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: "Please provide a valid attachments.",
      }));
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
      <DialogContent className="sm:max-w-md p-0 border-2 dark:border-neutral-700 border-neutral-400 selection:bg-fuchsia-100 selection:text-fuchsia-600 dark:selection:bg-fuchsia-600 dark:selection:text-fuchsia-100">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-xl text-center capitalize font-bold">
            Upload Attachments
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-600 dark:text-zinc-400">
            Upload an interesting attachment to beautify your chat.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleServerSubmit}>
          <div className="space-y-8 px-6">
            <div className="flex items-center justify-center text-center">
              <FileUpload
                endPoint="messageFile"
                state={state}
                setState={setState}
              />
            </div>
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
              {state.isFileUploaded ? (
                <CircleLoader
                  className="text-neutral-300 dark:text-neutral-800"
                  text="uploading attachment..."
                />
              ) : state.loading ? (
                <CircleLoader
                  className="text-neutral-300 dark:text-neutral-800"
                  text="Sending your attachment..."
                />
              ) : (
                "Upload attachment"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MessageFileModal;
