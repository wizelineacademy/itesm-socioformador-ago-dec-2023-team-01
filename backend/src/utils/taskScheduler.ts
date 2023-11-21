import prisma from '../../prisma/prisma-client';
import userRepository from '../modules/user/userRepository';
import tokenRepository from '../modules/token/tokenRepository';

async function tokenJob() {
  try {
    const users = await prisma.user.findMany({
      where: {
        tokens: {},
      },
    });

    users.map(async (user: any) => {
      const currentToken = await userRepository.getUserCurrentToken(user.id);
      if (currentToken) {
        if (
          currentToken.expiresAt <= new Date() &&
          currentToken.renewPeriodically
        ) {
          const newToken = {
            userId: user.id,
            amount: currentToken.amount,
            currentAmount: currentToken.amount,
            renewPeriodically: currentToken.renewPeriodically,
            expiresAt: new Date(new Date().setMonth(new Date().getMonth() + 1)),
          };
          await tokenRepository.createToken(newToken);
        }
      }
    });
  } catch (error) {
    console.error(error);
  }
};

export default tokenJob;
