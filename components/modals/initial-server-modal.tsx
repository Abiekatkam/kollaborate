"use client";
import React, { useState } from "react";
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
import CircleLoader from "../common/circle-loader";
import { SERVER_SIDE_URLS } from "../constants/urls";
import FileUpload from "../common/file-upload";
import { CONSTANT_MESSGAES } from "../constants/messages";

const InitialServerModal = () => {
  const router = useRouter();

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
          error: "Server name must contain more than 3 characters.",
        }));
        return;
      }

      if (state.imageUrl === "") {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: "Server image is required.",
        }));
        return;
      }

      try {
        const response = await fetch(SERVER_SIDE_URLS.SERVERS.INSERT, {
          method: "POST",
          body: JSON.stringify({
            serverName: state.serverName,
            imageUrl: state.imageUrl,
          }),
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          setState((prev) => ({
            ...prev,
            loading: false,
            error: CONSTANT_MESSGAES.COMMON.SERVER_CREATION_ERROR,
          }));
          return;
        }

        setState({
          error: "",
          loading: false,
          serverName: "",
          imageUrl: "",
          isFileUploaded: false,
          fileType: "",
        });
        router.refresh();
      } catch (error) {
        console.error("Initial server error:", error);
        setState((prev) => ({
          ...prev,
          loading: false,
          error: CONSTANT_MESSGAES.COMMON.SERVER_CREATION_ERROR,
        }));
      }
    } else {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: "Please provide a valid server name and image.",
      }));
    }
  };

  return (
    <Dialog open>
      <DialogContent className="sm:max-w-md p-0 border-2 dark:border-neutral-700 selection:bg-fuchsia-100 selection:text-fuchsia-600 dark:selection:bg-fuchsia-600 dark:selection:text-fuchsia-100 border-neutral-400">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-xl text-center capitalize font-bold">
            Create your First Server
          </DialogTitle>
          <DialogDescription className="text-center text-neutral-700 dark:text-neutral-400">
            Personalize your server by giving it a name and an image. You can
            always update them later.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleServerSubmit}>
          <div className="space-y-8 px-6">
            <div className="relative flex items-center justify-center text-center">
              <FileUpload
                endPoint="imageUploader"
                setState={setState}
                state={state}
              />
            </div>

            <label className="mb-1 block">
              <span className="mb-1 block text-sm font-semibold leading-6">
                Server Name
              </span>
              <input
                className="block h-9 w-full appearance-none rounded-md bg-white dark:bg-neutral-950 px-3 text-sm text-black dark:text-white shadow-sm ring-1 ring-neutral-300 dark:ring-neutral-700 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-300 placeholder:italic"
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
            <Button type="submit" className="h-9" disabled={state.loading}>
              {state.isFileUploaded ? (
                <CircleLoader
                  className="text-neutral-300 dark:text-neutral-800"
                  text="Image uploading..."
                />
              ) : state.loading ? (
                <CircleLoader
                  className="text-neutral-300 dark:text-neutral-800"
                  text="Creating server..."
                />
              ) : (
                "Create Server"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InitialServerModal;
