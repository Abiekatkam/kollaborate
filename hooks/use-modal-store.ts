import { create } from "zustand";

// {"addServer", "invitePeople", "editServer", "manageMembers", "createChannel", "leaveServer", "deleteServer", "deleteChannel", "editChannel", "messageFile", "deleteMessage"}

export type ModalType =
  | "CREATE_SERVER"
  | "invitePeople"
  | "editServer"
  | "manageMembers"
  | "createChannel"
  | "leaveServer"
  | "deleteServer"
  | "deleteChannel"
  | "editChannel"
  | "messageFile"
  | "deleteMessage";

interface ModalStore {
  type: ModalType | null;
  isOpen: boolean;
  onOpen: (type: ModalType) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type }),
  onClose: () => set({ type: null, isOpen: false }),
}));
