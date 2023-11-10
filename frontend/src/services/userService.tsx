export default async function fetchUser(userId:any) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, {
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
      imageUrl: userData.imageUrl,
      email: userData.email,
      role: userData.role,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt,
    };

    return formattedUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
