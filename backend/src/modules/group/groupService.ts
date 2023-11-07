import groupRepository from './groupRepository';

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
          (total, token) => total + (token.amount - token.currentAmount),
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
};

export default groupService;
