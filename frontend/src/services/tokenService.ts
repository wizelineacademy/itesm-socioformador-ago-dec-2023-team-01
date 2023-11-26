export async function fetchUserCurrentTokens(userId: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}/current-tokens`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
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

// eslint-disable-next-line max-len
export async function updateUserAmountTokens(userId: string, operation: string, desiredAmount: number) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}/token-operation`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
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

export async function createTokenForUser(userId: string, amount: number, renewPeriodically: boolean, expiresAt: Date) {
  try {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        userId,
        amount,
        renewPeriodically,
        expiresAt,
      }),
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}
