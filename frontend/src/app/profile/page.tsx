'use client';

import React, { useState, useEffect } from 'react';
import { fetchUserCurrentTokens } from '@/services/tokenService';
import UserProfile from '../components/ProfileInformationPage';
import NotWelcome from '../components/NotWelcome';

export default function ShowProfileInformation() {
  const [sub, setSub] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profileSrc, setProfileSrc] = useState('');

  const [userTokens, setUserTokens] = useState({
    amountTokens: '0',
    currentAmountTokens: '0',
  });

  useEffect(() => {
    setSub(`${localStorage.getItem('sub')}`);
    setName(`${localStorage.getItem('first')} ${localStorage.getItem('last')}`);
    setEmail(`${localStorage.getItem('email')}`);
    setProfileSrc(`${localStorage.getItem('pic')}`);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userTokensData = await fetchUserCurrentTokens(sub);
        setUserTokens(userTokensData);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, [sub]);

  if (name === null) {
    return <NotWelcome />;
  }

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
