import CustomError from '../../utils/errorModel';
import { TokenDto, CreateTokenDto, CreateTokenInput } from './tokenModel';
import tokenRepository from './tokenRepository';

const tokenService = {
  async createToken(tokenBody: CreateTokenInput): Promise<CreateTokenDto> {
    const tokenInput: CreateTokenInput = {
      userId: tokenBody.userId,
      amount: tokenBody.amount,
      expiresAt: tokenBody.expiresAt,
    };
    const expiresAt = new Date(tokenInput.expiresAt);
    if (expiresAt < new Date()) {
      throw new CustomError(400, 'ExpiresAt must be in the future');
    }
    const token: CreateTokenDto = {
      userId: tokenInput.userId,
      amount: tokenInput.amount,
      currentAmount: tokenInput.amount,
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
};

export default tokenService;
