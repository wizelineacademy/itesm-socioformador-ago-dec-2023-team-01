import groupRepository from './groupRepository';
import CustomError from '../../utils/errorModel';
import tokenRepository from '../token/tokenRepository';
import { CreateTokenDto } from '../token/tokenModel';
import userRepository from '../user/userRepository';

export const groupService = {
  async getTotalTokensForGroup(): Promise<any> {
    const groups = await groupRepository.listAllGroups();

    const result = await Promise.all(
      groups.map(async group => {
        const usersInGroup = await groupRepository.findUsersInGroupById(
          group.id,
        );
        const tokensOfGroup = await groupRepository.getGroupUsersTokens(
          usersInGroup.map(user => user.id),
        );
        const groupTotalTokens = tokensOfGroup.reduce(
          (total, token) => total + token.amount,
          0,
        );
        const groupUsedTokens = tokensOfGroup.reduce(
          (total, token) =>
            total + (token.amount - (token.amount - token.currentAmount)),
          0,
        );
        const numberOfUsersInGroup = await groupRepository.findUsersInGroupById(
          group.id,
        );
        return {
          group,
          totalTokens: groupTotalTokens,
          availableTokens: groupUsedTokens,
          numberOfUsers: numberOfUsersInGroup.length,
        };
      }),
    );
    return result;
  },
  async setTokensToUsersFromGroup(
    groupId: string,
    amount: number,
  ): Promise<void> {
    if (Number.isNaN(Number(groupId))) {
      throw new CustomError(400, 'Invalid group id');
    }
    const users = await groupRepository.findUsersInGroupById(Number(groupId));
    if (!users) {
      throw new CustomError(404, `Group with id/name:${groupId}, not found`);
    }
    try {
      const now = new Date();
      await Promise.all(
        users.map(async user => {
          const token = await userRepository.getUserCurrentToken(user.id);
          if (token) {
            await tokenRepository.addTokensToUser(String(token.id), amount);
          } else {
            const tokenDto: CreateTokenDto = {
              userId: user.id,
              amount,
              currentAmount: amount,
              expiresAt: new Date(
                now.getFullYear(),
                now.getMonth() + 1,
                1,
                23,
                58,
                59,
              ),
            };
            await tokenRepository.createToken(tokenDto);
          }
        }),
      );
    } catch (error) {
      throw new CustomError(500, 'Internal server error');
    }
  },
};

export default groupService;
