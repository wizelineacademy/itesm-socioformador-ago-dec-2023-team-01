import CustomError from '../../utils/errorModel';
import { CreateTokenDto, CreateTokenInput } from './tokenModel';

const tokenService = {
  createToken(tokenBody: any): CreateTokenDto {
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
};

export default tokenService;
