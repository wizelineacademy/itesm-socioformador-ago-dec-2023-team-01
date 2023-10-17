import prisma from '../../../prisma/prisma-client';
import CustomError from '../../utils/errorModel';

export const userRepository = {
  async createUser(userInput: CreateUserInput): Promise<User> {
    try {
      const user = await prisma.user.create({

      });
    } catch (error) {
      throw new CustomError(500, 'Internal server error');
    }
  },
};

export default userRepository;
