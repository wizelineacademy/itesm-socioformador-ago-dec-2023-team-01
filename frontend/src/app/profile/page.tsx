'use client';

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import UserProfile from '../components/ProfileInformationPage';
import Awaiting from '../components/awaiting';
import NotWelcome from '../components/NotWelcome';
import { RootState } from '../redux/store';

export default function ShowProfileInformation() {
  const user = useSelector((state: RootState) => state.user.userInfo);

  if (!user) return <NotWelcome />;
  return (
    <UserProfile
      name={`${user.firstName} ${user.lastName}`}
      email={user.email}
      profileSrc={user.picture}
      areas="Software Engineer"
      currentWizecoins={`${user.tokens.currentAmountTokens}`}
      monthlyWizecoins={`${user.tokens.totalAmountTokens}`}
    />
  );
}
