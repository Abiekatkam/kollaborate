"use client";
import React from "react";
import { UploadDropzone } from "@/lib/uploadthing";
import { Button } from "@/components/ui/button";
import { FileIcon, X } from "lucide-react";
import { error } from "console";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  endPoint: "imageUploader" | "messageFile";
  setState?: any;
  state?: any;
}

const FileUpload = ({ endPoint, setState, state }: FileUploadProps) => {
  const fileType = state.fileType?.split("/");

  if (state.imageUrl && fileType[0] === "image") {
    return (
      <div
        className={cn(
          "ring-[#09090a] dark:ring-neutral-300",
          endPoint === "messageFile"
            ? "ring-2 rounded-md"
            : "ring-4 rounded-full p-1"
        )}
      >
        <div
          className={cn(
            "h-28 w-28 relative bg-neutral-300 dark:bg-neutral-800",
            endPoint === "messageFile" ? "rounded-md" : "rounded-full"
          )}
        >
          <img
            src={state.imageUrl}
            alt="server-image"
            className={cn(
              endPoint === "messageFile" ? "rounded-md" : "rounded-full",
              "object-cover"
            )}
          />
          <Button
            type="button"
            className="p-1 rounded-full bg-rose-500 text-white absolute top-0 right-0 shadow-sm w-8 h-8"
            onClick={() =>
              setState({
                ...state,
                imageUrl: "",
                fileType: "",
                isFileUploaded: false,
              })
            }
          >
            <X />
          </Button>
        </div>
      </div>
    );
  }

  if (state.imageUrl && fileType[0] === "application") {
    return (
      <div className="relative w-48 h-48 flex flex-col items-center justify-center p-2 mt-2 rounded-md bg-neutral-200 dark:bg-neutral-800">
        <FileIcon className="h-20 w-20 fill-neutral-200 stroke-neutral-400" />
        <a
          href={state.imageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 text-sm font-semibold mt-2 underline text-neutral-700 dark:text-neutral-400 hover:underline"
        >
          Preview File
        </a>
        <Button
          type="button"
          className="p-1 rounded-full bg-rose-500 text-white absolute -top-2 -right-2 shadow-sm w-8 h-8"
          onClick={() =>
            setState({
              ...state,
              fileUrl: "",
              fileType: "",
              isFileUploaded: false,
            })
          }
        >
          <X />
        </Button>
      </div>
    );
  }
  return (
    <UploadDropzone
      endpoint={endPoint}
      onClientUploadComplete={(res) => {
        setState({
          ...state,
          imageUrl: res?.[0].ufsUrl,
          fileType: res?.[0].type,
          error: "",
          isFileUploaded: false,
        });
      }}
      onUploadBegin={() => {
        setState({ ...state, isFileUploaded: true });
      }}
      onUploadError={(error) => setState({ ...state, error: error.message })}
    />
  );
};

export default FileUpload;
