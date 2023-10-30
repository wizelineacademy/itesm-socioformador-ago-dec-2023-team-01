import { Prisma } from '@prisma/client';
import prisma from '../../../prisma/prisma-client';
import CustomError from '../../utils/errorModel';
import { CreateUserInput, UserDto } from './userModel';
import { PostResponse } from '../../shared/models/responseModel';

export const userRepository = {
  async createUser(userInput: CreateUserInput): Promise<PostResponse> {
    try {
      const user = await prisma.user.create({
        data: {
          id: userInput.id,
          email: userInput.email,
          firstName: userInput.firstName.toLowerCase(),
          lastName: userInput.lastName.toLowerCase(),
          roleId: userInput.roleId,
        },
      });
      const newUser: PostResponse = {
        id: user.id,
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
      email: user.email,
      roleId: user.roleId,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt ?? new Date(),
    }));
    return newUsers;
  },
};

export default userRepository;
