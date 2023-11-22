export interface DashboardDto {
  totalUsers: number;
  totalGroups: number;
  totalActiveTokens: number;
  totalUsedTokens: number;
  totalConversations: number;
  totalPosts: number;
  groupsWithMostUsedTokens: Array<any>;
  usersWithMostUsedTokens: Array<any>;
  userWithMostTokens: Array<any>;
};