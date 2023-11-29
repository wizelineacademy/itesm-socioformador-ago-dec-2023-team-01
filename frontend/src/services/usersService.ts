// eslint-disable-next-line import/prefer-default-export
import { fetchUserCurrentTokens } from '@/services/tokenService';

export const fetchUsers = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const users = await response.json();
    console.log(users);

    const usersWithTokens = await Promise.all(users.map(async (user: any) => {
      const tokens = await fetchUserCurrentTokens(user.id);
      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: `${user.firstName} ${user.lastName}`,
        imageUrl: user.imageUrl,
        email: user.email,
        roleId: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        isAdmin: user.roleId === 1,
        currentTokens: tokens.currentAmountTokens,
        amountTokens: tokens.totalAmountTokens,
      };
    }));
    return usersWithTokens;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export async function fetchUser(userId:string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const userData = await response.json();

    // Modify the user data into the desired format
    const formattedUser = {
      id: userData.id,
      firstName: userData.firstName,
      lastName: userData.lastName,
      fullName: `${userData.firstName} ${userData.lastName}`,
      imageUrl: userData.imageUrl,
      email: userData.email,
      role: userData.role,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt,
      isAdmin: userData.role === 'admin',
    };
    return formattedUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateUserAdminStatus(userId:string, isAdmin:boolean) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/admin`, {
      method: 'PATCH',
      body: JSON.stringify({
        userId,
        isAdmin,
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const userData = await response.json();

    // Modify the user data into the desired format
    const formattedUser = {
      id: userData.id,
      firstName: userData.firstName,
      lastName: userData.lastName,
      fullName: `${userData.firstName} ${userData.lastName}`,
      imageUrl: userData.imageUrl,
      email: userData.email,
      roleId: userData.role,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt,
      isAdmin: userData.roleId === 1,
    };
    return formattedUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const fetchUserGroups = async (userId:string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}/groups`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    let userGroups = await response.json();
    console.log(userGroups);
    userGroups = userGroups.map((group:any) => ({
      id: group.id,
      name: group.name,
    }));
    console.log(userGroups);
    return userGroups;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getHistory = async (userId: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}/conversations`);
    const history = await response.json();
    return history;
  } catch (error) {
    console.error(`error getting history: ${error}`);
    return [];
  }
};
