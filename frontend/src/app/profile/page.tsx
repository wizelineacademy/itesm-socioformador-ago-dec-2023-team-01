'use client';

import React from 'react';
import UserProfile from '../components/ProfileInformationPage';
import { useUser } from '@auth0/nextjs-auth0/client';
import Awaiting from '../components/awaiting';
import NotWelcome from '../components/NotWelcome';

export default function ShowProfileInformation() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <Awaiting />
  if (error) return <div>{error.message}</div>;

  if (user) {
    return (
      <div>
        <UserProfile
          name={user.name}
          email={user.email}
          profileSrc={user.picture}
          areas="Software Engineer"
          currentWizecoins="174"
          monthlyWizecoins="300"
        />
      </div>
    );
  }
  return <NotWelcome/>
}
