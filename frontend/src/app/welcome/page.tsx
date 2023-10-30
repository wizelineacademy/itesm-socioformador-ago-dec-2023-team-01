'use client';

import React from 'react';
import IsWelcome from '../components/IsWelcome';
import NotWelcome from '../components/NotWelcome';
import { useUser } from '@auth0/nextjs-auth0/client';
import Awaiting from '../components/awaiting';

export default function Welcome() {

  const { user, error, isLoading } = useUser();

  if (isLoading) return <Awaiting />
  if (error) return <div>{error.message}</div>;

  if (user) {
    return (
      <div>
        {true ? <IsWelcome admin={true} name={user.name} wizecoins={'120'} IsWizeliner={true} picSource={user.picture}/> : <NotWelcome />}
      </div>
    );
  }
  return <NotWelcome />
}
