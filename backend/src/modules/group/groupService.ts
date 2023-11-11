import groupRepository from './groupRepository';
import CustomError from '../../utils/errorModel';
import tokenRepository from '../token/tokenRepository';
import { CreateTokenDto } from '../token/tokenModel';

export const groupService = {
  async getTotalTokensForGroup(): Promise<any> {
    const groups = await groupRepository.listAllGroups();

    const result = await Promise.all(
      groups.map(async group => {
        const usersInGroup = await groupRepository.findUsersInGroupByIdOrName(
          group.id.toString(),
        );
        const tokensOfGroup = await groupRepository.getGroupUsersTokens(
          usersInGroup.map(user => user.id),
        );
        const groupTotalTokens = tokensOfGroup.reduce(
          (total, token) => total + token.amount,
          0,
        );
        const groupUsedTokens = tokensOfGroup.reduce(
          (total, token) => total + token.currentAmount,
          0,
        );
        return {
          group,
          totalTokens: groupTotalTokens,
          availableTokens: groupUsedTokens,
        };
      }),
    );
    return result;
  },
  async setTokensToUsersFromGroup(
    groupIdOrName: string,
    amount: number,
  ): Promise<void> {
    const users =
      await groupRepository.findUsersInGroupByIdOrName(groupIdOrName);
    if (!users) {
      throw new CustomError(
        404,
        `Group with id/name:${groupIdOrName}, not found`,
      );
    }
    try {
      await Promise.all(
        users.map(async user => {
          const tokenDto: CreateTokenDto = {
            userId: user.id,
            amount,
            currentAmount: amount,
            expiresAt: new Date(new Date().setMonth(new Date().getMonth() + 1)),
          };
          await tokenRepository.createToken(tokenDto);
        }),
      );
    } catch (error) {
      throw new CustomError(500, 'Internal server error');
    }
  },
};

export default groupService;
