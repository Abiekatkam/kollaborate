"use client";
import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { useModal } from "@/hooks/use-modal-store";
import { SERVER_SIDE_URLS } from "../constants/urls";
import FileUpload from "../common/file-upload";
import CircleLoader from "../common/circle-loader";

const EditServerModal = () => {
  const router = useRouter();
  const { isOpen, onClose, type, data } = useModal();
  const { server } = data;

  const isModalOpen = isOpen && type === "EDIT_SERVER";

  const handleModalClose = () => {
    onClose();
  };

  const [state, setState] = useState({
    error: "",
    loading: false,
    isFileUploaded: false,
    serverName: "",
    imageUrl: "",
    fileType: "",
  });

  const handleServerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState((prev) => ({ ...prev, loading: true, error: "" }));
    if (state.imageUrl !== "" && state.serverName !== "") {
      if (state.serverName.length < 4) {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: "Server name must contains more than 3 character.",
        }));
      } else {
        try {
          await axios.patch(
            `${SERVER_SIDE_URLS.SERVERS.INSERT}/${server?.id}`,
            state
          );
          setState({
            error: "",
            loading: false,
            serverName: "",
            imageUrl: "",
            isFileUploaded: false,
            fileType: "",
          });
          router.refresh();
          onClose();
        } catch (error) {
          console.log("initial server error: ", error);
        }
      }
    } else {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: "Please provide a valid server name and image.",
      }));
    }
  };

  useEffect(() => {
    if (server) {
      setState((prev: any) => ({
        ...prev,
        serverName: server?.server_name,
        imageUrl: server?.image_url,
      }));
    }
  }, [server]);

  return (
    <Dialog open={isModalOpen} onOpenChange={handleModalClose}>
      <DialogContent className="sm:max-w-md p-0 selection:bg-green-100 selection:text-green-600 dark:selection:bg-green-600 dark:selection:text-green-100 border-2 dark:border-neutral-700 border-neutral-400">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-xl text-center capitalize font-bold">
            Edit a Server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-600 dark:text-zinc-400">
            Personalize your server by giving it a name and an image. You can
            always update them later.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleServerSubmit}>
          <div className="space-y-8 px-6">
            <div className="flex items-center justify-center text-center">
              <FileUpload
                endPoint="imageUploader"
                state={state}
                setState={setState}
              />
            </div>

            <label className="mb-1 block">
              <span className="mb-1 block text-sm font-semibold leading-6">
                Server Name
              </span>
              <input
                className="block h-9 w-full appearance-none rounded-md bg-zinc-300/50 dark:bg-[#09090a] px-3 text-sm text-black dark:text-white shadow-sm ring-1 ring-gray-300 dark:ring-gray-600 placeholder:text-slate-800 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-gray-900 placeholder:italic dark:focus:ring-gray-500"
                autoFocus
                inputMode="text"
                autoComplete="servername"
                type="text"
                name="serverName"
                disabled={state.loading || state.isFileUploaded}
                placeholder="Enter a server name"
                value={state.serverName}
                onChange={(event) => {
                  setState({ ...state, serverName: event.target.value });
                }}
              />
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
              {state.isFileUploaded ? (
                <CircleLoader
                  className="text-neutral-300 dark:text-neutral-800"
                  text="Image uploading..."
                />
              ) : state.loading ? (
                <CircleLoader
                  className="text-neutral-300 dark:text-neutral-800"
                  text="Updating server..."
                />
              ) : (
                "Update Server"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditServerModal;
