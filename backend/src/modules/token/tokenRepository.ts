import { Prisma } from '@prisma/client';
import prisma from '../../../prisma/prisma-client';
import { CreateTokenDto } from './tokenModel';
import { PostResponse } from '../../shared/models/responseModel';
import CustomError from '../../utils/errorModel';

const tokenRepository = {
  async createToken(tokenInput: CreateTokenDto): Promise<PostResponse> {
    try {
      const token = await prisma.token.create({
        data: {
          userId: tokenInput.userId,
          amount: tokenInput.amount,
          currentAmount: tokenInput.currentAmount,
          expiresAt: tokenInput.expiresAt,
        },
      });
      const newToken: PostResponse = {
        id: token.id,
      };
      return newToken;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          throw new CustomError(400, `Invalid userId:${tokenInput.userId}`);
        }
      } else if (error instanceof Prisma.PrismaClientValidationError) {
        throw new CustomError(400, 'Invalid input.');
      }
    }
    throw new CustomError(500, 'Internal server error');
  },
};

export default tokenRepository;
