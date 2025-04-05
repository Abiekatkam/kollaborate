import prismaClient from "./prisma";

export const getOrCreateConversation = async (memnerOneId:string, memnerTwoId:string) => {
  let conversation =
    (await findConversation(memnerOneId, memnerTwoId)) ||
    (await findConversation(memnerTwoId, memnerOneId));

  if (!conversation) {
    conversation = await createConversation(memnerOneId, memnerTwoId);
  }

  return conversation;
};

const findConversation = async (memnerOneId:string, memnerTwoId:string) => {
  try {
    return await prismaClient.conversation.findFirst({
      where: {
        AND: [{ memberOneId: memnerOneId }, { memberTwoId: memnerTwoId }],
      },
      include: {
        memberOne: {
          include: {
            user: true,
          },
        },
        memberTwo: {
          include: {
            user: true,
          },
        },
      },
    });
  } catch {
    return null;
  }
};

const createConversation = async (memnerOneId:string, memnerTwoId:string) => {
  try {
    return await prismaClient.conversation.create({
      data: {
        memberOneId: memnerOneId,
        memberTwoId: memnerTwoId,
      },
      include: {
        memberOne: {
          include: {
            user: true,
          },
        },
        memberTwo: {
          include: {
            user: true,
          },
        },
      },
    });
  } catch (error) {
    return null;
  }
};