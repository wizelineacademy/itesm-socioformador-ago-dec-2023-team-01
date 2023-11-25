'use client';

import React, { useState, useEffect } from 'react';
import { fetchUserCurrentTokens } from '@/services/tokenService';
import UserProfile from '../components/ProfileInformationPage';
import Awaiting from '../components/awaiting';
import NotWelcome from '../components/NotWelcome';

export default function ShowProfileInformation() {
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profileSrc, setProfileSrc] = useState('');

  const [userTokens, setUserTokens] = useState({
    amountTokens: '0',
    currentAmountTokens: '0',
  });

  useEffect(() => {
    setUserId(`${localStorage.getItem('sub')}`);
    setName(`${localStorage.getItem('first')} ${localStorage.getItem('last')}`);
    setEmail(`${localStorage.getItem('email')}`);
    setProfileSrc(`${localStorage.getItem('pic')}`);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId !== '') {
          const userTokensData = await fetchUserCurrentTokens(userId);
          setUserTokens(userTokensData);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, [userId]);

  if (userId === '') return <Awaiting />;
  return (
    <div>
      <UserProfile
        name={name}
        email={email}
        profileSrc={profileSrc}
        areas="Software Engineer"
        currentWizecoins={userTokens.currentAmountTokens}
        monthlyWizecoins={userTokens.amountTokens}
      />
    </div>
  );
  return <NotWelcome />;
}
