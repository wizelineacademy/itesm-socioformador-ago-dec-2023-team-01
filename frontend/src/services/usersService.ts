// eslint-disable-next-line import/prefer-default-export
export const fetchUsers = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    let users = await response.json();
    console.log(users);
    users = users.map((user:any) => ({
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
    }));
    return users;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export async function fetchUser(userId:any) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
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

export async function updateUserAdminStatus(userId:any, isAdmin:any) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/admin`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
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

export const fetchUserGroups = async (userId:any) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}/groups`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    let userGroups = await response.json();
    console.log(userGroups);
    userGroups = userGroups.map((group:any) => ({
      id_group: group.id,
      name: group.name,
    }));
    return userGroups;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
