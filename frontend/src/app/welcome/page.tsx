'use client';

import React, { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { fetchUserCurrentTokens } from '@/services/tokenService';
import IsWelcome from '../components/IsWelcome';
import NotWelcome from '../components/NotWelcome';
import Awaiting from '../components/awaiting';

export default function Welcome() {
  const { user, error, isLoading } = useUser();

  const [userTokens, setUserTokens] = useState({
    amountTokens: '0',
    currentAmountTokens: '0',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const userTokensData = await fetchUserCurrentTokens(user.sub);
          setUserTokens(userTokensData);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, [user]);

  useEffect(() => {
    if (user) {
      const tokenResponse = async () => {
        const response = await fetch('/api/token');
        const data = await response.json();
        return data.foo;
      };
      tokenResponse().then((token) => {
        localStorage.setItem('token', token);
        localStorage.setItem('first', `${user.given_name}`);
        localStorage.setItem('last', `${user.family_name}`);
        localStorage.setItem('pic', `${user.picture}`);
        localStorage.setItem('amountTokens', `${userTokens.amountTokens}`);
        localStorage.setItem('currentAmountTokens', `${userTokens.currentAmountTokens}`);
      }).catch((err) => {
        console.log(err);
      });
      console.log('user', user);
    }
  }, [user, userTokens.amountTokens, userTokens.currentAmountTokens]);

  if (isLoading || localStorage.getItem('first') === null) return <Awaiting />;
  if (error) return <div>{error.message}</div>;

  if (user) {
    return (
      <div>
        <IsWelcome
          admin
          name={`${localStorage.getItem('first')} ${localStorage.getItem('last')}`}
          wizecoins={`${localStorage.getItem('amountTokens')}`}
          IsWizeliner
          picSource={`${localStorage.getItem('pic')}`}
        />
      </div>
    );
  }
  return <NotWelcome />;
}
