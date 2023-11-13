import { Prisma } from '@prisma/client';
import prisma from '../../../prisma/prisma-client';
import { CreateTokenDto, TokenDto } from './tokenModel';
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
  async substractCurrentAmountToken(
    tokenId: string,
    amount: number,
  ): Promise<TokenDto | null> {
    const updatedToken = await prisma.token.update({
      where: {
        id: Number(tokenId),
      },
      data: {
        currentAmount: amount,
      },
    });

    const tokenDto: TokenDto = {
      id: updatedToken.id,
      userId: updatedToken.userId,
      amount: updatedToken.amount,
      currentAmount: updatedToken.currentAmount,
      expiresAt: updatedToken.expiresAt,
      createdAt: updatedToken.createdAt,
      updatedAt: updatedToken.updatedAt ?? new Date(),
    };

    return tokenDto;
  },
  async addTokensToUser(
    tokenId: string,
    amount: number,
  ): Promise<TokenDto | null> {
    const token = await prisma.token.update({
      where: {
        id: Number(tokenId),
      },
      data: {
        currentAmount: {
          increment: amount,
        },
        amount: {
          increment: amount,
        },
      },
    });
    if (!token) {
      return null;
    }
    const tokenDto: TokenDto = {
      id: token.id,
      userId: token.userId,
      amount: token.amount,
      currentAmount: token.currentAmount,
      expiresAt: token.expiresAt,
      createdAt: token.createdAt,
      updatedAt: token.updatedAt ?? new Date(),
    };
    return tokenDto;
  },
  async getTokenById(tokenId: string): Promise<TokenDto> {
    const token = await prisma.token.findUnique({
      where: {
        id: Number(tokenId),
      },
    });
    if (!token) {
      throw new CustomError(404, `Token with id:${tokenId}, not found`);
    }
    const tokenDto: TokenDto = {
      id: token.id,
      userId: token.userId,
      amount: token.amount,
      currentAmount: token.currentAmount,
      expiresAt: token.expiresAt,
      createdAt: token.createdAt,
      updatedAt: token.updatedAt ?? new Date(),
    };
    return tokenDto;
  },
};

export default tokenRepository;
