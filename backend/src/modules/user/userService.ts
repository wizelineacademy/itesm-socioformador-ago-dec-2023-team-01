import { TokenDto } from '../token/tokenModel';
import userRepository from './userRepository';

export const userService = {
  async getUserTokens(userId: string): Promise<TokenDto[]> {
    const tokens = await userRepository.getUserTokens(userId);
    const tokensDto: TokenDto[] = tokens.map(token => ({
      id: token.id,
      userId: token.userId,
      amount: token.amount,
      currentAmount: token.currentAmount,
      expiresAt: token.expiresAt,
      createdAt: token.createdAt,
      updatedAt: token.updatedAt ?? new Date(),
    }));
    return tokensDto;
  },

  async getUserCurrentTokens(userId: string): Promise<TokenDto | null> {
    const token = await userRepository.getUserCurrentToken(userId);
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
};

export default userService;
