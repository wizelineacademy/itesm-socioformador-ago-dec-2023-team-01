import roleRepository from '../role/roleRepository';
import { TokenDto } from '../token/tokenModel';
import userRepository from './userRepository';
import { User } from './userModel';
import CustomError from '../../utils/errorModel';
import tokenService from '../token/tokenService';
import tokenRepository from '../token/tokenRepository';

export const userService = {
  async getUserById(userId: string): Promise<User> {
    const user = await userRepository.getUserById(userId);
    const role = await roleRepository.getRoleById(user.roleId);
    const newUser: User = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      imageUrl: user.imageUrl,
      email: user.email,
      role: role.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt ?? new Date(),
    };
    return newUser;
  },

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
    if (token.expiresAt < new Date()) {
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

  async getGroupsFromUser(userId: string): Promise<string[]> {
    const user = userRepository.getUserById(userId);
    if (!user) {
      throw new CustomError(404, `User with id:${userId}, not found`);
    }

    const groupNames = await userRepository.getGroupsFromUser(userId);

    return groupNames;
  },

  async addToUserToken(
    userId: string,
    amount: number,
  ): Promise<TokenDto | null> {
    const token = await userRepository.getUserCurrentToken(userId);
    if (!token) {
      return null;
    }
    const updatedToken = await tokenRepository.addTokensToUser(
      String(token.id),
      amount,
    );
    return updatedToken;
  },
  async substractToUserToken(
    userId: string,
    amount: number,
  ): Promise<TokenDto | null> {
    const token = await userRepository.getUserCurrentToken(userId);
    if (!token) {
      return null;
    }
    const updatedToken = await tokenService.decrementCurrentAmountToken(
      String(token.id),
      amount,
    );
    return updatedToken;
  },
};

export default userService;
