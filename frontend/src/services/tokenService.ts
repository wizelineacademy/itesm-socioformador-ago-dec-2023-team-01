export async function fetchUserCurrentTokens(userId: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}/current-tokens`);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const userCurrentTokensData = await response.json();

    if (Object.keys(userCurrentTokensData).length === 0) {
      return {
        totalAmountTokens: 0,
        currentAmountTokens: 0,
      };
    }

    // If not empty, create the formattedTokens object
    const formattedTokens = {
      totalAmountTokens: userCurrentTokensData.amount,
      currentAmountTokens: userCurrentTokensData.currentAmount,
    };

    return formattedTokens;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// eslint-disable-next-line max-len
export async function updateUserAmountTokens(userId: string, operation: string, desiredAmount: number) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}/token-operation`, {
      method: 'PATCH',
      body: JSON.stringify({
        operation,
        desiredAmount,
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const userCurrentTokensData = await response.json();

    if (Object.keys(userCurrentTokensData).length === 0) {
      return {
        amountTokens: 0,
        currentAmountTokens: 0,
      };
    }

    // If not empty, create the formattedTokens object
    const formattedTokens = {
      amountTokens: userCurrentTokensData.amount,
      currentAmountTokens: userCurrentTokensData.currentAmount,
    };

    return formattedTokens;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createTokenForUser(userId: string, amount: number, renewPeriodically: boolean, expiresAt: Date, jwtToken: string) {
  try {
    const dateToString = expiresAt.toISOString();
    console.log(userId, amount, renewPeriodically, dateToString);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tokens`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({
        userId,
        amount,
        renewPeriodically,
        expiresAt: dateToString,
      }),
    });
    console.log('Token created successfully');
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function addTokensToUsersInGroup(groupId:string, amount:number, jwtToken: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/group/tokens`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({
        groupId,
        amount,
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function susbtractTokensToUser(userId: string, amount: number) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}/token-operation`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        operation: 'substract',
        amount,
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return {};
  }
}
