import roleRepository from '../role/roleRepository';
import { TokenDto } from '../token/tokenModel';
import userRepository from './userRepository';
import { User } from './userModel';

export const userService = {
  async getUserById(userId: string): Promise<User> {
    const user = await userRepository.getUserById(userId);
    const role = await roleRepository.getRoleByIdOrName(user.roleId.toString());
    const newUser: User = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
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
