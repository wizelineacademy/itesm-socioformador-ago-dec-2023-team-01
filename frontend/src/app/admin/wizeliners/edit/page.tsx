'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { SnackbarProvider } from 'notistack';
import { fetchUser, fetchUserGroups } from '@/services/usersService';
import { fetchUserCurrentTokens } from '@/services/tokenService';
import UserProfileDashboard from '@/app/admin/components/individualDashboard';
import Awaiting from '@/app/components/awaiting';

interface Group {
  id: number;
  name: string;
  // Add other properties if needed
}
interface User {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  imageUrl: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  isAdmin: boolean;
}
export default function Wizeliner() {
  const [user, setUser] = useState<User | null>(null);

  const [change, setChange] = useState(true);

  const handleRefetch = () => {
    setChange((prevValue) => !prevValue);
  };

  const [userTokens, setUserTokens] = useState({
    totalAmountTokens: '0',
    currentAmountTokens: '0',
  });

  const [userGroups, setUserGroups] = useState<Group[]>([]);

  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data using the userId from the URL
        if (userId !== null) {
          const userData = await fetchUser(userId);
          const userTokensData = await fetchUserCurrentTokens(userId);
          const groupsData = await fetchUserGroups(userId);
          setUser({
            id: userData.id,
            firstName: userData.firstName,
            lastName: userData.lastName,
            fullName: `${userData.firstName} ${userData.lastName}`,
            imageUrl: userData.imageUrl,
            email: userData.email,
            role: userData.role,
            createdAt: userData.createdAt,
            updatedAt: userData.updatedAt,
            isAdmin: userData.role === 'admin',
          });
          setUserTokens(userTokensData);
          setUserGroups(groupsData);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, [userId, change]);
  if (!user) return <Awaiting />;
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
        monthlyWizecoins={userTokens.totalAmountTokens}
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
