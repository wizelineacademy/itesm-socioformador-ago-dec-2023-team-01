'use client';

import React from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import UserProfileDashboard from '@/app/admin/components/individualDashboard';
import NotWelcome from '@/app/components/NotWelcome';

export default function ShowProfileInformation() {
  const { user, error } = useUser();

  if (error) return <div>{error.message}</div>;
  if (user) {
    return (
      <div>
        <UserProfileDashboard
          name={user.name}
          areas={['Software Engineers', 'ITESM project', 'Quality Assurance', 'Testing']}
          profileSrc={user.picture}
          isAdmin
          currentWizecoins="174"
          monthlyWizecoins="300"
          ChatGPTPrompts="50"
          GoogleBardPrompts="23"
          Llama2Prompts="10"
          stats={[['/Main/ChatGPT', '2.5'], ['/Main/ChatGPT', '2.5'], ['/Main/ChatGPT', '2.5'], ['/Main/ChatGPT', '2.5']]}
        />
      </div>
    );
  }
  return <NotWelcome />;
}
