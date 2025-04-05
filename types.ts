import { member, message, server, user } from "@prisma/client";
import { Server as NetServer, Socket } from "net";
import { Server as SocketIOServer } from "socket.io";
import { NextApiResponse } from "next";

export type ServerWithMembersWithProfiles = server & {
  members: (member & { user: user })[];
};

export type NextApiResponseSocketIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io?: SocketIOServer;
    };
  };
}

export type MessageWithMemberWithProfile = message & {
  member: member & {
    user: user;
  };
}