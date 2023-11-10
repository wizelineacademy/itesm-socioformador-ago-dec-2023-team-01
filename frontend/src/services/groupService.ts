export const fetchGroups = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/group/getAllGroups`, {
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
    groups = groups.map((group:any) => ({
      id: group.group.id,
      title: group.group.name,
      members: 20,
      moneySpent: 20,
      data: {
        labels: ['Used'],
        datasets: [
          {
            label: 'Group Overview',
            data: [Math.round((group.availableTokens / (group.totalTokens + 1)) * 100),
              100 - Math.round((group.availableTokens / (group.totalTokens + 1)) * 100)],
            backgroundColor: ['#E93D44', 'rgba(0,0,0,0)'],
            borderColor: ['rgba(0,0,0,0)', 'rgba(0,0,0,0)'],
            cutout: '37',
            borderRadius: 30,
          },
        ],
      },
    }));
    return groups;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchGroup = () => {
  console.log('fetchGroup');
};

export const fetchWizelinersInGroup = async (groupName:string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/group/findUsersInGroup/${groupName}`, {
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
    usersInGroup = usersInGroup.map((user:any) => ({
      id: user.id,
      username: `${user.firstName} ${user.lastName}`,
      area: 'to be defined',
      isAdmin: 'Yes',
      wizecoins: 100,
    }));
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
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/group/delete/${groupID}`, {
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
