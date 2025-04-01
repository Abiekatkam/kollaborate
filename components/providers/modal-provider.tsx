"use client";
import { useEffect, useState } from "react";
import CreateServerModal from "../modals/create-server-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <CreateServerModal />
      {/* <AddServerModal />
      <EditServerModal />
      <InvitePeopleModal />
      <ManageMemberModal />
      <CreateChannelModal />
      <LeaveServerModal />
      <DeleteServerModal />
      <DeleteChannelModal />
      <EditChannelModal />
      <MessageFileModal />
      <DeleteMessageModal/> */}
    </>
  );
};
