'use client';

import React from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import IsWelcome from '../components/IsWelcome';
import NotWelcome from '../components/NotWelcome';
import Awaiting from '../components/awaiting';

export default function Welcome() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <Awaiting />;
  if (error) return <div>{error.message}</div>;

  if (user) {
    return (
      <div>
        <IsWelcome admin name={user.name} wizecoins="120" IsWizeliner picSource={user.picture} />
      </div>
    );
  }
  return <NotWelcome />;
}
