import CustomError from '../../utils/errorModel';
import conversationRepository from '../conversation/conversationRepository';
import postRepository from '../conversation/post/postRepository';
import groupRepository from '../group/groupRepository';
import tokenService from '../token/tokenService';
import userRepository from '../user/userRepository';
import groupService from '../group/groupService';
import { DashboardDto } from './dashboardModel';
import userService from '../user/userService';

export const dashboardService = {
  async getDashboardData(): Promise<DashboardDto> {
    try {
      const [users, totalGroups, totalTokensInfo, conversations, groups] =
        await Promise.all([
          await userRepository.getUsers(),
          (await groupRepository.listAllGroups()).length,
          await tokenService.getTotalTokensActive(),
          await conversationRepository.getConversations(),
          await groupService.getTotalTokensForGroup(),
        ]);
      const totalConversations = conversations.length;
      const totalActiveTokens = totalTokensInfo.totalTokens;
      const totalUsedTokens = totalTokensInfo.totalTokensUsed;
      const groupsWithMostUsedTokens = groups
        .sort((a: any, b: any) => a.totalTokens - b.totalTokens)
        .slice(0, 5);
      let totalPosts = 0;
      conversations.forEach(async (conversation: { id: number }) => {
        totalPosts += (
          await postRepository.getPostsOfConversation(conversation.id)
        ).length;
      });
      const usersWithTokens = await Promise.all(
        users.map(async (user: { id: string }) => {
          const token = await userService.getUserCurrentTokens(user.id);
          return {
            user,
            amount: token?.amount ?? 0,
            currentAmount: token?.currentAmount ?? 0,
          };
        }),
      );
      const usersWithMostUsedTokens = usersWithTokens
        .sort(
          (a: any, b: any) =>
            a.mount -
            (a.amount - a.currentAmount) -
            (b.mount - (b.amount - b.currentAmount)),
        )
        .slice(0, 5);
      const userWithMostTokens = usersWithTokens
        .sort((a: any, b: any) => b.amount - a.amount)
        .slice(0, 5);
      const dashboardInfo: DashboardDto = {
        totalUsers: users.length,
        totalGroups,
        totalActiveTokens,
        totalUsedTokens,
        totalConversations,
        totalPosts,
        groupsWithMostUsedTokens,
        usersWithMostUsedTokens,
        userWithMostTokens,
      };
      return dashboardInfo;
    } catch (error) {
      throw new CustomError(500, String(error));
    }
  },
};

export default dashboardService;
