"use client";
import React from "react";
import { UploadDropzone } from "@/lib/uploadthing";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FileIcon, X } from "lucide-react";

interface FileUploadProps {
  endPoint: "imageUploader" | "messageFile";
  setState?: any;
  state?: any;
}

const FileUpload = ({ endPoint, setState, state }: FileUploadProps) => {
  const fileType = state.fileType?.split("/");

  if (state.imageUrl && fileType[0] === "image") {
    return (
      <div className="p-1 rounded-full ring-4 ring-[#09090a] dark:ring-neutral-300">
        <div className="h-28 w-28 rounded-full relative bg-neutral-300 dark:bg-neutral-800">
          <Image
            fill
            src={state.imageUrl}
            alt="server-image"
            className="rounded-full"
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
      <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
        <FileIcon className="h-10 w-10 fill-green-500 stroke-green-400" />
        <a
          href={state.imageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 text-sm text-green-600 dark:text-green-400 hover:underline"
        >
          {state.imageUrl}
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
