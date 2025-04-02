import { member, server, user } from "@prisma/client";

export type ServerWithMembersWithProfiles = server & {
  members: (member & { user: user })[];
};
