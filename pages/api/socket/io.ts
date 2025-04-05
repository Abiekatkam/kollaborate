import prismaClient from "@/lib/prisma";
import { Server as ServerIO } from "socket.io";
import { Server as NetServer } from "http";

import { NextApiResponseSocketIo } from "@/types";
import { NextApiRequest } from "next";

export const SOCKET_CONFIG = {
  api: {
    bodyParser: false,
  },
};

const SocketIoHandler = (
  request: NextApiRequest,
  response: NextApiResponseSocketIo
) => {
  if (!response.socket.server.io) {
    console.log("SOCKET.IO INITIALIZING...");
    const path = "/api/socket/io";
    const httpServer: NetServer = response.socket.server as any;

    const io = new ServerIO(httpServer, {
      path: path,
      // @ts-ignore
      addTrailingSlash: false,
    });

    // io.on("connection", (socket) => {
    //   console.log("New socket connection:", socket.id);

    //   // Update user online status
    //   socket.on("userConnected", async (userId) => {
    //     onlineUsers.set(socket.id, userId);
    //     await prismaClient.user.update({
    //       where: { id: userId },
    //       data: { is_online: true },
    //     });
    //     io.emit("updateUserStatus", { userId, is_online: true });
    //   });

    //   // Handle user disconnection
    //   socket.on("disconnect", async () => {
    //     console.log("Socket disconnected:", socket.id);
    //     const userId = onlineUsers.get(socket.id);
    //     if (userId) {
    //       onlineUsers.delete(socket.id);
    //       await prismaClient.user.update({
    //         where: { id: userId },
    //         data: { is_online: false },
    //       });
    //       io.emit("updateUserStatus", { userId, is_online: false });
    //     }
    //   });
    // });

    response.socket.server.io = io;
  } else {
    console.log("Socket.io Instance already exists.");
  }
  response.end();
};

export default SocketIoHandler;
