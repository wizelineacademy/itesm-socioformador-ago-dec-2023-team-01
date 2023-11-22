import { Prisma } from '@prisma/client';
import prisma from '../../../prisma/prisma-client';
import { createGroupInput, Group } from './groupModel';
import CustomError from '../../utils/errorModel';
import { TokenDto } from '../token/tokenModel';

export const groupRepository = {
  async createGroup(groupInput: createGroupInput): Promise<Group> {
    try {
      const group = await prisma.group.create({
        data: {
          name: groupInput.name.toLowerCase(),
          area: groupInput.area || '',
        },
      });

      return {
        id: group.id,
        name: group.name,
        area: group.area ?? '',
        createdAt: group.createdAt,
        updatedAt: group.updatedAt ?? new Date(),
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new CustomError(409, 'Group already exists');
        }
      } else if (error instanceof Prisma.PrismaClientValidationError) {
        throw new CustomError(400, 'Invalid input');
      }
    }
    throw new CustomError(500, 'Internal server error');
  },
  async deleteGroupById(groupId: number): Promise<Group | undefined> {
    let group = null;
    try {
      group = await prisma.group.findUnique({
        where: {
          id: groupId,
        },
      });
    } catch (error) {
      if (!group) {
        throw new CustomError(
          404,
          `Group with id / name:${groupId}, not found`,
        );
      } else {
        throw new CustomError(500, 'internal server error');
      }
    }
    let deletedGroup;
    if (group) {
      try {
        await prisma.group.update({
          where: { id: groupId },
          data: {
            users: {
              disconnect: (group as any).users.map((user: any) => ({
                id: user.id,
              })),
            },
          },
        });
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          throw new CustomError(
            404,
            `Could not find group ${groupId} to delete`,
          );
        }
      }
      try {
        const deleted = await prisma.group.delete({
          where: { id: groupId },
        });
        deletedGroup = {
          id: deleted.id,
          name: deleted.name,
          area: deleted.area ?? '',
          createdAt: deleted.createdAt,
          updatedAt: deleted.updatedAt ?? new Date(),
        };
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          throw new CustomError(
            404,
            `Could not find group ${groupId} to delete`,
          );
        }
      }
    }
    return deletedGroup;
  },
  async addUserToGroupById(groupId: number, userId: string): Promise<Group> {
    let updatedGroup = null;
    const user = await prisma.user.findUnique({ where: { id: userId } });
    const group = await prisma.group.findUnique({ where: { id: groupId } });
    if (!user || !group) {
      throw new CustomError(
        404,
        `Group or user with id/name:${groupId} and ${userId}, not found`,
      );
    }
    try {
      const updated = await prisma.group.update({
        where: { id: groupId },
        data: {
          users: {
            connect: { id: userId },
          },
        },
      });
      updatedGroup = {
        id: updated.id,
        name: updated.name,
        area: updated.area ?? '',
        createdAt: updated.createdAt,
        updatedAt: updated.updatedAt ?? new Date(),
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new CustomError(404, `Could not find group ${groupId} to delete`);
      } else {
        throw new CustomError(500, `Internal server error`);
      }
    }
    return updatedGroup;
  },
  async removeUserFromGroupById(
    userId: string,
    groupId: number,
  ): Promise<void> {
    const group = await prisma.group.findUnique({
      where: { id: groupId },
    });

    if (!group) {
      throw new CustomError(404, `Group with id/name ${groupId} not found`);
    } else {
      try {
        await prisma.group.update({
          where: { id: groupId },
          data: {
            users: {
              disconnect: { id: userId },
            },
          },
        });
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          throw new CustomError(
            404,
            `Could not find group ${groupId} to delete`,
          );
        } else {
          throw new CustomError(500, `Internal server error`);
        }
      }
    }
  },
  async addAreaToGroupById(groupId: number, area: string): Promise<Group> {
    let updatedGroup = null;
    const group = await prisma.group.findUnique({ where: { id: groupId } });

    if (!group) {
      throw new CustomError(404, `Group with id/name ${groupId} not found`);
    } else {
      try {
        const update = await prisma.group.update({
          where: { id: groupId },
          data: {
            area,
          },
        });
        updatedGroup = {
          id: update.id,
          name: update.name,
          area: update.area ?? '',
          createdAt: update.createdAt,
          updatedAt: update.updatedAt ?? new Date(),
        };
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          throw new CustomError(
            404,
            `Could not find group ${groupId} to delete`,
          );
        } else {
          throw new CustomError(500, `Internal server error`);
        }
      }
    }
    return updatedGroup;
  },
  async listAllGroups(): Promise<Array<Group>> {
    const groups = await prisma.group.findMany();

    return groups.map(group => ({
      id: group.id,
      name: group.name,
      area: group.area ?? '',
      createdAt: group.createdAt,
      updatedAt: group.updatedAt,
    }));
  },
  async findUsersInGroupById(groupId: number) {
    let users = null;
    const group = await prisma.group.findUnique({ where: { id: groupId } });

    if (!group) {
      throw new CustomError(404, `Group with id ${groupId} not found`);
    } else {
      try {
        const whereCondition = { groups: { some: { id: groupId } } };
        users = await prisma.user.findMany({
          where: whereCondition,
        });
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          throw new CustomError(404, `Could not find group ${groupId}`);
        } else {
          throw new CustomError(500, `Internal server error`);
        }
      }
    }
    return users;
  },
  async getGroupUsersTokens(usersIds: string[]): Promise<TokenDto[]> {
    const tokens = await Promise.all(
      usersIds.map(async userId => {
        const token = await prisma.token.findFirst({
          where: {
            userId,
          },
          orderBy: {
            createdAt: 'desc',
          },
        });
        return token;
      }),
    );

    if (!tokens) {
      throw new CustomError(404, `Users with ids:${usersIds}, not found`);
    }

    const validTokens = tokens
      .flat()
      .filter(
        currentToken => currentToken && currentToken.expiresAt > new Date(),
      );

    const newTokens: TokenDto[] = validTokens.map(token => ({
      id: token?.id ?? 0,
      userId: token?.userId ?? '',
      amount: token?.amount ?? 0,
      currentAmount: token?.currentAmount ?? 0,
      renewPeriodically: token?.renewPeriodically ?? false,
      expiresAt: token?.expiresAt ?? new Date(),
      createdAt: token?.createdAt ?? new Date(),
      updatedAt: token?.updatedAt ?? new Date(),
    }));
    return newTokens;
  },
};

export default groupRepository;
