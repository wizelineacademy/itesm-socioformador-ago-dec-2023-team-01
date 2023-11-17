'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { SnackbarProvider } from 'notistack';
import { fetchUser, fetchUserGroups } from '@/services/usersService';
import { fetchUserCurrentTokens } from '@/services/tokenService';
import UserProfileDashboard from '@/app/admin/components/individualDashboard';

interface Group {
  id: number;
  name: string;
  // Add other properties if needed
}

export default function Wizeliner() {
  const [user, setUser] = useState({
    id: '',
    firstName: '',
    lastName: '',
    fullName: '',
    imageUrl: '',
    email: '',
    role: '',
    createdAt: '',
    updatedAt: '',
    isAdmin: false,
  });

  const [change, setChange] = useState(true);

  const handleRefetch = () => {
    setChange((prevValue) => !prevValue);
  };

  const [userTokens, setUserTokens] = useState({
    amountTokens: '0',
    currentAmountTokens: '0',
  });

  const [userGroups, setUserGroups] = useState<Group[]>([]);

  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data using the userId from the URL
        const userData = await fetchUser(userId);
        const userTokensData = await fetchUserCurrentTokens(userId);
        const groupsData = await fetchUserGroups(userId);
        setUser(userData);
        setUserTokens(userTokensData);
        setUserGroups(groupsData);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, [userId, change]);

  return (
    <div>
      <SnackbarProvider />
      <UserProfileDashboard
        id={user.id}
        name={`${user.firstName} ${user.lastName}`}
        userGroups={userGroups}
        profileSrc={user.imageUrl}
        isAdmin={user.isAdmin}
        currentWizecoins={userTokens.currentAmountTokens}
        monthlyWizecoins={userTokens.amountTokens}
        ChatGPTPrompts="50"
        GoogleBardPrompts="23"
        Llama2Prompts="10"
        stats={[
          ['/Main/ChatGPT', '2.5'],
          ['/Main/ChatGPT', '2.5'],
          ['/Main/ChatGPT', '2.5'],
          ['/Main/ChatGPT', '2.5'],
        ]}
        toggle={handleRefetch}
      />
    </div>
  );
}
