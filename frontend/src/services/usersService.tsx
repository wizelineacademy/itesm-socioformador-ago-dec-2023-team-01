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
