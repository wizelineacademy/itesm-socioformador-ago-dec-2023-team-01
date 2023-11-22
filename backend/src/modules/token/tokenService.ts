import CustomError from '../../utils/errorModel';
import userRepository from '../user/userRepository';
import { TokenDto, CreateTokenDto, CreateTokenInput } from './tokenModel';
import tokenRepository from './tokenRepository';

const tokenService = {
  async createToken(tokenBody: CreateTokenInput): Promise<CreateTokenDto> {
    const expiresAt = new Date(tokenBody.expiresAt);
    if (expiresAt < new Date()) {
      throw new CustomError(400, 'ExpiresAt must be in the future');
    }
    const token: CreateTokenDto = {
      userId: tokenBody.userId,
      amount: tokenBody.amount,
      currentAmount: tokenBody.amount,
      renewPeriodically: tokenBody.renewPeriodically ?? false,
      expiresAt,
    };
    return token;
  },
  async decrementCurrentAmountToken(
    tokenId: string,
    amount: number,
  ): Promise<TokenDto | null> {
    const token = await tokenRepository.getTokenById(tokenId);
    const newAmount = Math.max(0, token.currentAmount - amount);
    const updatedToken = await tokenRepository.substractCurrentAmountToken(
      tokenId,
      newAmount,
    );
    if (!updatedToken) {
      return null;
    }
    return updatedToken;
  },
  async addAmountToUsersToken(
    tokenId: string,
    amount: number,
  ): Promise<TokenDto | null> {
    if (amount < 0) {
      throw new CustomError(400, 'Amount must be positive');
    }
    const updatedToken = await tokenRepository.addTokensToUser(tokenId, amount);
    return updatedToken;
  },
  async getTotalTokensActive(): Promise<any> {
    const users = await userRepository.getUsers();
    let totalTokens = 0;
    let totalTokensUsed = 0;
    users.forEach(async user => {
      const token = await userRepository.getUserCurrentToken(user.id);
      if (token) {
        totalTokens += token.amount;
        totalTokensUsed += token.amount - (token.amount - token.currentAmount);
      }
    });
    return {
      totalTokens,
      totalTokensUsed,
    };
  },
};

export default tokenService;
