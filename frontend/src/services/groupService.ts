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
