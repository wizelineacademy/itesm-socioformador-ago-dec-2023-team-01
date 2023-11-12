'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import fetchUser from '@/services/userService';
import fetchUserCurrentTokens from '@/services/tokenService';
import UserProfileDashboard from '@/app/admin/components/individualDashboard';

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

  const [userTokens, setUserTokens] = useState({
    amountTokens: '0',
    currentAmountTokens: '0',
  });

  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data using the userId from the URL
        const userData = await fetchUser(userId);
        const userTokensData = await fetchUserCurrentTokens(userId);
        setUser(userData);
        setUserTokens(userTokensData);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, [userId]);

  return (
    <div>
      <UserProfileDashboard
        id={user.id}
        name={`${user.firstName} ${user.lastName}`}
        areas={['Software Engineers', 'ITESM project', 'Quality Assurance', 'Testing']}
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
      />
    </div>
  );
}
