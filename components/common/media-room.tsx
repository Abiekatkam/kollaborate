"use client";
import React, { useEffect, useState } from "react";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import "@livekit/components-styles";
import { Loader2 } from "lucide-react";
import { user } from "@prisma/client";

interface RoomContainerProp {
  chatId: string;
  video: boolean;
  audio: boolean;
  user: user;
}

const RoomContainer = ({ chatId, video, audio, user }: RoomContainerProp) => {
  const [liveKitToken, setLiveKitToken] = useState("");

  useEffect(() => {
    if (!user || !user?.fullname) return;

    (async () => {
      try {
        const response = await fetch(
          `/api/livekit?room=${chatId}&username=${user?.fullname}`
        );
        const data = await response.json();
        setLiveKitToken(data.token);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [user, chatId]);

  if (liveKitToken === "") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2 className="w-7 h-7 text-neutral-500 animate-spin my-4" />
        <p className="text-xs text-neutral-500 dark:text-neutral-400">Loading...</p>
      </div>
    );
  }

  return (
    <LiveKitRoom
      data-lk-theme="default"
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      token={liveKitToken}
      connect={true}
      video={video}
      audio={audio}
    >
      <VideoConference />
    </LiveKitRoom>
  );
};

export default RoomContainer;
