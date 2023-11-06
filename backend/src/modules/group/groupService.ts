import groupRepository from './groupRepository';

export const groupService = {
  async getTotalTokensForGroup(): Promise<any> {
    const groups = await groupRepository.listAllGroups();

    const result = await Promise.all(
      groups.map(async group => {
        const usersInGroup = await groupRepository.findUsersInGroupByIdOrName(group.id.toString());
        const tokensOfGroup = await groupRepository.getGroupUsersTokens(usersInGroup.map(user => user.id));
        
        const groupTotalTokens = tokensOfGroup.reduce((total, token) => total + token.amount, 0);
        const groupUsedTokens = tokensOfGroup.reduce((total, token) => total + (token.amount - token.currentAmount), 0);
  
        return {
          group,
          totalTokens: groupTotalTokens,
          availableTokens: groupUsedTokens,
        };
      })
    );
    console.log(result);
    return result;
  },
};

export default groupService;

// let availableTokensCount = 0;
// let usedTokensCount = 0;
// const groups = await prisma.group.findMany();

// const groupDetails = await Promise.all(
//   groups.map(async group => {
//     const users = await prisma.user.findMany({
//       where: {
//         groups: { some: { id: group.id } },
//       },
//       include: {
//         token: true,
//       },
//     });

//     users.forEach(user => {
//       const currentTokens = user.token.filter(
//         token => new Date() <= new Date(token.expiresAt),
//       );
//       availableTokensCount += currentTokens.reduce(
//         (totalAmount, token) => totalAmount + token.amount,
//         0,
//       );
//       usedTokensCount += currentTokens.reduce(
//         (totalAmount, token) =>
//           totalAmount + (token.amount - token.currentAmount),
//         0,
//       );
//     });

//     return {
//       id: group.id,
//       name: group.name,
//       area: group.area ?? '',
//       totalTokens: availableTokensCount,
//       totalTokensUsed: usedTokensCount,
//       createdAt: group.createdAt,
//       updatedAt: group.updatedAt ?? new Date(),
//     };
//   }),
// );

// return groupDetails;
