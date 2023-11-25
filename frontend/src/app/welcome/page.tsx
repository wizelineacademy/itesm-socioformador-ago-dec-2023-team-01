'use client';

import React, { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { fetchUserCurrentTokens } from '@/services/tokenService';
import IsWelcome from '../components/IsWelcome';
import NotWelcome from '../components/NotWelcome';
import Awaiting from '../components/awaiting';

export default function Welcome() {
  const { user, error, isLoading } = useUser();
  const [change, setChange] = useState(false);
  const [first, setFirst] = useState('');

  const [userTokens, setUserTokens] = useState({
    amountTokens: '0',
    currentAmountTokens: '0',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (localStorage.getItem('role') !== null) {
          const userTokensData = await fetchUserCurrentTokens(`${localStorage.getItem('role')}`);
          setUserTokens(userTokensData);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

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
        localStorage.setItem('sub', `${user.sub}`);
        localStorage.setItem('role', `${user.role}`);
        setChange(!change);
      }).catch((err) => {
        console.log(err);
      });
      console.log('user', user);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, userTokens.amountTokens, userTokens.currentAmountTokens]);

  useEffect(() => {
    setFirst(`${localStorage.getItem('first')}`);
  }, [change]);

  if (isLoading || first === '') return <Awaiting />;
  if (error) return <div>{error.message}</div>;
  console.log('outside', user);
  if (localStorage.getItem('first') === null) {
    return <NotWelcome />;
  }
  return (
    <div>
      <IsWelcome
        admin={localStorage.getItem('role') === 'admin'}
        name={`${localStorage.getItem('first')} ${localStorage.getItem('last')}`}
        wizecoins={userTokens.amountTokens}
        IsWizeliner
        picSource={localStorage.getItem('pic')}
      />
    </div>
  );
}
