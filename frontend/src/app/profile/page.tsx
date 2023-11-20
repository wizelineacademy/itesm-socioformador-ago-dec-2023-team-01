'use client';

import React, { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { fetchUserCurrentTokens } from '@/services/tokenService';
import UserProfile from '../components/ProfileInformationPage';
import Awaiting from '../components/awaiting';
import NotWelcome from '../components/NotWelcome';

export default function ShowProfileInformation() {
  const { user, error, isLoading } = useUser();

  const [userTokens, setUserTokens] = useState({
    amountTokens: '0',
    currentAmountTokens: '0',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user && user.sub) {
          const userTokensData = await fetchUserCurrentTokens(user.sub);
          setUserTokens(userTokensData);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, [user]);

  if (isLoading) return <Awaiting />;
  if (error) return <div>{error.message}</div>;

  if (user) {
    return (
      <div>
        <UserProfile
          name={user.name ?? ''}
          email={user.email ?? ''}
          profileSrc={user.picture ?? ''}
          areas="Software Engineer"
          currentWizecoins={userTokens.currentAmountTokens}
          monthlyWizecoins={userTokens.amountTokens}
        />
      </div>
    );
  }
  return <NotWelcome />;
}
