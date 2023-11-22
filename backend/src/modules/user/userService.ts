import axios from 'axios';
import roleRepository from '../role/roleRepository';
import { TokenDto, CreateTokenInput } from '../token/tokenModel';
import userRepository from './userRepository';
import { User, CreateUserInput, UserDto } from './userModel';
import CustomError from '../../utils/errorModel';
import tokenService from '../token/tokenService';
import tokenRepository from '../token/tokenRepository';
import { ApiReponse } from '../../shared/models/responseModel';

export const userService = {
  async createUser(userInput: CreateUserInput): Promise<UserDto> {
    const user = await userRepository.createUser(userInput);
    const oneMonthFromNow = new Date(
      new Date().setMonth(new Date().getMonth() + 1),
    );
    const newToken: CreateTokenInput = {
      userId: user.id,
      amount: 0,
      expiresAt: oneMonthFromNow,
    };
    await tokenService.createToken(newToken);
    return user;
  },

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
      renewPeriodically: token.renewPeriodically,
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
      renewPeriodically: token.renewPeriodically,
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

  async deleteUser(userId: string): Promise<ApiReponse> {
    const user = await userRepository.getUserById(userId);
    if (!user) {
      throw new CustomError(404, `User with id:${userId}, not found in db`);
    }
    try {
      const options = {
        method: 'GET',
        url: `${process.env.AUTH0_MANAGEMENT_API_URL}/users/${userId}`,
        headers: {
          authorization: `Bearer ${process.env.AUTH0_MANAGEMENT_API_TOKEN}`,
        },
      };
      const userAuth0 = await axios(options);
      if (userAuth0) {
        options.method = 'DELETE';
        await axios(options);
      }
    } catch (error) {
      throw new CustomError(500, `Error deleting user from Auth0: ${error}`);
    }
    const deletedUser = await userRepository.deleteUser(userId);
    return { message: 'User deleted', data: deletedUser };
  },
};

export default userService;
