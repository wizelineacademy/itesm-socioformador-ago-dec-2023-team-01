export const fetchGroups = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/group`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    let groups = await response.json();
    // console.log(groups);
    groups = groups.map((group:any) => ({
      id: group.group.id,
      title: group.group.name,
      members: group.numberOfUsers,
      moneySpent: 20,
      data: {
        labels: ['Used'],
        datasets: [
          {
            label: 'Group Overview',
            // eslint-disable-next-line max-len
            data: [Math.round(((group.totalTokens - group.availableTokens) / (group.totalTokens + 1)) * 100),
              // eslint-disable-next-line max-len
              100 - Math.round(((group.totalTokens - group.availableTokens) / (group.totalTokens + 1)) * 100)],
            backgroundColor: ['#E93D44', 'rgba(0,0,0,0)'],
            borderColor: ['rgba(0,0,0,0)', 'rgba(0,0,0,0)'],
            cutout: '37',
            borderRadius: 30,
          },
        ],
      },
    }));
    console.log(groups);
    return groups;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchGroup = () => {
  console.log('fetchGroup');
};

const fetchUserCurrentTokens = async (userId:string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}/tokens`);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    const tokensAmount = data.length > 0 ? data[0].amount : 0;

    return tokensAmount;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

export const fetchWizelinersInGroup = async (groupId:string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/group/${groupId}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    let usersInGroup = await response.json();
    usersInGroup = await Promise.all(usersInGroup.map(async (user:any) => ({
      id: user.id,
      username: `${user.firstName} ${user.lastName}`,
      idAdmin: 'Yes',
      wizecoins: await fetchUserCurrentTokens(user.id),
    })));
    console.log(usersInGroup);
    return usersInGroup;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createGroup = async (groupName:string) => {
  try {
    const data = {
      name: groupName,
      area: 'development',
    };
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/group`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteGroup = async (groupID:number) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/group/${groupID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addUserToGroup = async (groupId:number, userId:number) => {
  try {
    const data = {
      userId,
    };
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/group/${groupId}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    console.log(error);
  }
};

export const removeUserToGroup = async (groupId:string, userId:string) => {
  try {
    console.log(`About to remove ${userId} from group ${groupId}`);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/group/${groupId}/user/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    console.log(error);
  }
};
