export default async function fetchUserCurrentTokens(userId: any) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/current-tokens`, {
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

    // Check if userCurrentTokensData is empty
    if (Object.keys(userCurrentTokensData).length === 0) {
      // If it's empty, return an object with both quantities set to 0
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
