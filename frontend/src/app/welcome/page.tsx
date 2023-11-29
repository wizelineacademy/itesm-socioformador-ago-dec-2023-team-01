'use client';

import React, { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchUserCurrentTokens } from '@/services/tokenService';
import IsWelcome from '../components/IsWelcome';
import NotWelcome from '../components/NotWelcome';
import Awaiting from '../components/awaiting';
import { setUserInfo, setIsLoading } from '../redux/features/userSlice';
import type { User } from '../redux/features/userSlice';

const getAuthToken = async () => {
  const response = await fetch('/api/token');
  const data = await response.json();
  return data.foo;
};

export default function Welcome() {
  const dispatch = useDispatch<AppDispatch>();
  const { user: auth0User, error, isLoading: auth0Loading } = useUser();
  const isLoading = useSelector((state: RootState) => state.user.isLoading);
  const user = useSelector((state: RootState) => state.user.userInfo);

  useEffect(() => {
    const fetchData = async () => {
      if (auth0Loading || error || !auth0User || !auth0User.sub || user) {
        return;
      }

      const fetchedToken = await getAuthToken();
      const userTokensData = await fetchUserCurrentTokens(auth0User.sub);

      const newUser: User = {
        id: auth0User.sub,
        firstName: auth0User.given_name as string,
        lastName: auth0User.family_name as string,
        email: auth0User.email as string,
        picture: auth0User.picture as string,
        role: auth0User.role as string,
        jwtToken: fetchedToken,
        tokens: userTokensData,
      };

      dispatch(setUserInfo(newUser));
      dispatch(setIsLoading(false));
    };
    try {
      dispatch(setIsLoading(true));
      fetchData().then(() => {
        dispatch(setIsLoading(false));
      });
    } catch (e) {
      console.error(e);
      dispatch(setIsLoading(false));
    }
  }, [auth0User, error, dispatch, auth0Loading, user]);

  if (auth0Loading || isLoading) return <Awaiting />;
  if (error) return <div>{error.message}</div>;
  if (!user) return <NotWelcome />;

  return (
    <div>
      <IsWelcome
        isAdmin={user.role === 'admin'}
        name={`${user.firstName} ${user.lastName}`}
        wizecoins={`${user.tokens.currentAmountTokens}`}
        picSource={user.picture}
      />
    </div>
  );
}
