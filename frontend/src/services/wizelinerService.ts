// eslint-disable-next-line import/prefer-default-export
export const fetchWizeliners = async () => {
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

    let wizeliners = await response.json();
    wizeliners = wizeliners.map((user:any) => ({
      fullName: `${user.firstName} ${user.lastName}`,
      areas: user?.areas ?? [''],
      isAdmin: user?.isAdmin ?? true,
      monthlyWizecoins: user?.monthlyWizecoins ?? 0,
    }));
    console.log(wizeliners);
    return wizeliners;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
