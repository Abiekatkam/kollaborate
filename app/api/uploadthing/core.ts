import { ValidAuthorisation } from "@/lib/authorisation";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = async () => {
  const userDetails = await ValidAuthorisation((user) => {
    return user;
  });
  console.log("userDetails", userDetails);

  return { userId: userDetails?.id };
};

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(async ({ metadata, file }) => {
      return { fileUrl: file.ufsUrl };
    }),

  messageFile: f(["image", "pdf", "video"])
    .middleware(async () => await handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
