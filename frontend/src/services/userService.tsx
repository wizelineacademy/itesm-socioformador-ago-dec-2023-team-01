export default async function fetchUser(userId:any) {
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
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/makeAdmin`, {
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
