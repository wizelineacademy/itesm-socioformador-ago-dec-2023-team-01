import { Prisma } from '@prisma/client';
import prisma from '../../../prisma/prisma-client';
import CustomError from '../../utils/errorModel';
import { CreateUserInput, UserDto } from './userModel';
import { TokenDto } from '../token/tokenModel';
import { Conversation } from '../conversation/conversationModel';

export const userRepository = {
  async createUser(userInput: CreateUserInput): Promise<UserDto> {
    try {
      const user = await prisma.user.create({
        data: {
          id: userInput.id,
          email: userInput.email,
          imageUrl: userInput.imageUrl,
          firstName: userInput.firstName.toLowerCase(),
          lastName: userInput.lastName.toLowerCase(),
          roleId: userInput.roleId,
        },
      });
      const newUser: UserDto = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        imageUrl: user.imageUrl,
        email: user.email,
        roleId: user.roleId,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt ?? new Date(),
      };
      return newUser;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new CustomError(409, 'User already exists');
        } else if (error.code === 'P2003') {
          throw new CustomError(400, `Invalid role id:${userInput.roleId}`);
        }
      } else if (error instanceof Prisma.PrismaClientValidationError) {
        throw new CustomError(400, 'Invalid input');
      }
    }
    throw new CustomError(500, 'Internal server error');
  },

  async getUserById(userId: string): Promise<UserDto> {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new CustomError(404, `User with id:${userId}, not found`);
    }

    const newUser: UserDto = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      imageUrl: user.imageUrl,
      email: user.email,
      roleId: user.roleId,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt ?? new Date(),
    };
    return newUser;
  },

  async getUsers(): Promise<UserDto[]> {
    const users = await prisma.user.findMany();
    const newUsers: UserDto[] = users.map(user => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      imageUrl: user.imageUrl,
      email: user.email,
      roleId: user.roleId,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt ?? new Date(),
    }));
    return newUsers;
  },

  async getUserTokens(userId: string): Promise<TokenDto[]> {
    const tokens = await prisma.token.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!tokens) {
      throw new CustomError(404, `User with id:${userId}, not found`);
    }

    const newTokens: TokenDto[] = tokens.map(token => ({
      id: token.id,
      userId: token.userId,
      amount: token.amount,
      currentAmount: token.currentAmount,
      expiresAt: token.expiresAt,
      renewPeriodically: token.renewPeriodically,
      createdAt: token.createdAt,
      updatedAt: token.updatedAt ?? new Date(),
    }));
    return newTokens;
  },

  async getUserCurrentToken(userId: string): Promise<TokenDto | null> {
    const token = await prisma.token.findFirst({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!token) {
      return null;
    }

    const newToken: TokenDto = {
      id: token.id,
      userId: token.userId,
      amount: token.amount,
      currentAmount: token.currentAmount,
      renewPeriodically: token.renewPeriodically,
      expiresAt: token.expiresAt,
      createdAt: token.createdAt,
      updatedAt: token.updatedAt ?? new Date(),
    };
    return newToken;
  },
  async getConversationsOfUser(userId: string): Promise<Conversation[]> {
    const conversations = await prisma.conversation.findMany({
      where: {
        userId,
        isDeleted: false,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
    const newConversations: Conversation[] = conversations.map(
      conversation => ({
        id: conversation.id,
        title: conversation.title,
        isDeleted: conversation.isDeleted,
        languageId: conversation.languageId,
        userId: conversation.userId,
        createdAt: conversation.createdAt,
        updatedAt: conversation.updatedAt ?? new Date(),
        deletedAt: conversation.deletedAt,
      }),
    );
    return newConversations;
  },
  async makeAdmin(userId: string, isAdmin: boolean): Promise<UserDto> {
    let user = null;
    try {
      const roleId = isAdmin ? 1 : 2;
      user = await prisma.user.update({
        where: { id: userId },
        data: {
          roleId,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new CustomError(404, `Could not find user ${userId} to update`);
      }
    }
    if (!user) {
      throw new CustomError(404, `User with id:${userId}, not found`);
    }
    const updateUser: UserDto = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      imageUrl: user.imageUrl,
      email: user.email,
      roleId: user.roleId,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt ?? new Date(),
    };
    return updateUser;
  },
  async getGroupsFromUser(userId: string): Promise<any[]> {
    const groups = await prisma.group.findMany({
      where: {
        users: { some: { id: userId } },
      },
    });
    return groups.map(group => ({
      id: group.id,
      name: group.name,
    }));
  },

  async deleteUser(userId: string): Promise<object> {
    const user = await prisma.user.delete({
      where: {
        id: userId,
      },
    });
    return user;
  },
};

export default userRepository;
