import { Prisma } from '@prisma/client';
import prisma from '../../../prisma/prisma-client';
import { CreateTokenDto, TokenDto } from './tokenModel';
import { PostResponse } from '../../shared/models/responseModel';
import CustomError from '../../utils/errorModel';

const tokenRepository = {
  async createToken(tokenInput: CreateTokenDto): Promise<PostResponse> {
    try {
      const now = new Date();
      const token = await prisma.token.create({
        data: {
          userId: tokenInput.userId,
          amount: tokenInput.amount,
          currentAmount: tokenInput.amount,
          renewPeriodically:
            tokenInput.renewPeriodically === undefined
              ? false
              : tokenInput.renewPeriodically,
          expiresAt:
            tokenInput.expiresAt === undefined
              ? new Date(now.getFullYear(), now.getMonth() + 1, 1, 23, 59, 59)
              : new Date(
                  tokenInput.expiresAt.getFullYear(),
                  tokenInput.expiresAt.getMonth(),
                  tokenInput.expiresAt.getDate(),
                  23,
                  58,
                  59,
                ),
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
      console.info(error);
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
      renewPeriodically: updatedToken.renewPeriodically,
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
      renewPeriodically: token.renewPeriodically,
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
      renewPeriodically: token.renewPeriodically,
      expiresAt: token.expiresAt,
      createdAt: token.createdAt,
      updatedAt: token.updatedAt ?? new Date(),
    };
    return tokenDto;
  },

  async getTokens(): Promise<TokenDto[]> {
    const tokens = await prisma.token.findMany();
    const tokensDto: TokenDto[] = tokens.map(token => ({
      id: token.id,
      userId: token.userId,
      amount: token.amount,
      currentAmount: token.currentAmount,
      renewPeriodically: token.renewPeriodically,
      expiresAt: token.expiresAt,
      createdAt: token.createdAt,
      updatedAt: token.updatedAt ?? new Date(),
    }));
    return tokensDto;
  },
};

export default tokenRepository;
